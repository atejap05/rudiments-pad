"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { MetronomeState } from "@/lib/types/lesson";

interface UseMetronomeOptions {
  initialBpm?: number;
  timeSignature?: [number, number];
  onBeat?: (beat: number, tick: number) => void;
}

export function useMetronome({
  initialBpm = 120,
  timeSignature = [4, 4],
  onBeat,
}: UseMetronomeOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [currentTick, setCurrentTick] = useState(0);

  const transportRef = useRef<any>(null);
  const oscillatorRef = useRef<Tone.Oscillator | null>(null);
  const gainNodeRef = useRef<Tone.Gain | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Tone.js
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initTone = async () => {
      await Tone.start();

      // Create audio nodes
      const oscillator = new Tone.Oscillator(800, "sine").toDestination();
      const gainNode = new Tone.Gain(0.3).connect(oscillator);

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      transportRef.current = Tone.getTransport();

      // Set initial BPM
      Tone.getTransport().bpm.value = bpm;
    };

    initTone();

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.dispose();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.dispose();
      }
    };
  }, []);

  // Update BPM when it changes
  useEffect(() => {
    if (transportRef.current) {
      transportRef.current.bpm.value = bpm;
    }
  }, [bpm]);

  // Animation loop for visual updates
  const updateVisuals = useCallback(() => {
    if (!transportRef.current || !isPlaying) return;

    const position = transportRef.current.position;
    const [beatsPerMeasure, noteValue] = timeSignature;

    // Calculate current beat and tick
    const totalBeats = Math.floor(position);
    const currentMeasureBeat = (totalBeats % beatsPerMeasure) + 1;
    const tick = Math.floor((position % 1) * 4); // Assuming 16th note subdivisions

    setCurrentBeat(currentMeasureBeat);
    setCurrentTick(tick);

    // Call onBeat callback
    if (onBeat) {
      onBeat(currentMeasureBeat, tick);
    }

    animationFrameRef.current = requestAnimationFrame(updateVisuals);
  }, [isPlaying, timeSignature, onBeat]);

  // Start/stop animation loop
  useEffect(() => {
    if (isPlaying) {
      updateVisuals();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateVisuals]);

  const start = useCallback(async () => {
    if (!transportRef.current || !oscillatorRef.current) return;

    try {
      // Clear any existing events
      transportRef.current.cancel();

      // Schedule metronome clicks
      const [beatsPerMeasure] = timeSignature;

      transportRef.current.scheduleRepeat((time: any) => {
        if (oscillatorRef.current) {
          oscillatorRef.current.start(time).stop(time + 0.1);
        }
      }, "4n"); // Quarter note clicks

      // Start transport
      transportRef.current.start();
      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao iniciar metrônomo:", error);
    }
  }, [timeSignature]);

  const stop = useCallback(() => {
    if (!transportRef.current) return;

    transportRef.current.stop();
    transportRef.current.cancel();
    setIsPlaying(false);
    setCurrentBeat(1);
    setCurrentTick(0);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  return {
    isPlaying,
    bpm,
    setBpm,
    currentBeat,
    currentTick,
    timeSignature,
    start,
    stop,
    toggle,
  } as MetronomeState & {
    setBpm: (bpm: number) => void;
    start: () => Promise<void>;
    stop: () => void;
    toggle: () => void;
  };
}
