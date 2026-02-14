export class MasterGain {
    masterGain: GainNode;

    constructor(ctx: AudioContext, limiter: any) {
        this.masterGain = ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(limiter.node);
    }

    changeVolume(volume: number) {
      this.masterGain.gain.value = volume;
    }
}

