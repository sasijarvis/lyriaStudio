import { useState } from 'react'
import TemperatureSlider from './TemperatureSlider'
import SeedInput from './SeedInput'
import NegativePromptInput from './NegativePromptInput'

export default function AdvancedOptions({ temperature, seed, negativePrompt, onChange, disabled }) {
  const [open, setOpen] = useState(false)

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
          Advanced Options
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 dark:text-surface-500 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-4 dark:border-surface-500">
          <TemperatureSlider value={temperature} onChange={(v) => onChange('temperature', v)} disabled={disabled} />
          <SeedInput value={seed} onChange={(v) => onChange('seed', v)} disabled={disabled} />
          <NegativePromptInput value={negativePrompt} onChange={(v) => onChange('negativePrompt', v)} disabled={disabled} />
        </div>
      </div>
    </div>
  )
}
