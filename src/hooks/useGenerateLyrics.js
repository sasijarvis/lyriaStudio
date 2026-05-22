import { useState, useRef, useCallback } from 'react'
import { buildLyricsPrompt, generateLyricsText } from '../services/lyricsApi'
import { ApiError } from '../services/openRouterApi'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

export function useGenerateLyrics() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')
  const abortRef = useRef(null)

  const generate = useCallback(async (formState) => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      if (!API_KEY) {
        throw new Error('No API key found. Add VITE_OPENROUTER_API_KEY to your .env file.')
      }
      if (!formState.concept?.trim()) {
        throw new Error('Please describe your track concept first.')
      }

      const userPrompt = buildLyricsPrompt(formState)
      const text = await generateLyricsText(userPrompt, formState.model, API_KEY, abortRef.current.signal)
      setResult(text)
      return text
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

  const updateResult = useCallback((text) => setResult(text), [])

  return { generate, cancel, isLoading, error, result, updateResult }
}
