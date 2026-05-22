import { MODEL_LIST } from '../../constants/models'
import { truncate, formatTimestamp } from '../../utils/formatters'

export default function HistoryItem({ item, onSelect, isActive }) {
  const model = MODEL_LIST.find((m) => m.id === item.model)

  return (
    <button
      onClick={() => onSelect(item)}
      className={`w-full rounded-xl border p-3 text-left transition-all ${
        isActive
          ? 'border-accent bg-violet-50 dark:border-accent dark:bg-accent-muted'
          : 'border-slate-200 bg-slate-50 hover:border-accent/50 hover:bg-violet-50/50 dark:border-surface-500 dark:bg-surface-700 dark:hover:border-surface-500 dark:hover:bg-surface-600'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-xs font-medium leading-snug text-slate-700 dark:text-slate-300">
          {truncate(item.prompt)}
        </p>
        <span className="flex-shrink-0 font-display text-xs text-slate-400 dark:text-surface-500">
          {formatTimestamp(item.timestamp)}
        </span>
      </div>
      {model && (
        <span className={`mt-1.5 inline-block rounded px-1.5 py-0.5 font-mono text-xs font-medium ${model.badgeClass}`}>
          {model.badge}
        </span>
      )}
    </button>
  )
}
