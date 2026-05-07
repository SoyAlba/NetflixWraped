import Papa from 'papaparse'

// Fix common mojibake from Latin-1/UTF-8 mismatch in Netflix exports
function fixEncoding(str) {
  if (!str) return str
  return str
    .replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é').replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó').replace(/Ãº/g, 'ú').replace(/Ã±/g, 'ñ')
    .replace(/Ã/g, 'Á').replace(/Ã‰/g, 'É').replace(/Ã/g, 'Í')
    .replace(/Ã"/g, 'Ó').replace(/Ãš/g, 'Ú').replace(/Ã'/g, 'Ñ')
    .replace(/Ã¼/g, 'ü').replace(/Ã¤/g, 'ä').replace(/Ã¶/g, 'ö')
    .replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"')
    .replace(/Â¿/g, '¿').replace(/Â¡/g, '¡').replace(/Â°/g, '°')
    .replace(/Â/g, '').replace(/â/g, '–')
    // Second pass for remaining patterns
    .replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é')
}

// Extract show name, season and episode from a Netflix title string
function parseTitle(raw) {
  const title = fixEncoding(raw)

  // Pattern: "Show [: Subtitle]: Temporada N: Episode"
  const temporadaIdx = title.search(/:\s*Temporada\s+\d+\s*:/)
  if (temporadaIdx !== -1) {
    const show = title.substring(0, temporadaIdx).trim()
    const rest = title.substring(temporadaIdx + 1).trim()
    const m = rest.match(/^Temporada\s+(\d+):\s*(.+)$/)
    return {
      show,
      season: m ? parseInt(m[1]) : null,
      episode: m ? m[2].trim() : null,
      type: 'series',
    }
  }

  // Pattern: "Show: Miniserie: Episode"
  const miniIdx = title.search(/:\s*Miniserie\s*:/)
  if (miniIdx !== -1) {
    const show = title.substring(0, miniIdx).trim()
    const rest = title.substring(miniIdx + 1).trim()
    const m = rest.match(/^Miniserie:\s*(.+)$/)
    return {
      show,
      season: 'Miniserie',
      episode: m ? m[1].trim() : null,
      type: 'miniseries',
    }
  }

  // Pattern: "Show: Episode" (no season info — reality shows, etc.)
  const colonIdx = title.indexOf(':')
  if (colonIdx !== -1) {
    return {
      show: title.substring(0, colonIdx).trim(),
      season: null,
      episode: title.substring(colonIdx + 1).trim(),
      type: 'series',
    }
  }

  // No colon = movie or standalone
  return { show: title, season: null, episode: null, type: 'movie' }
}

// Parse "M/D/YY" Netflix date format → Date object
function parseDate(dateStr) {
  if (!dateStr) return null
  const [m, d, y] = dateStr.split('/')
  const year = parseInt(y) < 100 ? 2000 + parseInt(y) : parseInt(y)
  return new Date(year, parseInt(m) - 1, parseInt(d))
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export function parseCSV(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  })
  return result.data
}

