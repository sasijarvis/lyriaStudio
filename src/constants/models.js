export const MODELS = {
  PRO: {
    id: 'google/lyria-3-pro-preview',
    label: 'Lyria 3 Pro',
    description: 'Full-length song (~2 min)',
    duration: '~2 min',
    cost: 0.08,
    badge: 'FULL',
    badgeClass: 'text-accent-glow bg-accent-muted',
  },
  CLIP: {
    id: 'google/lyria-3-clip-preview',
    label: 'Lyria 3 Clip',
    description: '30-second clip',
    duration: '~30 sec',
    cost: 0.04,
    badge: 'CLIP',
    badgeClass: 'text-beat-sky bg-sky-900',
  },
}

export const MODEL_LIST = Object.values(MODELS)
