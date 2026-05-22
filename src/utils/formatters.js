export function formatCost(cost) {
  return `$${cost.toFixed(2)}`
}

export function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function formatTimestamp(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatFullTimestamp(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
    ' · ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function truncate(str, maxLen = 45) {
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str
}
