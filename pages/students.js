import { useState, useEffect } from 'react'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'

// Components
import Layout from '@components/Layout/Layout'
import CreateStudent from '@components/Modal/CreateStudent'
import SearchInput from '@components/SearchInput'
import StudentsTable from '@components/Tables/StudentsTable'

// Icons
import { TiUserAdd } from 'react-icons/ti'
import Confirmation from '@components/Confirmation'
import CreateClassroom from '@components/Modal/CreateClassroom'
import { TbTrash } from 'react-icons/tb'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { CgFolderAdd } from 'react-icons/cg'
import Loading from '@components/Loading'

function Students() {
  const [createStudent, setCreateStudent] = useState(false)
  const [createClass, setCreateClass] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [selectedClassroom, setSelectedClassroom] = useState('')
  const [search, setSearch] = useState('')
  const { students, classrooms } = useCTX()
  const { getAllClassroom, getAll, clearStudents, deleteClassroom } =
    useStudentDispatch()

  useEffect(() => {
    getAllClassroom()
  }, [])

  const getStudents = async (classroom) => {
    setLoadingStudents(true)
    await getAll(classroom._id)
    setSelectedClassroom(classroom)
    setLoadingStudents(false)
  }

  const handleClearStudents = () => {
    clearStudents()
    setSelectedClassroom(false)
    getAllClassroom()
  }

  const handleDeleteClassroom = (classroom) => {
    setConfirmation(true)
    setSelectedClassroom(classroom)
  }

  return (
    <Layout title={'Students'}>
      {loadingStudents ? (
        <Loading />
      ) : (
        <>
          {!selectedClassroom ? (
            <>
              <div className='my-4 flex justify-between items-center mb-6 border-b pb-2'>
                <div>
                  <h1 className='text-6xl'>Cursos</h1>
                </div>
                <button
                  onClick={() => setCreateClass(true)}
                  className='border-2 opacity-70 flex text-slate-700 p-2 hover:opacity-100 hover:shadow-sm'
                >
                  Añadir curso
                  <CgFolderAdd size={25} className='ml-2' />
                </button>
              </div>
              <div className='grid grid-cols-3 gap-10'>
                {classrooms?.map((i) => (
                  <div
                    onClick={() => getStudents(i)}
                    className='bg-orange-200 relative cursor-pointer shadow-md w-full text-center transition-all grid place-items-center h-56 rounded-lg p-6 hover:scale-105'
                  >
                    <h1 className='text-4xl tracking-wider uppercase'>
                      {i.name}
                    </h1>
                    <div>
                      <h2 className='text-4xl mb-2'>{i.students.length}</h2>
                      <p className='text-xl'>Estudiantes</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className='my-4 flex justify-between items-center border-b pb-2 mb-4'>
                <div className='flex items-center'>
                  <div
                    className='flex items-center text-4xl mr-8 cursor-pointer'
                    onClick={handleClearStudents}
                  >
                    <BiLeftArrowAlt className='-mb-1 mr-1' />
                    <h1>Curso {selectedClassroom.name}</h1>
                  </div>
                  <SearchInput input={search} setInput={setSearch} />
                </div>
                <div className='flex'>
                  <button
                    onClick={() => setCreateStudent(true)}
                    className='flex items-center border-2 mr-4 opacity-70 p-2 hover:opacity-100 hover:shadow-md'
                  >
                    Agregar Estudiante
                    <TiUserAdd size={25} className='ml-1' />
                  </button>
                  <button
                    onClick={handleDeleteClassroom}
                    className='flex items-center border-2 opacity-70  p-2 hover:opacity-100 hover:shadow-sm'
                  >
                    Eliminar curso
                    <TbTrash size={25} className='ml-1' />
                  </button>
                </div>
              </div>
              <StudentsTable
                students={students?.filter(
                  (i) =>
                    i.name.toLowerCase().includes(search.toLowerCase()) ||
                    i.lastname.toLowerCase().includes(search.toLowerCase())
                )}
              />
            </>
          )}
        </>
      )}

      <CreateStudent
        show={createStudent}
        onClose={() => setCreateStudent(false)}
        classroom={selectedClassroom}
      />
      <CreateClassroom
        show={createClass}
        onClose={() => setCreateClass(false)}
      />
      <Confirmation
        show={confirmation}
        onClose={() => setConfirmation(false)}
        text={'Estas seguro de eliminar el curso'}
        onConfirm={() => deleteClassroom(selectedClassroom._id)}
      />
    </Layout>
  )
}

export default Students
