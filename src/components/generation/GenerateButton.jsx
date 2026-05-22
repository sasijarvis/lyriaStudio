import { MODEL_LIST } from '../../constants/models'

export default function GenerateButton({ isLoading, disabled, onClick, onCancel, selectedModel }) {
  const model = MODEL_LIST.find((m) => m.id === selectedModel)
  const cost = model?.cost ?? 0.08

  if (isLoading) {
    return (
      <div className="space-y-2">
        <button
          onClick={onCancel}
          className="w-full rounded-xl border border-beat-red/40 bg-beat-red/10 py-3.5 font-display text-sm font-semibold text-beat-red transition-colors hover:bg-beat-red/20"
        >
          Cancel Generation
        </button>
        <p className="text-center font-display text-xs text-slate-400 dark:text-surface-500">
          Composing your track… this may take up to 30 seconds
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent via-violet-500 to-accent-glow py-3.5 font-display text-sm font-bold text-white shadow-glow-violet transition-all hover:shadow-glow-violet hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        style={{ backgroundSize: '200% 100%' }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          Generate Music
        </span>
      </button>
      <p className="text-center font-display text-xs text-slate-400 dark:text-surface-500">
        Estimated cost:{' '}
        <span className="font-semibold text-beat-amber">${cost.toFixed(2)}</span>
      </p>
    </div>
  )
}
