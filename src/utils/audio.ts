/**
 * Web Audio API synthesizer for ambient festive soundscapes:
 * - Gentle crackling fireplace
 * - Soft winter wind whisper
 * - Warm melodic chime chord for celebration / card unwrap
 */

class SoundscapeController {
  private ctx: AudioContext | null = null;
  private isFireActive = false;
  private isWindActive = false;
  private fireGainNode: GainNode | null = null;
  private windGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private fireTimer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public toggleFireplace(enabled: boolean) {
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    if (enabled && !this.isFireActive) {
      this.isFireActive = true;
      this.startFire();
    } else if (!enabled && this.isFireActive) {
      this.isFireActive = false;
      this.stopFire();
    }
  }

  private startFire() {
    if (!this.ctx || !this.masterGainNode) return;
    this.fireGainNode = this.ctx.createGain();
    this.fireGainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
    this.fireGainNode.connect(this.masterGainNode);

    // Warm background low rumble
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.05;
      b2 = 0.90 * b2 + white * 0.05;
      output[i] = (b0 + b1 + b2) * 0.3;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(this.fireGainNode);
    noiseSource.start();

    // Random crackle pops
    const triggerCrackle = () => {
      if (!this.isFireActive || !this.ctx || !this.fireGainNode) return;
      try {
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        const popFilter = this.ctx.createBiquadFilter();

        popFilter.type = 'bandpass';
        popFilter.frequency.setValueAtTime(800 + Math.random() * 1400, this.ctx.currentTime);
        popFilter.Q.setValueAtTime(4, this.ctx.currentTime);

        popGain.gain.setValueAtTime(0.01 + Math.random() * 0.06, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02 + Math.random() * 0.03);

        popOsc.frequency.setValueAtTime(100 + Math.random() * 300, this.ctx.currentTime);
        popOsc.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(this.fireGainNode);

        popOsc.start();
        popOsc.stop(this.ctx.currentTime + 0.06);
      } catch {
        // Safe catch for any audio buffer issues
      }

      const nextDelay = 80 + Math.random() * 260;
      this.fireTimer = window.setTimeout(triggerCrackle, nextDelay);
    };

    triggerCrackle();
  }

  private stopFire() {
    if (this.fireTimer) {
      clearTimeout(this.fireTimer);
      this.fireTimer = null;
    }
    if (this.fireGainNode && this.ctx) {
      this.fireGainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        this.fireGainNode?.disconnect();
        this.fireGainNode = null;
      }, 350);
    }
  }

  public playFestiveChime() {
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    // Harmonic warm holiday bells: C5, E5, G5, C6 (523Hz, 659Hz, 784Hz, 1046Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const startTime = this.ctx.currentTime + idx * 0.09;
      const duration = 1.6;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  }

  public getStatus() {
    return {
      isPlaying: this.isFireActive,
      contextState: this.ctx ? this.ctx.state : 'idle',
    };
  }
}

export const soundscape = new SoundscapeController();
