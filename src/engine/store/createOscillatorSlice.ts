import { StateCreator } from 'zustand';
import { AudioEngine } from '../core/AudioEngine';
import type { OscillatorType } from "../core/types/types";

export interface OscSlice {
    wave: OscillatorType;
    octave: number;
    detune: number;
    setWave: (wave: OscillatorType) => void;
    setOctave: (freq: number) => void;
    setDetune: (detune: number) => void;
}

export const createOscillatorSlice = (engine: AudioEngine): StateCreator<OscSlice> => (set) => ({
    wave: engine.waveForm,
    octave: engine.octave,
    detune: engine.detune,
    setWave: (wave: OscillatorType) => {
        set({wave})
        engine.changeWaveForm(wave)
    },
    setOctave: (octave: number) => {
        set({octave})
        engine.changeOctave(octave)
    },
    setDetune: (detune: number) => {
        set({detune})
        engine.changeDetune(detune)
    } 
})