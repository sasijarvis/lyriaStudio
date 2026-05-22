const MAX_LENGTH = 5000

export default function PromptInput({ value, onChange, disabled }) {
  const pct = value.length / MAX_LENGTH
  const counterColor = pct > 0.9 ? 'text-beat-red' : pct > 0.75 ? 'text-beat-amber' : 'text-slate-400 dark:text-surface-500'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Describe your music
        </label>
        <span className={`font-mono text-xs transition-colors ${counterColor}`}>
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={MAX_LENGTH}
        placeholder="e.g. Upbeat jazz fusion, 120 BPM, saxophone lead, [Verse] smooth groove, [Chorus] energetic burst..."
        rows={10}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 font-display text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500 dark:focus:border-accent-glow dark:focus:ring-accent/20"
      />
    </div>
  )
}
