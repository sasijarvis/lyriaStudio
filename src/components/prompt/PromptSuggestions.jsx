import { EXAMPLE_PROMPTS } from '../../constants/prompts'

export default function PromptSuggestions({ onSelect, disabled }) {
  return (
    <div className="space-y-2">
      <p className="font-display text-xs font-medium text-slate-400 dark:text-surface-500">
        Quick start examples
      </p>
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p.label}
            onClick={() => onSelect(p.text)}
            disabled={disabled}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-display text-xs text-slate-600 shadow-sm transition-all hover:border-accent hover:bg-violet-50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 dark:border-surface-500 dark:bg-surface-700 dark:text-slate-300 dark:hover:border-accent-glow dark:hover:text-white"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
