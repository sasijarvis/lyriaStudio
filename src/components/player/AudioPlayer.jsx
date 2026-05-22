import { useRef, useState, useEffect } from 'react'
import { formatTime } from '../../utils/formatters'
import WaveformDisplay from './WaveformDisplay'
import DownloadButton from '../results/DownloadButton'

export default function AudioPlayer({ blobUrl, mimeType }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
  }, [blobUrl])

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [blobUrl])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    isPlaying ? audio.pause() : audio.play()
  }

  const handleScrub = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  if (!blobUrl) {
    return (
      <div className="flex h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
        <div className="mb-3 flex h-12 items-end justify-center gap-0.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 rounded-t-sm bg-slate-200 dark:bg-surface-600"
              style={{ height: `${15 + ((i * 7) % 40)}%` }} />
          ))}
        </div>
        <p className="font-display text-sm font-medium text-slate-400 dark:text-surface-500">
          Your generated track will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-surface-500 dark:bg-surface-800 transition-colors duration-200">
      <audio
        ref={audioRef}
        src={blobUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setCurrentTime(0) }}
      />

      <WaveformDisplay isPlaying={isPlaying} />

      <div className="mt-4 space-y-3">
        {/* Scrubber */}
        <div className="flex items-center gap-3">
          <span className="w-9 font-mono text-xs text-slate-400 dark:text-slate-500">
            {formatTime(currentTime)}
          </span>
          <input
            type="range" min="0" max={duration || 0} step="0.1" value={currentTime}
            onChange={handleScrub}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent dark:bg-surface-500"
          />
          <span className="w-9 text-right font-mono text-xs text-slate-400 dark:text-slate-500">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet-400 shadow-glow-violet transition-all hover:shadow-glow-violet hover:opacity-90"
          >
            {isPlaying ? (
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Volume */}
          <div className="flex flex-1 items-center gap-2">
            <svg className="h-4 w-4 flex-shrink-0 text-slate-400 dark:text-surface-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={handleVolumeChange}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent dark:bg-surface-500"
            />
          </div>

          <DownloadButton blobUrl={blobUrl} />
        </div>
      </div>
    </div>
  )
}
