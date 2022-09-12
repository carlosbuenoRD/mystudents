import { useState, useEffect } from 'react'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'
import { toast } from 'react-toastify'

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
  const [loadingClassrooms, setLoadingClassrooms] = useState(false)
  const [selectedClassroom, setSelectedClassroom] = useState('')
  const [search, setSearch] = useState('')
  const { students, classrooms } = useCTX()
  const { getAllClassroom, getAll, clearStudents, deleteClassroom } =
    useStudentDispatch()

  useEffect(() => {
    getClassrooms()
  }, [])

  const getClassrooms = async () => {
    try {
      setLoadingClassrooms(true)
      await getAllClassroom()
      setLoadingClassrooms(false)
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

  const getStudents = async (classroom) => {
    setLoadingStudents(true)
    await getAll(classroom._id)
    setSelectedClassroom(classroom)
    setLoadingStudents(false)
  }

  const handleClearStudents = () => {
    clearStudents()
    setSelectedClassroom(false)
    getClassrooms()
  }

  const handleDeleteClassroom = async () => {
    console.log(selectedClassroom)
    try {
      await deleteClassroom(selectedClassroom._id)
      handleClearStudents()
      toast.success('Se ha borrado el curso!')
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

  return (
    <Layout title={'Students'}>
      {loadingStudents ? (
        <Loading />
      ) : (
        <>
          {!selectedClassroom ? (
            <>
              <div className='my-4 flex justify-between items-center mb-3 md:mb-6 border-b pb-2 px-2 md:px-0'>
                <div>
                  <h1 className='text-4xl lg:text-5xl xl:text-6xl'>Cursos</h1>
                </div>
                <button
                  onClick={() => setCreateClass(true)}
                  className='border-2 opacity-70 flex text-slate-700 p-2 hover:opacity-100 hover:shadow-sm'
                >
                  Añadir curso
                  <CgFolderAdd size={25} className='ml-2' />
                </button>
              </div>
              {loadingClassrooms ? (
                <Loading />
              ) : (
                <>
                  {classrooms?.length > 0 ? (
                    <div className='grid md:grid-cols-3 gap-4 md:gap-10 px-2'>
                      {classrooms?.map((i) => (
                        <div
                          key={i._id}
                          onClick={() => getStudents(i)}
                          className='bg-orange-200 relative cursor-pointer shadow-md w-full text-center transition-all grid place-items-center h-56 rounded-lg p-6 hover:scale-105'
                        >
                          <h1 className='text-4xl tracking-wider uppercase'>
                            {i.name}
                          </h1>
                          <div>
                            <h2 className='text-4xl mb-2'>
                              {i.students.length}
                            </h2>
                            <p className='text-xl'>Estudiantes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='bg-red-400 flex-1 rounded-md h-fit py-6 text-center text-xl font-medium font-mono'>
                      No tienes cursos agregue uno!
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className='px-2 md:p-0'>
              <div className='my-4 flex justify-between items-center border-b pb-2 mb-4'>
                <div className='flex items-center mr-2'>
                  <div
                    className='flex items-center text-2xl lg:text-4xl mr-3 md:mr-6 lg:mr-8 cursor-pointer'
                    onClick={handleClearStudents}
                  >
                    <BiLeftArrowAlt className='-mb-1 mr-1 uppercase' />
                    <h1>{selectedClassroom.name}</h1>
                  </div>
                  <SearchInput input={search} setInput={setSearch} />
                </div>
                <div className='flex'>
                  <button
                    onClick={() => setCreateStudent(true)}
                    className='flex items-center border-2 rounded-full md:rounded-none mr-2 md:mr-4 opacity-70 p-1 lg:p-2 hover:opacity-100 hover:shadow-md'
                  >
                    <p className='hidden md:block'>Agregar Estudiante</p>
                    <TiUserAdd size={25} className='ml-1' />
                  </button>
                  <button
                    onClick={() => setConfirmation(true)}
                    className='flex items-center border-2 rounded-full md:rounded-none opacity-70  p-1 lg:p-2 hover:opacity-100 hover:shadow-sm'
                  >
                    <p className='hidden md:block'>Eliminar curso</p>
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
            </div>
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
        text={'Estas seguro de eliminar el curso?'}
        onConfirm={handleDeleteClassroom}
      />
    </Layout>
  )
}

export default Students
