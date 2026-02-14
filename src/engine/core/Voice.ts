import type {Envelope, OscillatorType } from "./types/types";



export class Voice {
    private ctx: AudioContext;
    private oscillators: OscillatorNode[] = [];
    private vca: GainNode;
    private output: GainNode;
    envelope: Envelope;

    constructor(
        ctx: AudioContext,
        destination: AudioNode, 
        type: OscillatorType, 
        freq: number, 
        detune: number,
        envelope: Envelope
    ) {
        this.ctx = ctx;
        this.output = destination as GainNode;
        
        this.envelope = envelope;

        this.vca = ctx.createGain();
        this.vca.gain.value = 0;
        this.vca.connect(this.output);

        this.createOsc(type, freq, -detune); 
        this.createOsc(type, freq, 0); 
        this.createOsc(type, freq, detune);
    }

    private createOsc(type: OscillatorType, freq: number, detune: number) {
        const osc = this.ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune; 

        osc.connect(this.vca);
        osc.start();
        this.oscillators.push(osc);
    }

    

    triggerAttack() {
        const now = this.ctx.currentTime;
        const {attack, decay, sustain} = this.envelope;

        this.vca.gain.cancelScheduledValues(now);
        this.vca.gain.setValueAtTime(this.vca.gain.value, now);
        // this.vca.gain.setTargetAtTime(0.2, now, 0.05);
        this.vca.gain.linearRampToValueAtTime(0.1, now + attack);
        this.vca.gain.exponentialRampToValueAtTime(sustain, now + attack + decay); 
    }

    triggerRelease() {
        const now = this.ctx.currentTime;
        const release = this.envelope.release;
    
        this.vca.gain.cancelScheduledValues(now);
        this.vca.gain.setValueAtTime(this.vca.gain.value, now);
        this.vca.gain.exponentialRampToValueAtTime(0.001, now + release); 

        this.oscillators.forEach((osc, index) => {
            osc.stop(now + release + 0.01);

            if(index === 0) {
                osc.onended = () => {
                    this.vca.disconnect();
                    this.oscillators = [];
                }
            }
        })
    }
}
