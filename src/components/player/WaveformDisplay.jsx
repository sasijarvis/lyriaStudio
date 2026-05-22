const BAR_COUNT = 30

export default function WaveformDisplay({ isPlaying }) {
  return (
    <div className="flex h-12 items-end justify-center gap-0.5">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-t-sm transition-colors duration-300 ${
            isPlaying
              ? 'bg-gradient-to-t from-accent to-violet-400'
              : 'bg-slate-200 dark:bg-surface-500'
          }`}
          style={
            isPlaying
              ? {
                  animation: `equalizer ${0.5 + Math.random() * 0.6}s ease-in-out ${(i * 0.04) % 0.5}s infinite alternate`,
                  height: `${20 + Math.floor(Math.random() * 60)}%`,
                }
              : { height: `${15 + ((i * 7) % 40)}%` }
          }
        />
      ))}
    </div>
  )
}
