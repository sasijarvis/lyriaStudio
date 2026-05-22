export const GENRES = [
  { value: 'cinematic', label: 'Cinematic / Orchestral' },
  { value: 'epic-fantasy', label: 'Epic / Fantasy' },
  { value: 'pop', label: 'Pop' },
  { value: 'hip-hop', label: 'Hip-Hop / Rap' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'electronic', label: 'Electronic / EDM' },
  { value: 'folk', label: 'Folk / Acoustic' },
  { value: 'rnb', label: 'R&B / Soul' },
  { value: 'classical', label: 'Classical' },
  { value: 'metal', label: 'Metal' },
  { value: 'lofi', label: 'Lofi / Chill' },
]

export const MOODS = [
  'Inspirational', 'Heroic', 'Intense', 'Uplifting', 'Emotional',
  'Melancholic', 'Happy', 'Dark', 'Romantic', 'Energetic',
  'Peaceful', 'Nostalgic', 'Mysterious', 'Angry', 'Dreamy',
  'Rebellious', 'Triumphant', 'Haunting', 'Playful', 'Epic',
]

export const TEMPOS = [
  { value: '60', label: 'Very Slow — 60 BPM (ambient, meditative)' },
  { value: '75', label: 'Slow — 75 BPM (ballad, cinematic)' },
  { value: '90', label: 'Medium Slow — 90 BPM (relaxed groove)' },
  { value: '110', label: 'Medium — 110 BPM (comfortable energy)' },
  { value: '128', label: 'Medium Fast — 128 BPM (driving beat)' },
  { value: '140', label: 'Fast — 140 BPM (energetic, intense)' },
  { value: '160', label: 'Very Fast — 160 BPM (explosive energy)' },
]

export const STRUCTURES = [
  {
    value: 'simple',
    label: 'Simple',
    description: 'Intro · Verse · Chorus · Verse · Chorus · Outro',
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Intro · Verse · Pre-Chorus · Chorus · Verse · Pre-Chorus · Chorus · Bridge · Outro',
  },
  {
    value: 'extended',
    label: 'Extended',
    description: 'Intro · Verse · Pre-Chorus · Chorus · Verse · Pre-Chorus · Chorus · Bridge · Final Chorus · Outro',
  },
  {
    value: 'instrumental',
    label: 'Instrumental',
    description: 'No lyrics — pure instrumental with section markers for arrangement',
  },
]

export const VOCALS = [
  { value: 'male-lead', label: 'Male Lead' },
  { value: 'female-lead', label: 'Female Lead' },
  { value: 'mixed-duet', label: 'Mixed / Duet' },
  { value: 'choir', label: 'Choir Only' },
  { value: 'none', label: 'No Vocals (Instrumental)' },
]

export const VOCAL_STYLES = [
  { value: 'powerful-anthemic', label: 'Powerful / Anthemic' },
  { value: 'emotional-soulful', label: 'Emotional / Soulful' },
  { value: 'soft-gentle', label: 'Soft / Gentle' },
  { value: 'raspy-gritty', label: 'Raspy / Gritty' },
  { value: 'clean-pure', label: 'Clean / Pure' },
  { value: 'operatic', label: 'Operatic' },
  { value: 'rap-flow', label: 'Rap / Flow' },
]

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'german', label: 'German' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
]

export const LYRICS_MODELS = [
  // { id: 'qwen/qwen3.6-plus-preview:free', label: 'Qwen 3.6 Plus', note: 'Fast · Free' },
  // { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Stepfun', note: 'Fast · Recommended' },
  { id: 'google/gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite', note: 'Fast · Recommended' },
  // { id: 'google/gemini-flash-1.5', label: 'Gemini 1.5 Flash', note: 'Balanced' },
  // { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini', note: 'Popular' },
  // { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', note: 'Open source' },
]

export const DEFAULT_LYRICS_FORM = {
  concept: '',
  genre: 'cinematic',
  moods: ['Inspirational', 'Emotional'],
  tempo: '80',
  structure: 'extended',
  vocals: 'male-lead',
  vocalStyle: 'powerful-anthemic',
  language: 'english',
  instrumentationHints: '',
  avoidText: '',
  model: 'google/gemini-2.0-flash-001',
}
