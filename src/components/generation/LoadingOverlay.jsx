const BAR_COUNT = 12

export default function LoadingOverlay({ isVisible }) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm dark:bg-surface-900/90 transition-colors duration-200">
      <div className="flex items-end gap-1 mb-4">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-2 rounded-t bg-gradient-to-t from-accent to-violet-400"
            style={{
              animation: `equalizer ${0.5 + (i % 4) * 0.15}s ease-in-out ${(i * 0.08) % 0.5}s infinite alternate`,
              height: `${24 + (i % 5) * 8}px`,
            }}
          />
        ))}
      </div>
      <p className="font-display text-sm font-semibold text-slate-800 dark:text-white">
        Composing your track…
      </p>
      <p className="mt-1 font-display text-xs text-slate-400 dark:text-surface-500">
        This may take up to 30 seconds
      </p>
    </div>
  )
}
