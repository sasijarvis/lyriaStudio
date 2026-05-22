import { MODELS } from '../../constants/models'

const TABS = [
  { id: 'studio', label: 'Studio' },
  { id: 'lyrics', label: 'Lyrics' },
  { id: 'tracks', label: 'Tracks' },
]

export default function Header({ selectedModel, isDark, onToggleTheme, activePage, onNavigate, trackCount }) {
  const model = Object.values(MODELS).find((m) => m.id === selectedModel)
  const cost = model?.cost ?? 0.08

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-surface-500 dark:bg-surface-800/80 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-violet-400 shadow-glow-violet">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-base font-bold leading-tight text-slate-900 dark:text-white">
              LyriaStudio
            </h1>
            <p className="text-xs leading-tight text-slate-400 dark:text-surface-500">
              AI Music Generator
            </p>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-surface-500 dark:bg-surface-700">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-display text-xs font-semibold transition-all ${
                activePage === tab.id
                  ? 'bg-white text-accent shadow-sm dark:bg-surface-800 dark:text-accent-glow'
                  : 'text-slate-500 hover:text-slate-700 dark:text-surface-500 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              {tab.id === 'tracks' && trackCount > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 font-mono text-xs leading-none ${
                  activePage === 'tracks'
                    ? 'bg-accent text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-surface-600 dark:text-slate-400'
                }`}>
                  {trackCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {activePage === 'studio' && (
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 lg:flex dark:border-surface-500 dark:bg-surface-700">
              <div className="h-2 w-2 rounded-full bg-beat-green animate-pulse" />
              <span className="font-display text-xs text-slate-500 dark:text-slate-300">
                ~<span className="font-semibold text-beat-amber">${cost.toFixed(2)}</span> / gen
              </span>
            </div>
          )}

          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs text-slate-400 transition-colors hover:text-accent dark:text-surface-500 dark:hover:text-accent-glow xl:block"
          >
            Powered by OpenRouter
          </a>

          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition-all hover:border-accent hover:text-accent dark:border-surface-500 dark:bg-surface-700 dark:text-slate-300 dark:hover:border-accent-glow dark:hover:text-accent-glow"
          >
            {isDark ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
