import { create } from "zustand";
import { OscSlice, createOscillatorSlice } from "./createOscillatorSlice";
import { VolumeSlice, createVolumeKnobSlice } from './createVolumeKnobSlice';
import { audioEngine } from "../core/AudioEngine";
import { createLimiterSlice, LimiterSlice } from "./createLimiterSlice";
import { createEnvelopeSlice, EnvelopeSlice } from "./createEnvelopeSlice";
import { createPianoSlice, PianoSlice } from "./createPianoSlice";

interface RootState extends OscSlice, VolumeSlice, LimiterSlice, EnvelopeSlice, PianoSlice {};

export const useSynthStore = create<RootState>()((...a) => ({
    ...createOscillatorSlice(audioEngine)(...a),
    ...createVolumeKnobSlice(audioEngine)(...a),
    ...createLimiterSlice(audioEngine)(...a),
    ...createEnvelopeSlice(audioEngine)(...a),
    ...createPianoSlice(audioEngine)(...a),
}))