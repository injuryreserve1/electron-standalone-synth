import { audioEngine } from "@/engine/core/AudioEngine";
import type { OscillatorType } from '@/engine/core/types/types';
import classes from "./Oscillator.module.css";
import InputRange from "@/shared/ui/InputRange/InputRange";
import { useSynthStore } from "@/engine/store/store";
import { ChangeEvent } from "react";

const OSC_TYPES: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle'];

const Oscillator = () => {
    const {octave, detune, volume, setWave, setDetune, setOctave, setVolume} = useSynthStore();

    const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        setVolume(+e.target.value)
    }

    const handleChangeOctave = (e: ChangeEvent<HTMLInputElement>) => {
        setOctave(+e.target.value)    
    }

    const handleChangeDetune = (e: ChangeEvent<HTMLInputElement>) => {
        setDetune(+e.target.value)    
    }

    const handleChangeWave = (e: ChangeEvent<HTMLSelectElement>) => {
        setWave(e.target.value as OscillatorType)    
    }

    return (
        <div className={classes.Oscillator}>
            <div className={classes.Wrapper}>
                <h1>Oscillator</h1>
                <select className={classes.Select} onChange={handleChangeWave}>
                    {OSC_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                
                <InputRange 
                    text={`volume:${volume}`} 
                    defaultValue="0.5" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    onChange={handleChangeVolume}
                />
                <InputRange 
                    text={`octave: ${octave}`} 
                    defaultValue={octave.toString()}
                    min="-3" 
                    max="3" 
                    step="1" 
                    onChange={handleChangeOctave}
                />
                <InputRange 
                    text={`detune: ${detune}`}  
                    defaultValue={detune.toString()} 
                    min="-50" 
                    max="50" 
                    step="1" 
                    onChange={handleChangeDetune}
                />
            </div>
        </div>
    )
}

export default Oscillator;