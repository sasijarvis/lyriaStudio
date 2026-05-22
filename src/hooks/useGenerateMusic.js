import { useState, useRef, useCallback } from 'react'
import { buildRequest, generateMusic, ApiError } from '../services/openRouterApi'
import { base64ToBlobUrl } from '../utils/audioUtils'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

export function useGenerateMusic() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const abortRef = useRef(null)

  const generate = useCallback(async (formState) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      if (!API_KEY) {
        throw new Error('No API key found. Add VITE_OPENROUTER_API_KEY to your .env file.')
      }

      const requestBody = buildRequest(formState)
      const parsed = await generateMusic(requestBody, API_KEY, abortRef.current.signal)

      if (!parsed.audioBase64) {
        throw new Error('The API returned no audio. Please try again or adjust your prompt.')
      }

      const blobUrl = base64ToBlobUrl(parsed.audioBase64, parsed.mimeType)
      setResult({ blobUrl, mimeType: parsed.mimeType, lyrics: parsed.lyrics })
      return { blobUrl, mimeType: parsed.mimeType, lyrics: parsed.lyrics }
    } catch (err) {
      if (err.name === 'AbortError') return null

      let message
      if (err instanceof ApiError) {
        if (err.status === 401) message = 'Invalid API key. Check your VITE_OPENROUTER_API_KEY.'
        else if (err.status === 402) message = 'Insufficient credits on your OpenRouter account.'
        else if (err.status === 429) message = 'Rate limit reached. Please wait and try again.'
        else message = `API Error ${err.status}: ${err.message}`
      } else {
        message = err.message
      }

      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setIsLoading(false)
  }, [])

  return { generate, cancel, isLoading, error, result }
}
