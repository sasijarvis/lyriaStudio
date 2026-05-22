const STORAGE_KEY = 'lyria_tracks'

export function getTracks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveTrack(track) {
  const updated = [track, ...getTracks()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function deleteTrack(id) {
  const updated = getTracks().filter((t) => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function clearTracks() {
  const existing = getTracks()
  localStorage.removeItem(STORAGE_KEY)
  return existing // return pre-clear list so caller can purge IndexedDB blobs
}
