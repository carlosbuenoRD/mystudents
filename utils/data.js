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
