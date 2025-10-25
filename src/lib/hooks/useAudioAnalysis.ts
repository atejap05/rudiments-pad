"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AudioAnalysisResult } from "@/lib/types/lesson";

interface UseAudioAnalysisOptions {
  onBeatDetected?: (result: AudioAnalysisResult) => void;
  threshold?: number;
  enabled?: boolean;
}

export function useAudioAnalysis({
  onBeatDetected,
  threshold = 0.5,
  enabled = false,
}: UseAudioAnalysisOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Initialize audio context and analyser
  const initializeAudio = useCallback(async () => {
    try {
      if (!enabled) return;

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create audio context
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Create microphone source
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      microphoneRef.current = microphone;

      // Create data array for analysis
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      setError(null);
    } catch (err) {
      console.error("Erro ao inicializar áudio:", err);
      setError("Erro ao acessar microfone");
    }
  }, [enabled]);

  // Analyze audio for beat detection
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !isListening) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      sum += dataArrayRef.current[i];
    }
    const average = sum / dataArrayRef.current.length;
    const normalizedVolume = average / 255;

    // Simple beat detection based on volume threshold
    if (normalizedVolume > threshold) {
      const result: AudioAnalysisResult = {
        timestamp: Date.now(),
        isOnBeat: true, // This would need more sophisticated logic
        accuracy: Math.min(100, (normalizedVolume / threshold) * 100),
        feedback: normalizedVolume > threshold * 1.2 ? "perfect" : "early",
      };

      if (onBeatDetected) {
        onBeatDetected(result);
      }
    }

    if (isListening) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, [isListening, threshold, onBeatDetected]);

  // Start listening
  const startListening = useCallback(async () => {
    if (isListening) return;

    await initializeAudio();
    setIsListening(true);
    analyzeAudio();
  }, [isListening, initializeAudio, analyzeAudio]);

  // Stop listening
  const stopListening = useCallback(() => {
    setIsListening(false);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
}
