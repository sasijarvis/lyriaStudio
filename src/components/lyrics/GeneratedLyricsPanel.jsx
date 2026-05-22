import { useState } from 'react'

const SHIMMER_LINES = [90, 70, 80, 60, 75, 55, 85, 65, 70, 50, 80, 60, 40, 75, 65, 55, 90, 70]

export default function GeneratedLyricsPanel({ lyrics, isLoading, onChange, onGenerateMusic, disabled }) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(lyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-surface-500 dark:bg-surface-800">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-end gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 rounded-t bg-gradient-to-t from-accent to-violet-400"
                style={{
                  animation: `equalizer ${0.4 + i * 0.1}s ease-in-out ${i * 0.1}s infinite alternate`,
                  height: `${10 + i * 4}px`,
                }}
              />
            ))}
          </div>
          <p className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
            Composing lyrics…
          </p>
        </div>
        <div className="space-y-2.5">
          {SHIMMER_LINES.map((w, i) => (
            <div key={i} className="shimmer h-3 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (!lyrics) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 dark:border-surface-500 dark:bg-surface-800">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-violet-400/20">
          <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="font-display text-base font-semibold text-slate-700 dark:text-slate-300">
          Your Lyria-optimized prompt will appear here
        </p>
        <p className="mt-1 font-display text-sm text-slate-400 dark:text-surface-500">
          Fill in the concept, customize options, then click Generate Lyrics
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Lyrics card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-surface-500 dark:bg-surface-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-surface-600">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-beat-green animate-pulse" />
            <h3 className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
              Lyria-Optimized Prompt
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing((e) => !e)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-display text-xs transition-all ${
                isEditing
                  ? 'border-accent bg-violet-50 text-accent dark:border-accent-glow dark:bg-accent-muted dark:text-accent-glow'
                  : 'border-slate-200 text-slate-500 hover:border-accent hover:text-accent dark:border-surface-500 dark:text-slate-400 dark:hover:border-accent-glow dark:hover:text-white'
              }`}
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {isEditing ? 'Done' : 'Edit'}
            </button>
            <button
              onClick={copy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 font-display text-xs text-slate-500 transition-all hover:border-accent hover:text-accent dark:border-surface-500 dark:text-slate-400 dark:hover:border-accent-glow dark:hover:text-white"
            >
              {copied ? (
                <>
                  <svg className="h-3 w-3 text-beat-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {isEditing ? (
            <textarea
              value={lyrics}
              onChange={(e) => onChange(e.target.value)}
              rows={28}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs leading-relaxed text-slate-800 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-surface-500 dark:bg-surface-700 dark:text-slate-200"
            />
          ) : (
            <pre className="max-h-[600px] overflow-y-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {lyrics}
            </pre>
          )}
        </div>
      </div>

      {/* Generate Music button */}
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-slate-50 p-5 dark:border-accent-muted dark:bg-gradient-to-br dark:from-accent-muted/40 dark:to-surface-800">
        <div className="mb-3">
          <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white">
            Ready to compose?
          </h4>
          <p className="mt-0.5 font-display text-xs text-slate-500 dark:text-slate-400">
            This full prompt will be sent to Google Lyria to generate your track.
          </p>
        </div>
        <button
          onClick={() => onGenerateMusic(lyrics)}
          disabled={disabled || !lyrics}
          className="w-full rounded-xl bg-gradient-to-r from-accent via-violet-500 to-accent-glow py-3.5 font-display text-sm font-bold text-white shadow-glow-violet transition-all hover:opacity-90 hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            Generate Music with Google Lyria
          </span>
        </button>
      </div>
    </div>
  )
}
