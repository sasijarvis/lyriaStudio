import { ApiError } from './openRouterApi'

const BASE_URL = 'https://openrouter.ai/api/v1'

const SYSTEM_PROMPT = `You are a professional songwriter and AI music prompt engineer specializing in Google Lyria music generation. Generate a complete, structured Lyria-optimized music prompt with original lyrics from the concept provided.

OUTPUT FORMAT — follow this EXACTLY, no extra commentary:

[One to two sentence description of the track concept and emotional journey]

Mood: [comma-separated mood adjectives]
Tempo: [BPM] BPM ([description, e.g. "slow cinematic build"])

Structure:
- [Section Name] – [one-line description]
(list all sections in order)

Instrumentation:
- [specific instrument] – [its role/character in the track]
(6–10 entries, be specific: "fingerpicked acoustic guitar" not just "guitar")

Style notes:
- [production or stylistic guideline]
(4–6 entries)

Vocals:
- [gender, tone, and character description]
- [delivery style per section]
- [processing/effects, e.g. "light reverb, no autotune"]

Avoid:
- [element to exclude]
(2–5 entries based on genre)

🎵 Title: "[Creative Track Title]"

[Intro]
[2–4 short atmospheric lines or spoken word]

[Verse 1]
[8 lines — storytelling, low-medium energy, rhyming]

[Pre-Chorus]
[4 lines — emotional build, tension rising]

[Chorus]
[8 lines — powerful, anthemic, hooky, high energy]

[Verse 2]
[8 lines — deeper story, stronger rhythm than Verse 1]

[Pre-Chorus]
[4 lines]

[Chorus]
[8 lines]

[Bridge]
[4–6 lines — contrast, emotional peak, different perspective]

[Final Chorus]
[8 lines — variation on chorus with maximum energy]

[Outro]
[2–4 lines — resolution, fade or callback to intro]

RULES:
- Use [] section markers exactly — Lyria uses these for musical structure
- Lyrics must rhyme naturally and be singable with consistent syllable flow
- Match lyrical themes tightly to the mood, genre, and concept
- For instrumental structure, replace lyric lines with [silence] or descriptive markers
- Output ONLY the formatted prompt — no explanations, no markdown headers, no preamble`

/**
 * Build the user message from the form state.
 */
export function buildLyricsPrompt(form) {
  const genreMap = {
    cinematic: 'Cinematic / Orchestral', 'epic-fantasy': 'Epic / Fantasy',
    pop: 'Pop', 'hip-hop': 'Hip-Hop / Rap', rock: 'Rock', jazz: 'Jazz',
    electronic: 'Electronic / EDM', folk: 'Folk / Acoustic', rnb: 'R&B / Soul',
    classical: 'Classical', metal: 'Metal', lofi: 'Lofi / Chill',
  }
  const vocalMap = {
    'male-lead': 'Male Lead', 'female-lead': 'Female Lead',
    'mixed-duet': 'Mixed / Duet', choir: 'Choir Only', none: 'No Vocals / Instrumental',
  }
  const vocalStyleMap = {
    'powerful-anthemic': 'powerful and anthemic',
    'emotional-soulful': 'emotional and soulful',
    'soft-gentle': 'soft and gentle',
    'raspy-gritty': 'raspy and gritty',
    'clean-pure': 'clean and pure',
    operatic: 'operatic',
    'rap-flow': 'rap / flow delivery',
  }
  const structureMap = {
    simple: 'Simple (Intro · Verse · Chorus · Verse · Chorus · Outro)',
    standard: 'Standard (Intro · Verse · Pre-Chorus · Chorus · Verse · Pre-Chorus · Chorus · Bridge · Outro)',
    extended: 'Extended (Intro · Verse · Pre-Chorus · Chorus · Verse · Pre-Chorus · Chorus · Bridge · Final Chorus · Outro)',
    instrumental: 'Instrumental only — no lyrics, just section markers for arrangement',
  }

  let prompt = `Concept / Theme:\n${form.concept}\n\n`
  prompt += `Genre: ${genreMap[form.genre] || form.genre}\n`
  prompt += `Mood: ${form.moods.join(', ')}\n`
  prompt += `Tempo: ${form.tempo} BPM\n`
  prompt += `Structure: ${structureMap[form.structure] || form.structure}\n`
  prompt += `Vocals: ${vocalMap[form.vocals] || form.vocals}`
  if (form.vocals !== 'none') {
    prompt += ` — ${vocalStyleMap[form.vocalStyle] || form.vocalStyle} style`
  }
  prompt += `\nLyrics Language: ${form.language}\n`
  if (form.instrumentationHints?.trim()) {
    prompt += `\nInstrumentation hints:\n${form.instrumentationHints}\n`
  }
  if (form.avoidText?.trim()) {
    prompt += `\nAvoid:\n${form.avoidText}\n`
  }
  return prompt
}

/**
 * Call OpenRouter with a text model to generate lyrics.
 */
export async function generateLyricsText(userPrompt, model, apiKey, signal) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'LyriaStudio',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
    }),
    signal,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new ApiError(response.status, err.error?.message ?? `Request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? ''
}
