import { LimiterSettings } from "./types/types";

export class Limiter {
    node: DynamicsCompressorNode;
    ctx: AudioContext;
    settings: LimiterSettings;

    constructor(ctx: AudioContext) {
        this.ctx = ctx;
        this.node = this.ctx.createDynamicsCompressor();
        this.settings = {attack: 1, knee: 0, ratio: 4, threshold: -20, release: 0.5}

        this.node.threshold.setValueAtTime(this.settings.threshold, this.ctx.currentTime); 
        this.node.knee.setValueAtTime(this.settings.knee, this.ctx.currentTime);       
        this.node.ratio.setValueAtTime(this.settings.ratio, this.ctx.currentTime);      
        this.node.attack.setValueAtTime(this.settings.attack, this.ctx.currentTime);      
        this.node.release.setValueAtTime(this.settings.release, this.ctx.currentTime);

        this.node.connect(this.ctx.destination);
    }

    changeSettings = (type: keyof LimiterSettings) => (value: number) => {
        this.settings[type] = value;
    }
}