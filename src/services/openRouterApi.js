const BASE_URL = 'https://openrouter.ai/api/v1'

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

/**
 * @param {{ prompt: string, model: string, temperature: number, seed: string, negativePrompt: string }} params
 */
export function buildRequest({ prompt, model, temperature, seed, negativePrompt }) {
  const fullPrompt = negativePrompt?.trim()
    ? `${prompt}\n\nAvoid: ${negativePrompt}`
    : prompt

  const body = {
    model,
    modalities: ['audio', 'text'],
    messages: [{ role: 'user', content: fullPrompt }],
    temperature: temperature ?? 1.0,
    stream: true,
  }

  const parsedSeed = parseInt(seed, 10)
  if (!isNaN(parsedSeed)) {
    body.seed = parsedSeed
  }

  return body
}

/**
 * Calls the API with stream:true and accumulates the SSE chunks into a
 * single assembled result: { audioBase64, mimeType, lyrics }.
 *
 * @param {object} requestBody
 * @param {string} apiKey
 * @param {AbortSignal} signal
 * @returns {Promise<{ audioBase64: string|null, mimeType: string, lyrics: string }>}
 */
export async function generateMusic(requestBody, apiKey, signal) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'LyriaStudio',
    },
    body: JSON.stringify(requestBody),
    signal,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new ApiError(
      response.status,
      errorBody.error?.message ?? `Request failed with status ${response.status}`
    )
  }

  // Parse the SSE stream and accumulate audio + text across all chunks
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  const audioChunks = []   // base64 string parts
  let mimeType = 'audio/mp3'
  const textParts = []

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // SSE lines are separated by \n\n
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? '' // keep the incomplete last line

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data:')) continue

      const jsonStr = trimmed.slice(5).trim()
      if (jsonStr === '[DONE]') continue

      let chunk
      try {
        chunk = JSON.parse(jsonStr)
      } catch {
        continue
      }

      const delta = chunk?.choices?.[0]?.delta
      if (!delta) continue

      // Audio arrives in delta.audio.data
      if (delta.audio?.data) {
        audioChunks.push(delta.audio.data)
      }

      // Text/lyrics arrive in delta.content
      const content = delta.content
      if (content && typeof content === 'string') {
        textParts.push(content)
      } else if (Array.isArray(content)) {
        for (const part of content) {
          if (part.type === 'audio' && part.inline_data?.data) {
            audioChunks.push(part.inline_data.data)
            if (part.inline_data.mime_type) mimeType = part.inline_data.mime_type
          } else if (part.type === 'text' && part.text) {
            textParts.push(part.text)
          }
        }
      }
    }
  }

  return {
    audioBase64: audioChunks.length > 0 ? audioChunks.join('') : null,
    mimeType,
    lyrics: textParts.join(''),
  }
}
