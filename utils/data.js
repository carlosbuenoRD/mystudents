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

export const initialData = [
  {
    day: 'monday',
    tasks: [
      { id: 'm-8:00', subject: 'Español' },
      { id: 'm-8:45', subject: 'Español' },
      { id: 'm-9:30', subject: '' },
      { id: 'm-10:45:', subject: 'Sociales' },
      { id: 'm-11:30', subject: '' },
      { id: 'm-12:15', subject: 'Naturales' },
      { id: 'm-1:00', subject: 'Naturales' },
    ],
  },
  {
    day: 'tuesday',
    tasks: [
      { id: 't-8:00', subject: 'Naturales' },
      { id: 't-8:45', subject: '' },
      { id: 't-9:30', subject: 'Matematicas' },
      { id: 't-10:45:', subject: '' },
      { id: 't-11:30', subject: '' },
      { id: 't-12:15', subject: '' },
      { id: 't-1:00', subject: 'Matematicas' },
    ],
  },
  {
    day: 'wednesday',
    tasks: [
      { id: 'w-8:00', subject: 'Español' },
      { id: 'w-8:45', subject: 'Sociales' },
      { id: 'w-9:30', subject: 'Naturales' },
      { id: 'w-10:45:', subject: '' },
      { id: 'w-11:30', subject: '' },
      { id: 'w-12:15', subject: '' },
      { id: 'w-1:00', subject: '' },
    ],
  },
  {
    day: 'thursday',
    tasks: [
      { id: 't-h8:00', subject: '' },
      { id: 't-h8:45', subject: 'Sociales' },
      { id: 't-h9:30', subject: 'Español' },
      { id: 't-h10:45:', subject: 'Español' },
      { id: 't-h11:30', subject: '' },
      { id: 't-h12:15', subject: '' },
      { id: 't-h1:00', subject: 'Matematicas' },
    ],
  },
  {
    day: 'friday',
    tasks: [
      { id: 'f-8:00', subject: '' },
      { id: 'f-8:45', subject: '' },
      { id: 'f-9:30', subject: 'Matematicas' },
      { id: 'f-10:45:', subject: 'Naturales' },
      { id: 'f-11:30', subject: 'Naturales' },
      { id: 'f-12:15', subject: '' },
      { id: 'f-1:00', subject: 'Naturales' },
    ],
  },
]

export const times = [
  '8:00',
  '8:45',
  '9:30',
  '10:15',
  '11:00',
  '11:45',
  '12:30',
]
