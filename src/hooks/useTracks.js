import { useState, useEffect } from 'react'
import { getTracks, saveTrack, deleteTrack as deleteTrackStorage, clearTracks } from '../services/tracksStorage'
import { saveAudioBlob, deleteAudioBlob, getAllBlobIds } from '../services/db'

export function useTracks() {
  const [tracks, setTracks] = useState(() => getTracks())

  // On mount: clean up orphaned blobs in IndexedDB that have no metadata
  useEffect(() => {
    const cleanup = async () => {
      try {
        const blobIds = await getAllBlobIds()
        const metaIds = new Set(getTracks().map((t) => t.id))
        const orphans = blobIds.filter((id) => !metaIds.has(id))
        await Promise.all(orphans.map((id) => deleteAudioBlob(id)))
      } catch {
        // non-fatal
      }
    }
    cleanup()
  }, [])

  const addTrack = async (trackMeta, blob) => {
    saveTrack(trackMeta) // sync — localStorage first
    try {
      await saveAudioBlob(trackMeta.id, blob)
    } catch (err) {
      console.warn('Failed to save audio to IndexedDB:', err)
    }
    setTracks((prev) => [trackMeta, ...prev])
  }

  const removeTrack = async (id) => {
    deleteTrackStorage(id)
    try {
      await deleteAudioBlob(id)
    } catch {
      // non-fatal
    }
    setTracks((prev) => prev.filter((t) => t.id !== id))
  }

  const clearAllTracks = async () => {
    const cleared = clearTracks()
    try {
      await Promise.all(cleared.map((t) => deleteAudioBlob(t.id)))
    } catch {
      // non-fatal
    }
    setTracks([])
  }

  return { tracks, addTrack, removeTrack, clearAllTracks }
}
