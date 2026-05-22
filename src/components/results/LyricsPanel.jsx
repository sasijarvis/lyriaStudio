import { useState } from 'react'

export default function LyricsPanel({ lyrics, isLoading }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(lyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
            Lyrics & Structure
          </h3>
        </div>
        <div className="space-y-2.5">
          {[75, 55, 68, 45, 60, 50, 70].map((w, i) => (
            <div key={i} className="shimmer h-3 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (!lyrics) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
        <h3 className="mb-2 font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Lyrics & Structure
        </h3>
        <p className="font-display text-sm text-slate-400 dark:text-surface-500">
          Generated lyrics and song structure will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Lyrics & Structure
        </h3>
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
      <pre className="max-h-52 overflow-y-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {lyrics}
      </pre>
    </div>
  )
}
