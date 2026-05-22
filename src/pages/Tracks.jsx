import { useState, useMemo } from 'react'
import { MODEL_LIST } from '../constants/models'
import TrackCard from '../components/tracks/TrackCard'

export default function Tracks({ tracks, onDelete, onClearAll }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModel, setFilterModel] = useState('all')

  const filteredTracks = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return tracks
      .filter((t) => filterModel === 'all' || t.model === filterModel)
      .filter(
        (t) =>
          !q ||
          t.prompt.toLowerCase().includes(q) ||
          (t.lyrics ?? '').toLowerCase().includes(q)
      )
  }, [tracks, searchQuery, filterModel])

  const handleClearAll = async () => {
    if (!confirm(`Delete all ${tracks.length} tracks? This cannot be undone.`)) return
    await onClearAll()
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-6">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">
            Saved Tracks
          </h2>
          <p className="font-display text-sm text-slate-400 dark:text-surface-500">
            {filteredTracks.length} of {tracks.length} track{tracks.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts or lyrics…"
              className="rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 font-display text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-surface-500 dark:bg-surface-700 dark:text-white dark:placeholder-surface-500 dark:focus:border-accent-glow"
            />
          </div>

          {/* Model filter */}
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 font-display text-sm text-slate-700 shadow-sm focus:border-accent focus:outline-none dark:border-surface-500 dark:bg-surface-700 dark:text-slate-300"
          >
            <option value="all">All models</option>
            {MODEL_LIST.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>

          {/* Clear all */}
          {tracks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="rounded-xl border border-beat-red/30 bg-beat-red/5 px-3 py-2 font-display text-sm text-beat-red transition-colors hover:bg-beat-red/10"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {tracks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 dark:border-surface-500 dark:bg-surface-800">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-violet-400/20">
            <svg className="h-7 w-7 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <p className="font-display text-base font-semibold text-slate-700 dark:text-slate-300">
            No tracks yet
          </p>
          <p className="mt-1 font-display text-sm text-slate-400 dark:text-surface-500">
            Generate music in Studio and your tracks will appear here.
          </p>
        </div>
      )}

      {/* No results */}
      {tracks.length > 0 && filteredTracks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 dark:border-surface-500 dark:bg-surface-800">
          <p className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
            No results for "{searchQuery}"
          </p>
          <button
            onClick={() => { setSearchQuery(''); setFilterModel('all') }}
            className="mt-2 font-display text-sm text-accent hover:underline dark:text-accent-glow"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Track list */}
      {filteredTracks.length > 0 && (
        <div className="space-y-4">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} onDelete={onDelete} />
          ))}
        </div>
      )}
    </main>
  )
}
