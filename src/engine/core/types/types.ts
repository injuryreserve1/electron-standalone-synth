export interface Note {
  note: string;
  freq: number;
}

export type OscillatorType = "sine" | "square" | "triangle" | "sawtooth";

export type Envelope = {
  attack: number;
  sustain: number;
  decay: number;
  release: number;
}

export type LimiterSettings = {
  attack: number;
  ratio: number;
  threshold: number;
  release: number;
  knee: number;
}