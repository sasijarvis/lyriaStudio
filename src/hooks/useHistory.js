import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const MAX_HISTORY = 5
const HISTORY_KEY = 'lyria_history'

export function useHistory() {
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, [])

  const addEntry = useCallback(
    (entry) => {
      // Blob URLs are session-only — do not persist to localStorage
      const storableEntry = {
        id: Date.now().toString(),
        prompt: entry.prompt,
        model: entry.model,
        lyrics: entry.lyrics,
        timestamp: new Date().toISOString(),
      }
      setHistory((prev) => [storableEntry, ...prev].slice(0, MAX_HISTORY))
    },
    [setHistory]
  )

  const clearHistory = useCallback(() => setHistory([]), [setHistory])

  return { history, addEntry, clearHistory }
}
