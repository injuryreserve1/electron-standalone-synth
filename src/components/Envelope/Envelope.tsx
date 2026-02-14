import classes from './Envelope.module.css';
import { useSynthStore } from "@/engine/store/store";
import Knob from "@/shared/ui/Knob/Knob";

const Envelope = () => {
    const envelope = useSynthStore((state) => state.envelope);
    const setEnvelopeValue = useSynthStore((state) => state.setEnvelopeValue);

    return (
        <div className={classes.envelope}>
            <h1>Envelope</h1>
            <Knob 
                label="Attack"
                min={0}
                max={10}
                initValue={envelope.attack}
                onChange={(value: number) => setEnvelopeValue('attack', value)}
            />
            <Knob 
                label="Decay"
                min={0}
                max={10}
                initValue={envelope.decay}
                onChange={(value: number) => setEnvelopeValue('decay', value)}
            />
            <Knob 
                label="Release"
                min={0}
                max={10}
                initValue={envelope.release}
                onChange={(value: number) => setEnvelopeValue('release', value)}
            />
            <Knob 
                label="Sustain"
                min={0}
                max={10}
                initValue={envelope.sustain}
                onChange={(value: number) => setEnvelopeValue('sustain', value)}
            />
        </div>
    )
}

export default Envelope;