import { useState } from 'react'
import { useStudentDispatch } from '../../hooks/useContextHook'

// Components
import Confirmation from '@components/Confirmation'
import ViewStudent from '@components/Modal/ViewStudent'

// Icons
import { TbTrash } from 'react-icons/tb'

function StudentsTable({ students }) {
  const [show, setShow] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [selectedEstudent, setSelectedStudent] = useState(null)

  const { deleteStudent } = useStudentDispatch()

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShow(true)
  }

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student)
    setConfirmation(true)
  }

  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
      {students.length > 0 ? (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Nombre
              </th>
              <th scope='col' className='py-3 px-6'>
                Apellido
              </th>
              <th scope='col' className='py-3 px-6'>
                Curso
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <th
                  onClick={() => handleViewStudent(student)}
                  scope='row'
                  className='py-4 px-6 font-medium underline cursor-pointer text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {student.name}
                </th>
                <td className='py-4 px-6'>{student.lastname}</td>
                <td className='py-4 px-6'>{student.classroom?.name}</td>
                <td className='py-4 px-6 text-center'>
                  <button
                    onClick={() => handleDeleteStudent(student)}
                    className='font-medium z-50 text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    <TbTrash className='ml-1 hover:text-red-500' size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='bg-red-400 py-6 text-center text-xl font-medium font-mono'>
          No tienes estudiantes agregue uno!
        </div>
      )}
      <ViewStudent
        show={show}
        onClose={() => setShow(false)}
        student={selectedEstudent}
      />
      <Confirmation
        show={confirmation}
        onClose={() => setConfirmation(false)}
        onConfirm={() => deleteStudent(selectedEstudent._id)}
        success={false}
        text='Estas seguro de eliminar al estudiantes?'
      />
    </div>
  )
}

export default StudentsTable
