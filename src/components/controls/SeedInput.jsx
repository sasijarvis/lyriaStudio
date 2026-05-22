export default function SeedInput({ value, onChange, disabled }) {
  const randomize = () => onChange(Math.floor(Math.random() * 999999).toString())
  const clear = () => onChange('')

  return (
    <div className="space-y-2">
      <label className="font-display text-xs font-semibold text-slate-600 dark:text-slate-300">
        Seed <span className="font-normal text-slate-400 dark:text-surface-500">(optional — for reproducible results)</span>
      </label>
      <div className="flex gap-2">
        <input
          type="number" value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled} placeholder="e.g. 42"
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500 dark:focus:border-accent-glow"
        />
        <button onClick={randomize} disabled={disabled} title="Generate random seed"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-display text-xs text-slate-600 shadow-sm transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-700 dark:text-slate-300 dark:hover:border-accent-glow dark:hover:text-white"
        >
          🎲
        </button>
        {value && (
          <button onClick={clear} disabled={disabled} title="Clear seed"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-display text-xs text-slate-400 transition-colors hover:text-beat-red disabled:cursor-not-allowed dark:border-surface-500 dark:bg-surface-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
