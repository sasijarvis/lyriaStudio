export default function NegativePromptInput({ value, onChange, disabled }) {
  return (
    <div className="space-y-2">
      <label className="font-display text-xs font-semibold text-slate-600 dark:text-slate-300">
        Negative Prompt <span className="font-normal text-slate-400 dark:text-surface-500">(what to avoid)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g. distortion, off-key vocals, heavy metal, silence..."
        rows={2}
        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 font-display text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500 dark:focus:border-accent-glow"
      />
    </div>
  )
}
