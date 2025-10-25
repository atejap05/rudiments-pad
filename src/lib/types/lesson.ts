export interface RhythmEvent {
  beat: number; // Em qual tempo do compasso (1, 2, 3, 4)
  subdivision: number; // Em qual subdivisão (1=colcheia, 2=semicolcheia, etc.)
  hand: "R" | "L";
  isAccent: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  description: string;
  difficulty: "iniciante" | "intermediário" | "avançado";
  timeSignature: [number, number]; // [4, 4]
  pattern: RhythmEvent[]; // A "partitura"
  minBpm: number;
  targetBpm: number;
}

export interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  currentBeat: number;
  currentTick: number;
  timeSignature: [number, number];
}

export interface AudioAnalysisResult {
  timestamp: number;
  isOnBeat: boolean;
  accuracy: number; // 0-100
  feedback: "early" | "late" | "perfect";
}
