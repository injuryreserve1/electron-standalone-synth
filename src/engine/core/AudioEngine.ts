import { Limiter } from "./Limiter";
import { MasterGain } from "./MasterGain";
import { Voice } from "./Voice";
import type { Envelope, Note, OscillatorType } from "./types/types";



export class AudioEngine {
    private ctx: AudioContext;
    private activeVoices: Map<string, Voice> = new Map();
    waveForm: OscillatorType = "sine";
    octave: number;
    detune: any;
    masterNode: MasterGain;
    limiter: Limiter;
    envelope: Envelope;

    constructor() {
      this.ctx = new AudioContext();
      this.detune = 0;
      this.octave = 1;

      this.envelope = {attack: 0.01, sustain: 0.1, decay: 0.2, release: 0.01};

      this.limiter = new Limiter(this.ctx);
      this.masterNode = new MasterGain(this.ctx, this.limiter);
      
    }

    changeEnvelope = (type: keyof Envelope) => (value: number) => {
      this.envelope[type] = value;
    }

    changeDetune(detune: number) {
      this.detune = detune;  
    }

    changeWaveForm(wave: OscillatorType) {
      this.waveForm = wave;  
    }

    changeOctave(octave: number) {
      this.octave = Math.pow(2, octave);
    }

    pressNote(note: Note) {
      if (this.ctx.state === "suspended") this.ctx.resume();

      this.unpressNote(note);

      const voice = new Voice(
        this.ctx,
        this.masterNode.masterGain,
        this.waveForm,
        note.freq  * this.octave,
        this.detune,
        this.envelope
      )

      voice.triggerAttack();
      this.activeVoices.set(note.note, voice);
    }

    unpressNote(note: Note) {
      const voice = this.activeVoices.get(note.note);
      voice?.triggerRelease();
      this.activeVoices.delete(note.note);
    }
}

export const audioEngine = new AudioEngine();
