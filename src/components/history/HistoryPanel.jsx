import HistoryItem from './HistoryItem'

export default function HistoryPanel({ history, onSelect, onClear, activeId }) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
        <h3 className="mb-2 font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Recent Generations
        </h3>
        <p className="font-display text-xs text-slate-400 dark:text-surface-500">
          Your last 5 generations will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Recent Generations
        </h3>
        <button
          onClick={onClear}
          className="font-display text-xs text-slate-400 transition-colors hover:text-beat-red dark:text-surface-500"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} onSelect={onSelect} isActive={item.id === activeId} />
        ))}
      </div>
      <p className="mt-3 font-display text-xs text-slate-400 dark:text-surface-500">
        Audio is session-only and not saved between page reloads.
      </p>
    </div>
  )
}
