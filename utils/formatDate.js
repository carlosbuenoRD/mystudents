const DAYS = [
  'domingo',
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
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
    let month = d.getMonth() + 1
    let day = d.getDate()
    let year = d.getFullYear()

    return `${month}/${day}/${year}`
  }

  if (format === 'day') {
    console.log(d.getDay())
    return DAYS[d.getDay()]
  }
}
