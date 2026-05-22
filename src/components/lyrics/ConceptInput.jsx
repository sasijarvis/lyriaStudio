const PLACEHOLDER = `Describe your track concept, theme, or story…

e.g. "A cinematic orchestral anthem about overcoming failure and rising stronger, inspired by modern film scores. Powerful emotional build from soft piano to full orchestra. Male lead vocal, anthemic chorus."`

export default function ConceptInput({ value, onChange, disabled }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300">
          Track Concept
        </label>
        <span className="font-display text-xs text-slate-400 dark:text-surface-500">
          The more detail, the better the output
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={PLACEHOLDER}
        rows={6}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 font-display text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500 dark:focus:border-accent-glow dark:focus:ring-accent/20"
      />
    </div>
  )
}
