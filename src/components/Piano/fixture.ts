import type { Note } from '@/engine/core/types/types';

//4 октава

export const NOTES: Array<Note> = [
  { note: 'C4',  freq: 261.63},
  { note: 'C#4', freq: 277.18},
  { note: 'D4',  freq: 293.66},
  { note: 'D#4', freq: 311.13},
  { note: 'E4',  freq: 329.63},
  { note: 'F4',  freq: 349.23},
  { note: 'F#4', freq: 369.99},
  { note: 'G4',  freq: 392.00},
  { note: 'G#4', freq: 415.30},
  { note: 'A4',  freq: 440.00},
  { note: 'A#4', freq: 466.16},
  { note: 'B4',  freq: 493.88},
  { note: 'C5',  freq: 523.25},
];

export const KEY_MAP: Record<string, number> = {
  'a': 0,  // C4
  'w': 1,  // C#4
  's': 2,  // D4
  'e': 3,  // D#4
  'd': 4,  // E4
  'f': 5,  // F4
  't': 6,  // F#4
  'g': 7,  // G4
  'y': 8,  // G#4
  'h': 9,  // A4
  'u': 10, // A#4
  'j': 11, // B4
  'k': 12, // C5
};