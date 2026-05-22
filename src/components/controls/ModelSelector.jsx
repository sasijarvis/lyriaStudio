import { MODEL_LIST } from '../../constants/models'

export default function ModelSelector({ value, onChange, disabled }) {
  return (
    <div className="space-y-2">
      <label className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
        Model
      </label>
      <div className="grid grid-cols-2 gap-3">
        {MODEL_LIST.map((model) => {
          const selected = value === model.id
          return (
            <button
              key={model.id}
              onClick={() => onChange(model.id)}
              disabled={disabled}
              className={`relative rounded-xl border p-3 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? 'border-accent bg-violet-50 shadow-md dark:border-accent dark:bg-accent-muted dark:shadow-glow-violet'
                  : 'border-slate-200 bg-white shadow-sm hover:border-accent/50 hover:bg-violet-50/50 dark:border-surface-500 dark:bg-surface-700 dark:hover:border-surface-500 dark:hover:bg-surface-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm font-semibold text-slate-800 dark:text-white">
                  {model.label}
                </span>
                <span className={`rounded px-1.5 py-0.5 font-mono text-xs font-medium ${model.badgeClass}`}>
                  {model.badge}
                </span>
              </div>
              <p className="mt-1 font-display text-xs text-slate-500 dark:text-slate-400">
                {model.description}
              </p>
              <p className="mt-1.5 font-display text-xs font-semibold text-beat-amber">
                ${model.cost.toFixed(2)}/generation
              </p>
              {selected && (
                <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
