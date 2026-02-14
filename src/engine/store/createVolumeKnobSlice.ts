import { StateCreator } from 'zustand';
import { AudioEngine } from '../core/AudioEngine';

export interface VolumeSlice {
    volume: number,
    setVolume: (volume: number) => void;
}

export const createVolumeKnobSlice = (engine: AudioEngine): StateCreator<VolumeSlice> => (set) => ({
    volume: engine.masterNode.masterGain.gain.value,
    setVolume: (volume: number) => {
        set({ volume })
        engine.masterNode.changeVolume(volume)
    }
})