import { calificationSubjects } from './data'

export default function getLiteral(grade) {
  let n = 0

  calificationSubjects.forEach((i) => {
    if (typeof grade[i.title] === 'number') {
      n += grade[i.title]
    }
  })

  if (n <= 100 && n >= 90) {
    return 'A'
  }
  if (n <= 89 && n >= 80) {
    return 'B'
  }
  if (n <= 79 && n >= 70) {
    return 'C'
  }

  return 'F'
}
