import { useState } from 'react'
import { DEFAULT_LYRICS_FORM } from '../constants/lyricsOptions'
import { useGenerateLyrics } from '../hooks/useGenerateLyrics'
import ConceptInput from '../components/lyrics/ConceptInput'
import LyricsCustomizer from '../components/lyrics/LyricsCustomizer'
import GeneratedLyricsPanel from '../components/lyrics/GeneratedLyricsPanel'

export default function LyricsGenerator({ onGenerateMusic }) {
  const [form, setForm] = useState(DEFAULT_LYRICS_FORM)
  const { generate, cancel, isLoading, error, result, updateResult } = useGenerateLyrics()

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleGenerate = async () => {
    if (!form.concept.trim()) return
    await generate(form)
  }

  const isDisabled = isLoading || !form.concept.trim()

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6">
      {/* Page header */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">
          Lyrics Generator
        </h2>
        <p className="mt-1 font-display text-sm text-slate-400 dark:text-surface-500">
          Describe your concept → AI generates a complete Lyria-optimized prompt with lyrics → Generate music directly
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* LEFT — Input & Customizations */}
        <div className="flex flex-col gap-4 lg:w-2/5">
          <ConceptInput
            value={form.concept}
            onChange={(v) => updateForm('concept', v)}
            disabled={isLoading}
          />

          <LyricsCustomizer form={form} onChange={updateForm} disabled={isLoading} />

          {/* Generate Lyrics button */}
          <div className="space-y-2">
            {isLoading ? (
              <button
                onClick={cancel}
                className="w-full rounded-xl border border-beat-red/40 bg-beat-red/10 py-3.5 font-display text-sm font-semibold text-beat-red transition-colors hover:bg-beat-red/20"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isDisabled}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-accent to-violet-400 py-3.5 font-display text-sm font-bold text-white shadow-glow-violet transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Lyrics
                </span>
              </button>
            )}
            {!isLoading && (
              <p className="text-center font-display text-xs text-slate-400 dark:text-surface-500">
                Uses a text AI model — free or low cost
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-beat-red/40 bg-beat-red/10 px-4 py-3">
              <p className="font-display text-sm text-beat-red">{error}</p>
            </div>
          )}

          {/* Tips card */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-surface-600 dark:bg-surface-700">
            <h4 className="mb-2 font-display text-xs font-semibold text-slate-600 dark:text-slate-300">
              Tips for better lyrics
            </h4>
            <ul className="space-y-1.5">
              {[
                'Include the emotional story or journey of the track',
                'Mention specific references, themes or metaphors',
                'Describe the energy arc (soft intro → powerful chorus)',
                'Add context: who is the song for? what feeling should it leave?',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="font-display text-xs text-slate-500 dark:text-slate-400">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — Generated output */}
        <div className="lg:w-3/5">
          <GeneratedLyricsPanel
            lyrics={result}
            isLoading={isLoading}
            onChange={updateResult}
            onGenerateMusic={onGenerateMusic}
            disabled={isLoading}
          />
        </div>
      </div>
    </main>
  )
}
