import { useRef, useState, useEffect } from 'react'
import { getAudioBlob } from '../../services/db'
import { downloadAudio } from '../../utils/audioUtils'
import { formatTime } from '../../utils/formatters'

export default function TrackPlayerInline({ trackId, mimeType }) {
  const audioRef = useRef(null)
  const [blobUrl, setBlobUrl] = useState(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
  }, [blobUrl])

  // Autoplay once blobUrl is set
  useEffect(() => {
    if (blobUrl && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [blobUrl])

  const loadAndPlay = async () => {
    if (blobUrl) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      return
    }
    setIsLoadingAudio(true)
    setLoadError(null)
    try {
      const blob = await getAudioBlob(trackId)
      if (!blob) throw new Error('Audio not found in storage')
      setBlobUrl(URL.createObjectURL(blob))
    } catch {
      setLoadError('Audio unavailable')
    } finally {
      setIsLoadingAudio(false)
    }
  }

  const handleDownload = async () => {
    if (blobUrl) {
      downloadAudio(blobUrl, `lyria-${trackId}.mp3`)
      return
    }
    try {
      const blob = await getAudioBlob(trackId)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      downloadAudio(url, `lyria-${trackId}.mp3`)
      URL.revokeObjectURL(url)
    } catch {}
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 dark:border-surface-600 dark:bg-surface-700">
      {/* Play / Pause / Spinner */}
      <button
        onClick={loadAndPlay}
        disabled={isLoadingAudio}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet-400 shadow-glow-violet transition-all hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
      >
        {isLoadingAudio ? (
          <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : isPlaying ? (
          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Scrubber + time */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {loadError ? (
          <p className="font-display text-xs text-beat-red">{loadError}</p>
        ) : (
          <>
            <input
              type="range" min="0" max={duration || 0} step="0.1" value={currentTime}
              onChange={(e) => {
                const t = parseFloat(e.target.value)
                if (audioRef.current) audioRef.current.currentTime = t
                setCurrentTime(t)
              }}
              disabled={!blobUrl}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent disabled:cursor-default dark:bg-surface-500"
            />
            <div className="flex justify-between">
              <span className="font-mono text-xs text-slate-400 dark:text-surface-500">
                {formatTime(currentTime)}
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-surface-500">
                {duration ? formatTime(duration) : '--:--'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Download */}
      <button
        onClick={handleDownload}
        title="Download track"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:border-beat-green hover:text-beat-green dark:border-surface-500 dark:bg-surface-600 dark:text-slate-400 dark:hover:border-beat-green dark:hover:text-beat-green"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>

      {blobUrl && (
        <audio
          ref={audioRef}
          src={blobUrl}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0) }}
        />
      )}
    </div>
  )
}
