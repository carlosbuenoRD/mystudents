import { useState } from 'react'
import { students } from '@utils/data'

// Components
import Confirmation from '@components/Confirmation'
import ViewStudent from '@components/Modal/ViewStudent'

// Icons
import { BsTrash } from 'react-icons/bs'

function StudentsTable() {
  const [show, setShow] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [selectedEstudent, setSelectedStudent] = useState(null)

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShow(true)
  }

  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
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
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <th
                onClick={() => handleViewStudent(student)}
                scope='row'
                className='py-4 px-6 font-medium underline cursor-pointer text-gray-900 whitespace-nowrap dark:text-white'
              >
                {student.name}
              </th>
              <td className='py-4 px-6'>{student.lastname}</td>
              <td className='py-4 px-6'>{student.classroom}</td>
              <td className='py-4 px-6 text-center'>
                <button
                  onClick={() => setConfirmation(true)}
                  className='font-medium z-50 text-blue-600 dark:text-blue-500 hover:underline'
                >
                  <BsTrash className='ml-1 hover:text-red-500' size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ViewStudent
        show={show}
        onClose={() => setShow(false)}
        student={selectedEstudent}
      />
      <Confirmation
        show={confirmation}
        onClose={() => setConfirmation(false)}
        success={false}
        text='Estas seguro de eliminar al estudiantes?'
      />
    </div>
  )
}

export default StudentsTable
