import { useState } from 'react'
import { MODEL_LIST } from '../../constants/models'
import { formatFullTimestamp, truncate } from '../../utils/formatters'
import TrackPlayerInline from './TrackPlayerInline'

export default function TrackCard({ track, onDelete }) {
  const [isLyricsOpen, setIsLyricsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const model = MODEL_LIST.find((m) => m.id === track.model)

  const handleDelete = async () => {
    if (!confirm('Delete this track? This cannot be undone.')) return
    setIsDeleting(true)
    await onDelete(track.id)
  }

  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all dark:border-surface-500 dark:bg-surface-800 ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Top row: prompt + timestamp + delete */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="font-display text-sm font-semibold leading-snug text-slate-800 dark:text-white">
          {track.prompt}
        </p>
        <div className="flex flex-shrink-0 items-center gap-2">
          <time className="font-display text-xs text-slate-400 dark:text-surface-500 whitespace-nowrap">
            {formatFullTimestamp(track.timestamp)}
          </time>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete track"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-beat-red/10 hover:text-beat-red dark:text-surface-500 dark:hover:text-beat-red"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Metadata badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {model && (
          <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${model.badgeClass}`}>
            {model.label}
          </span>
        )}
        <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-500 dark:border-surface-600 dark:bg-surface-700 dark:text-slate-400">
          temp {track.temperature.toFixed(1)}
        </span>
        {track.seed && (
          <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-500 dark:border-surface-600 dark:bg-surface-700 dark:text-slate-400">
            seed {track.seed}
          </span>
        )}
        {track.negativePrompt && (
          <span
            title={track.negativePrompt}
            className="rounded-md border border-beat-red/20 bg-beat-red/5 px-2 py-0.5 font-mono text-xs text-beat-red"
          >
            avoid: {truncate(track.negativePrompt, 28)}
          </span>
        )}
      </div>

      {/* Inline player */}
      <TrackPlayerInline trackId={track.id} mimeType={track.mimeType} />

      {/* Lyrics collapsible */}
      {track.lyrics && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-surface-600">
          <button
            onClick={() => setIsLyricsOpen((o) => !o)}
            className="flex items-center gap-1.5 font-display text-xs font-medium text-slate-400 transition-colors hover:text-accent dark:text-surface-500 dark:hover:text-accent-glow"
          >
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-200 ${isLyricsOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isLyricsOpen ? 'Hide lyrics' : 'Show lyrics'}
          </button>
          {isLyricsOpen && (
            <pre className="mt-3 max-h-44 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-3 font-mono text-xs leading-relaxed text-slate-600 dark:border-surface-600 dark:bg-surface-700 dark:text-slate-300">
              {track.lyrics}
            </pre>
          )}
        </div>
      )}
    </article>
  )
}
