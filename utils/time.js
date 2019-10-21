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
    return date.toLocaleDateString()
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

export const showDate = dateTimestamp => {
  // Requires every timestamp to be in milliseconds
  const date = new Date(dateTimestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months start at 0
  const day = date.getDate()
  return day.toString() + '/' + month.toString() + '/' + year.toString()
}

export const showTime = timeTimestamp => {
  // Requires every timestamp to be in milliseconds
  // Gets milliseconds since the day started
  const hours = Math.floor(timeTimestamp / (60 * 60 * 1000))
  timeTimestamp -= hoursToMilliseconds(hours)
  const minutes = Math.floor(timeTimestamp / (60 * 1000))
  timeTimestamp -= minutesToMilliseconds(minutes)
  return hours.toString() + ':' + minutes.toString()
}

export const showOnlyTime = timestamp => {
  // Requires every timestamp to be in milliseconds
  const date = new Date(timestamp)
  date.setHours(0, 0, 0, 0)
  timestamp -= date.getTime()
  const hours = Math.floor(timestamp / (60 * 60 * 1000))
  timestamp -= hoursToMilliseconds(hours)
  const minutes = Math.floor(timestamp / (60 * 1000))
  timestamp -= minutesToMilliseconds(minutes)
  return hours.toString() + ':' + minutes.toString()
}

export const getDateTimestamp = date => {
  // Requires every timestamp to be in milliseconds
  // Offset into the day
  const millisecondsOffset = date.getMilliseconds()
  const secondsOffset = secondsToMilliseconds(date.getSeconds())
  const minutesOffset = minutesToMilliseconds(date.getMinutes())
  const hoursOffset = hoursToMilliseconds(date.getHours())
  const offset =
    millisecondsOffset + secondsOffset + minutesOffset + hoursOffset

  // Return start of the day timestamp
  return date.getTime() - offset
}

export const getTimeTimestamp = time => {
  // Requires every timestamp to be in milliseconds
  // Milliseconds since the start of the day
  const milliseconds = time.getMilliseconds()
  const seconds = secondsToMilliseconds(time.getSeconds())
  const minutes = minutesToMilliseconds(time.getMinutes())
  const hours = hoursToMilliseconds(time.getHours())
  return milliseconds + seconds + minutes + hours
}

export const secondsToMilliseconds = seconds => {
  return seconds * 1000
}

export const minutesToMilliseconds = minutes => {
  return minutes * 60 * 1000
}

export const hoursToMilliseconds = hours => {
  return hours * 60 * 60 * 1000
}

export default timestampToDate
