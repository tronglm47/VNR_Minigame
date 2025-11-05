let audioCtx: AudioContext | null = null

function getAudio(): AudioContext {
  if (typeof window === 'undefined') throw new Error('No window')
  if (audioCtx == null) {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
    audioCtx = new Ctx()
  }
  const ctx = audioCtx as AudioContext
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  return ctx
}

type Wave = OscillatorType

function playTone({
  freq,
  duration = 0.18,
  type = 'sine',
  volume = 0.06,
  attack = 0.005,
  release = 0.08,
  detune = 0,
}: {
  freq: number
  duration?: number
  type?: Wave
  volume?: number
  attack?: number
  release?: number
  detune?: number
}) {
  try {
    const ctx = getAudio()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = detune
    const now = ctx.currentTime
    const end = now + duration

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(volume, now + attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, end + release)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(end + release + 0.01)
  } catch {}
}

function chord(freqs: number[], opts: Partial<Parameters<typeof playTone>[0]> = {}) {
  freqs.forEach((f, idx) => {
    window.setTimeout(() => playTone({ freq: f, ...opts }), idx * 35)
  })
}

export const Sounds = {
  letterClick() {
    // short tick
    playTone({ freq: 300, duration: 0.07, type: 'square', volume: 0.05 })
  },
  questionOpen() {
    // soft whoosh-like up glide
    chord([260, 320, 380], { type: 'sine', duration: 0.15, volume: 0.045 })
  },
  correct() {
    // pleasant rising triad
    chord([440, 554.37, 659.25], { type: 'triangle', duration: 0.16, volume: 0.06 })
  },
  wrong() {
    // short dissonant down
    chord([370, 300, 220], { type: 'sawtooth', duration: 0.12, volume: 0.055 })
  },
  tileOpen() {
    // reveal pop
    playTone({ freq: 520, duration: 0.09, type: 'square', volume: 0.055 })
    playTone({ freq: 780, duration: 0.08, type: 'square', volume: 0.045, detune: 5 })
  },
}

// Helper to unlock audio on first gesture
export function ensureAudioUnlocked() {
  try {
    getAudio()
  } catch {}
}


