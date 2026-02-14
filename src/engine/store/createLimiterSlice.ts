import { StateCreator } from 'zustand';
import { AudioEngine } from '../core/AudioEngine';
import { LimiterSettings } from '../core/types/types';

export interface LimiterSlice {
    settings: LimiterSettings;
    setSettingsValue: (type: keyof Omit<LimiterSettings, 'setSettingsValue'>, value: number) => void;
}


export const createLimiterSlice = (engine: AudioEngine): StateCreator<LimiterSlice> => (set) => ({
    settings: engine.limiter.settings,
    setSettingsValue: (type, value) => {
        engine.limiter.changeSettings(type)(value);
        set((state) => ({
            settings: {
                ...state.settings,
                [type]: value
            }
        }));
    }
});