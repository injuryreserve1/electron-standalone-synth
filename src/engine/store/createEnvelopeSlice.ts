import { StateCreator } from 'zustand';
import { AudioEngine } from '../core/AudioEngine';
import { Envelope } from '../core/types/types';

export interface EnvelopeSlice {
    envelope: Envelope;
    setEnvelopeValue: (type: keyof Omit<Envelope, 'setEnvelopeValue'>, value: number) => void;
}

export const createEnvelopeSlice = (engine: AudioEngine): StateCreator<EnvelopeSlice> => (set) => ({
    envelope: engine.envelope,
    setEnvelopeValue: (type, value) => {
        engine.changeEnvelope(type)(value);
        set((state) => ({
            envelope: {
                ...state.envelope,
                [type]: value
            }
        }));
    }
})