import { downloadAudio } from '../../utils/audioUtils'

export default function DownloadButton({ blobUrl, disabled }) {
  if (!blobUrl) return null

  return (
    <button
      onClick={() => downloadAudio(blobUrl)}
      disabled={disabled}
      title="Download audio"
      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-display text-xs text-slate-600 shadow-sm transition-all hover:border-beat-green hover:text-beat-green disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-500 dark:bg-surface-700 dark:text-slate-300 dark:hover:border-beat-green dark:hover:text-beat-green"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download
    </button>
  )
}
