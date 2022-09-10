import { useState } from 'react'
import { useStudentDispatch } from '../../hooks/useContextHook'
import { toast } from 'react-toastify'

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

  const handleDeleteConfirmation = (student) => {
    setSelectedStudent(student)
    setConfirmation(true)
  }

  const handleDeleteStudent = async (student) => {
    try {
      await deleteStudent(selectedEstudent._id)
      toast.success('Estudiante eliminado!')
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
      {students.length > 0 ? (
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
              <tr key={student._id} className='bg-white border-b'>
                <th
                  onClick={() => handleViewStudent(student)}
                  scope='row'
                  className='px-4 py-4 md:px-6 font-medium underline cursor-pointer text-gray-900 whitespace-nowrap'
                >
                  {student.name}
                </th>
                <td className='py-4 px-6'>{student.lastname}</td>
                <td className='py-4 px-6'>{student.classroom?.name}</td>
                <td className='py-4 px-6 text-center'>
                  <button
                    onClick={() => handleDeleteConfirmation(student)}
                    className='font-medium z-50 text-blue-600 hover:underline'
                  >
                    <TbTrash className='ml-1 hover:text-red-500' size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='bg-red-400 py-4 lg:py-6 text-center text-xl font-medium font-mono'>
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
        onConfirm={handleDeleteStudent}
        success={false}
        text='Estas seguro de eliminar al estudiantes?'
      />
    </div>
  )
}

export default StudentsTable
