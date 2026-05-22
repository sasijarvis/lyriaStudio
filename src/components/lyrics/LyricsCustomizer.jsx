import { useState } from 'react'
import {
  GENRES, MOODS, TEMPOS, STRUCTURES, VOCALS, VOCAL_STYLES, LANGUAGES, LYRICS_MODELS,
} from '../../constants/lyricsOptions'

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-surface-500">
        {title}
      </h4>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-display text-sm text-slate-700 shadow-sm focus:border-accent focus:outline-none dark:border-surface-500 dark:bg-surface-600 dark:text-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export default function LyricsCustomizer({ form, onChange, disabled }) {
  const [open, setOpen] = useState(true)

  const toggleMood = (mood) => {
    const current = form.moods
    const updated = current.includes(mood)
      ? current.filter((m) => m !== mood)
      : [...current, mood]
    onChange('moods', updated)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-surface-500 dark:bg-surface-700 transition-colors duration-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 font-display text-sm font-semibold text-slate-700 transition-colors hover:text-accent dark:text-slate-300 dark:hover:text-white"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-slate-400 dark:text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Customizations
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 dark:text-surface-500 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-5 border-t border-slate-100 px-4 pb-5 pt-4 dark:border-surface-500">

          {/* Genre + Language row */}
          <div className="grid grid-cols-2 gap-3">
            <Section title="Genre">
              <Select value={form.genre} onChange={(v) => onChange('genre', v)} options={GENRES} disabled={disabled} />
            </Section>
            <Section title="Language">
              <Select value={form.language} onChange={(v) => onChange('language', v)} options={LANGUAGES} disabled={disabled} />
            </Section>
          </div>

          {/* Tempo + Structure row */}
          <div className="grid grid-cols-2 gap-3">
            <Section title="Tempo">
              <Select
                value={form.tempo}
                onChange={(v) => onChange('tempo', v)}
                options={TEMPOS.map((t) => ({ value: t.value, label: t.label }))}
                disabled={disabled}
              />
            </Section>
            <Section title="Song Structure">
              <select
                value={form.structure}
                onChange={(e) => onChange('structure', e.target.value)}
                disabled={disabled}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-display text-sm text-slate-700 shadow-sm focus:border-accent focus:outline-none dark:border-surface-500 dark:bg-surface-600 dark:text-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {STRUCTURES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </Section>
          </div>

          {/* Structure description */}
          {form.structure && (
            <p className="rounded-lg bg-slate-50 px-3 py-2 font-display text-xs text-slate-500 dark:bg-surface-600 dark:text-slate-400">
              {STRUCTURES.find((s) => s.value === form.structure)?.description}
            </p>
          )}

          {/* Vocals + Vocal Style row */}
          <div className="grid grid-cols-2 gap-3">
            <Section title="Vocals">
              <Select value={form.vocals} onChange={(v) => onChange('vocals', v)} options={VOCALS} disabled={disabled} />
            </Section>
            <Section title="Vocal Style">
              <Select
                value={form.vocalStyle}
                onChange={(v) => onChange('vocalStyle', v)}
                options={VOCAL_STYLES}
                disabled={disabled || form.vocals === 'none'}
              />
            </Section>
          </div>

          {/* Mood chips */}
          <Section title={`Mood (${form.moods.length} selected)`}>
            <div className="flex flex-wrap gap-1.5">
              {MOODS.map((mood) => {
                const active = form.moods.includes(mood)
                return (
                  <button
                    key={mood}
                    onClick={() => toggleMood(mood)}
                    disabled={disabled}
                    className={`rounded-full px-3 py-1 font-display text-xs font-medium transition-all disabled:cursor-not-allowed ${
                      active
                        ? 'bg-accent text-white shadow-sm'
                        : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-accent/50 hover:text-accent dark:border-surface-500 dark:bg-surface-600 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {mood}
                  </button>
                )
              })}
            </div>
          </Section>

          {/* Instrumentation hints */}
          <Section title="Instrumentation Hints (optional)">
            <textarea
              value={form.instrumentationHints}
              onChange={(e) => onChange('instrumentationHints', e.target.value)}
              disabled={disabled}
              placeholder="e.g. Deep piano, full strings, brass section, taiko drums, choir..."
              rows={2}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 font-display text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-accent focus:outline-none dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500"
            />
          </Section>

          {/* Avoid */}
          <Section title="Avoid (optional)">
            <textarea
              value={form.avoidText}
              onChange={(e) => onChange('avoidText', e.target.value)}
              disabled={disabled}
              placeholder="e.g. No trap beats, no electronic drops, no pop elements..."
              rows={2}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 font-display text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-accent focus:outline-none dark:border-surface-500 dark:bg-surface-600 dark:text-white dark:placeholder-surface-500"
            />
          </Section>

          {/* AI Model selector */}
          <Section title="AI Model for Lyrics Generation">
            <div className="space-y-2">
              {LYRICS_MODELS.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 transition-all ${
                    form.model === m.id
                      ? 'border-accent bg-violet-50 dark:border-accent dark:bg-accent-muted'
                      : 'border-slate-200 bg-slate-50 hover:border-accent/40 dark:border-surface-500 dark:bg-surface-600 dark:hover:border-surface-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="lyricsModel"
                      value={m.id}
                      checked="checked"
                      onChange={() => onChange('model', m.id)}
                      disabled={disabled}
                      className="accent-accent"
                    />
                    <span className="font-display text-sm font-medium text-slate-700 dark:text-slate-300">
                      {m.label}
                    </span>
                  </div>
                  <span className="font-display text-xs text-slate-400 dark:text-surface-500">{m.note}</span>
                </label>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
