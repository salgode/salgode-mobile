export const timestampToDate = timestamp => {
  const today = new Date()
  const date = new Date(timestamp)
  if (today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
    return 'Hoy'
  } else {
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    if (tomorrow.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
      return 'Mañana'
    }
    return date.toDateString()
  }
}

export const timestampToTime = timestamp => {
  const now = new Date()
  const time = new Date(timestamp)
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const elapsed = time - now

  if (elapsed < 0) {
    return 'Viaje ya comenzó'
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute)
    return `En ${minutes} minuto${minutes === 1 && 's'}`
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour)
    return `En ${hours} horas${hours === 1 && 's'}`
  }
}

export default timestampToDate
