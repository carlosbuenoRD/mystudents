export const students = [
  {
    name: 'Carlos',
    lastname: 'Bueno',
    classroom: '4a',
  },
  {
    name: 'Victor',
    lastname: 'Anglero',
    classroom: '4a',
  },
  {
    name: 'Francisco',
    lastname: 'Felix',
    classroom: '4b',
  },
  {
    name: 'Pablo',
    lastname: 'Diaz',
    classroom: '4b',
  },
  {
    name: 'Ines',
    lastname: 'Tavares',
    classroom: '4b',
  },
  {
    name: 'Amelia Valenzuela',
    lastname: 'Felix',
    classroom: '4b',
  },
  {
    name: 'Giselle',
    lastname: 'Bueno',
    classroom: '4b',
  },
  {
    name: 'Nicolas',
    lastname: 'Agramonte',
    classroom: '4b',
  },
  {
    name: 'Abel',
    lastname: 'George',
    classroom: '4b',
  },
]

export const classrooms = new Set(students.map((i) => i.classroom))

export const subjects = [
  { title: 'Lengua Española', color: 'bg-red-300' },
  { title: 'Matematicas', color: 'bg-blue-300' },
  { title: 'Ciencias Sociales', color: 'bg-yellow-300' },
  { title: 'Ciencias Naturales', color: 'bg-green-300' },
]

export const calificationSubjects = [
  { title: 'notebook', max: 10 },
  { title: 'homework', max: 20 },
  { title: 'practice', max: 20 },
  { title: 'participation', max: 10 },
  { title: 'test', max: 30 },
  { title: 'conduct', max: 10 },
]
