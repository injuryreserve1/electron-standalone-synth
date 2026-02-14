import { audioEngine } from '@/engine/core/AudioEngine';
import classes from './Limiter.module.css';
import Knob from '@/shared/ui/Knob/Knob';
import { useSynthStore } from '@/engine/store/store';

const Limiter = () => {
    const settings = useSynthStore((state) => state.settings);
    const setSettingsValue = useSynthStore((state) => state.setSettingsValue);

    
    return (
        <div className={classes.limiter}>
            <h1>Limiter</h1>
            
            <Knob 
                label="Attack"
                min={0}
                max={1}
                initValue={settings.attack}
                onChange={(val) => setSettingsValue('attack', val)}
            />
            <Knob 
                label="Threshold"
                min={-60}
                max={0}
                initValue={settings.threshold}
                onChange={(val) => setSettingsValue('threshold', val)}
            />
            <Knob 
                label="Ratio"
                min={1}
                max={20}
                initValue={settings.ratio}
                onChange={(val) => setSettingsValue('ratio', val)}
            />
            <Knob 
                label="Knee"
                min={0}
                max={40}
                initValue={settings.knee}
                onChange={(val) => setSettingsValue('knee', val)}
            />
            <Knob 
                label="Release"
                min={0.01}
                max={2.0}
                initValue={settings.release}
                onChange={(val) => setSettingsValue('release', val)}
            />
            
        </div>
    )
}

export default Limiter;