export function computeStats(rawRows) {
  // Normalise rows
  const entries = rawRows
    .map(row => {
      const titleRaw = row['Title'] || row['Título'] || Object.values(row)[0] || ''
      const dateRaw = row['Date'] || row['Fecha'] || Object.values(row)[1] || ''
      const date = parseDate(dateRaw)
      if (!date || isNaN(date.getTime())) return null
      const parsed = parseTitle(titleRaw)
      return { ...parsed, date, dateKey: dateKey(date), rawTitle: titleRaw }
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date)

  if (entries.length === 0) return null

  // --- Basic counts ---
  const totalEpisodes = entries.length
  const uniqueShows = [...new Set(entries.map(e => e.show))].length

  // --- Show frequency ---
  const showCounts = {}
  const showFirstSeen = {}
  const showLastSeen = {}
  entries.forEach(e => {
    showCounts[e.show] = (showCounts[e.show] || 0) + 1
    if (!showFirstSeen[e.show] || e.date < showFirstSeen[e.show]) showFirstSeen[e.show] = e.date
    if (!showLastSeen[e.show] || e.date > showLastSeen[e.show]) showLastSeen[e.show] = e.date
  })
  const topShows = Object.entries(showCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([show, count]) => ({ show, count }))

  // --- Daily counts ---
  const dailyCounts = {}
  entries.forEach(e => {
    dailyCounts[e.dateKey] = (dailyCounts[e.dateKey] || 0) + 1
  })

  const sortedDays = Object.entries(dailyCounts).sort((a, b) => b[1] - a[1])
  const biggestBingeDate = sortedDays[0]?.[0]
  const biggestBingeCount = sortedDays[0]?.[1] || 0
  const biggestBingeShows = [...new Set(
    entries.filter(e => e.dateKey === biggestBingeDate).map(e => e.show)
  )]

  // --- Streak ---
  const watchedDates = [...new Set(entries.map(e => e.dateKey))].sort()
  let maxStreak = 1, currentStreak = 1, streakStart = watchedDates[0], bestStart = watchedDates[0]
  for (let i = 1; i < watchedDates.length; i++) {
    const prev = new Date(watchedDates[i - 1])
    const curr = new Date(watchedDates[i])
    const diff = (curr - prev) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      currentStreak++
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak
        bestStart = streakStart
      }
    } else {
      currentStreak = 1
      streakStart = watchedDates[i]
    }
  }

  // --- Monthly breakdown ---
  const monthlyCounts = {}
  entries.forEach(e => {
    const key = monthKey(e.date)
    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1
  })
  const monthlyData = Object.entries(monthlyCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, count]) => {
      const [y, m] = key.split('-')
      return { month: MONTH_NAMES[parseInt(m) - 1], year: parseInt(y), count, key }
    })

  // --- Day of week ---
  const dayOfWeekCounts = Array(7).fill(0)
  entries.forEach(e => { dayOfWeekCounts[e.date.getDay()]++ })
  const dayOfWeekData = DAY_NAMES.map((name, i) => ({ day: name, count: dayOfWeekCounts[i] }))
  const favoriteDayIdx = dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts))
  const favoriteDay = DAY_NAMES[favoriteDayIdx]

  // --- Fastest binge (show fully watched in fewest calendar days) ---
  const showDaySpan = {}
  Object.entries(showFirstSeen).forEach(([show, first]) => {
    const last = showLastSeen[show]
    const days = Math.max(1, Math.round((last - first) / (1000 * 60 * 60 * 24)) + 1)
    if (showCounts[show] >= 4) {
      showDaySpan[show] = { days, episodes: showCounts[show] }
    }
  })
  const fastestBinge = Object.entries(showDaySpan)
    .sort((a, b) => a[1].episodes / a[1].days - b[1].episodes / b[1].days)
    .slice(-1)[0]

  // --- Date range ---
  const firstDate = entries[0].date
  const lastDate = entries[entries.length - 1].date
  const totalDays = Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1
  const activeDays = watchedDates.length

  // --- Current obsession (last 14 days most watched) ---
  const recentCutoff = new Date(lastDate)
  recentCutoff.setDate(recentCutoff.getDate() - 14)
  const recentCounts = {}
  entries
    .filter(e => e.date >= recentCutoff)
    .forEach(e => { recentCounts[e.show] = (recentCounts[e.show] || 0) + 1 })
  const currentObsession = Object.entries(recentCounts).sort((a, b) => b[1] - a[1])[0]

  // --- Heatmap data (daily counts for calendar) ---
  const heatmapData = Object.entries(dailyCounts).map(([date, count]) => ({ date, count }))

  // Format binge date nicely
  const bingeDateObj = biggestBingeDate ? new Date(biggestBingeDate + 'T12:00:00') : null
  const biggestBingeDateFormatted = bingeDateObj
    ? `${bingeDateObj.getDate()} de ${MONTH_NAMES[bingeDateObj.getMonth()]} de ${bingeDateObj.getFullYear()}`
    : ''

  return {
    totalEpisodes,
    uniqueShows,
    topShows,
    biggestBingeDate,
    biggestBingeDateFormatted,
    biggestBingeCount,
    biggestBingeShows,
    maxStreak,
    bestStreakStart: bestStart,
    monthlyData,
    dayOfWeekData,
    favoriteDay,
    fastestBinge: fastestBinge
      ? { show: fastestBinge[0], days: fastestBinge[1].days, episodes: fastestBinge[1].episodes }
      : null,
    firstDate,
    lastDate,
    totalDays,
    activeDays,
    currentObsession: currentObsession ? { show: currentObsession[0], count: currentObsession[1] } : null,
    heatmapData,
    entries,
  }
}
