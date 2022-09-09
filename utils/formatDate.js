const DAYS = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
]

export default function formatDate(date, format) {
  let d = new Date(date)

  if (format === 'time') {
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  if (format === 'date') {
    let month = d.getMonth()
    let day = d.getDay()
    let year = d.getFullYear()

    return `${day}/${month}/${year}`
  }

  if (format === 'day') {
    return DAYS[d.getDay()]
  }
}
