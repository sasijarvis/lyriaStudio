/**
 * Convert a base64 string to an object URL suitable for use in <audio src>.
 * Using Blob URLs instead of data URIs for better browser compatibility.
 * Remember to call URL.revokeObjectURL(url) when done.
 */
export function base64ToBlobUrl(base64, mimeType = 'audio/mp3') {
  const byteCharacters = atob(base64)
  const byteNumbers = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const blob = new Blob([byteNumbers], { type: mimeType })
  return URL.createObjectURL(blob)
}

/**
 * Trigger a browser download of an audio blob URL.
 */
export function downloadAudio(blobUrl, filename = 'lyria-track.mp3') {
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
