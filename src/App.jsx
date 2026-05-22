import { useState } from 'react'
import { MODELS } from './constants/models'
import { useGenerateMusic } from './hooks/useGenerateMusic'
import { useHistory } from './hooks/useHistory'
import { useTheme } from './hooks/useTheme'
import { useTracks } from './hooks/useTracks'

import Header from './components/layout/Header'
import PromptInput from './components/prompt/PromptInput'
import PromptSuggestions from './components/prompt/PromptSuggestions'
import ModelSelector from './components/controls/ModelSelector'
import AdvancedOptions from './components/controls/AdvancedOptions'
import GenerateButton from './components/generation/GenerateButton'
import LoadingOverlay from './components/generation/LoadingOverlay'
import AudioPlayer from './components/player/AudioPlayer'
import LyricsPanel from './components/results/LyricsPanel'
import HistoryPanel from './components/history/HistoryPanel'
import TracksPage from './pages/Tracks'
import LyricsGenerator from './pages/LyricsGenerator'

const DEFAULT_FORM = {
  prompt: '',
  model: MODELS.PRO.id,
  temperature: 1.0,
  seed: '',
  negativePrompt: '',
}

export default function App() {
  const [formState, setFormState] = useState(DEFAULT_FORM)
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [activePage, setActivePage] = useState('studio')

  const { isDark, toggle } = useTheme()
  const { generate, cancel, isLoading, error, result } = useGenerateMusic()
  const { history, addEntry, clearHistory } = useHistory()
  const { tracks, addTrack, removeTrack, clearAllTracks } = useTracks()

  const updateForm = (key, value) =>
    setFormState((prev) => ({ ...prev, [key]: value }))

  const handleGenerate = async () => {
    if (!formState.prompt.trim()) return
    const generated = await generate(formState)
    if (generated) {
      addEntry({ prompt: formState.prompt, model: formState.model, lyrics: generated.lyrics })
      setActiveHistoryId(null)

      const id = Date.now().toString()
      const trackMeta = {
        id,
        timestamp: new Date().toISOString(),
        prompt: formState.prompt,
        model: formState.model,
        temperature: formState.temperature,
        seed: formState.seed,
        negativePrompt: formState.negativePrompt,
        lyrics: generated.lyrics ?? '',
        mimeType: generated.mimeType,
      }
      try {
        const blob = await fetch(generated.blobUrl).then((r) => r.blob())
        await addTrack(trackMeta, blob)
      } catch {
        console.warn('Failed to persist track to storage')
      }
    }
  }

  // Called from LyricsGenerator — pre-fills Studio prompt and navigates
  const handleGenerateMusicFromLyrics = (fullPrompt) => {
    setFormState((prev) => ({ ...prev, prompt: fullPrompt }))
    setActivePage('studio')
  }

  const handleHistorySelect = (item) => {
    setFormState((prev) => ({ ...prev, prompt: item.prompt, model: item.model }))
    setActiveHistoryId(item.id)
  }

  const isDisabled = isLoading || !formState.prompt.trim()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-surface-900 transition-colors duration-200">
      <Header
        selectedModel={formState.model}
        isDark={isDark}
        onToggleTheme={toggle}
        activePage={activePage}
        onNavigate={setActivePage}
        trackCount={tracks.length}
      />

      {activePage === 'tracks' && (
        <TracksPage tracks={tracks} onDelete={removeTrack} onClearAll={clearAllTracks} />
      )}

      {activePage === 'lyrics' && (
        <LyricsGenerator onGenerateMusic={handleGenerateMusicFromLyrics} />
      )}

      {activePage === 'studio' && (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4 md:w-2/5">
              <PromptInput
                value={formState.prompt}
                onChange={(v) => updateForm('prompt', v)}
                disabled={isLoading}
              />
              <PromptSuggestions onSelect={(text) => updateForm('prompt', text)} disabled={isLoading} />
              <ModelSelector value={formState.model} onChange={(v) => updateForm('model', v)} disabled={isLoading} />
              <AdvancedOptions
                temperature={formState.temperature}
                seed={formState.seed}
                negativePrompt={formState.negativePrompt}
                onChange={updateForm}
                disabled={isLoading}
              />
              <GenerateButton
                isLoading={isLoading}
                disabled={isDisabled}
                onClick={handleGenerate}
                onCancel={cancel}
                selectedModel={formState.model}
              />
              {error && (
                <div className="rounded-xl border border-beat-red/40 bg-beat-red/10 px-4 py-3">
                  <p className="font-display text-sm text-beat-red">{error}</p>
                </div>
              )}
              <HistoryPanel
                history={history}
                onSelect={handleHistorySelect}
                onClear={clearHistory}
                activeId={activeHistoryId}
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="relative flex flex-col gap-4 md:w-3/5">
              <LoadingOverlay isVisible={isLoading} />
              <AudioPlayer blobUrl={result?.blobUrl} mimeType={result?.mimeType} />
              <LyricsPanel lyrics={result?.lyrics} isLoading={isLoading} />
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
