export default function TemperatureSlider({ value, onChange, disabled }) {
  const label =
    value < 0.5 ? 'Conservative' : value < 1.2 ? 'Balanced' : value < 1.7 ? 'Creative' : 'Wild'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-display text-xs font-semibold text-slate-600 dark:text-slate-300">
          Creativity (Temperature)
        </label>
        <span className="font-mono text-xs text-accent dark:text-accent-glow">
          {value.toFixed(1)} — {label}
        </span>
      </div>
      <input
        type="range" min="0" max="2" step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent disabled:cursor-not-allowed dark:bg-surface-500"
      />
      <div className="flex justify-between">
        <span className="font-display text-xs text-slate-400 dark:text-surface-500">0.0</span>
        <span className="font-display text-xs text-slate-400 dark:text-surface-500">2.0</span>
      </div>
    </div>
  )
}
