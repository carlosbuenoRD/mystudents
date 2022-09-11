import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { calificationSubjects } from '@utils/data'
import { toast } from 'react-toastify'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'
import getLiteral from '@utils/getLiteral'
import SearchInput from '@components/SearchInput'
import { GrUpdate } from 'react-icons/gr'
import Loading from '@components/Loading'
import SubjectButton from '@components/SubjectButton'

function Calificaciones() {
  const [subject, setSubject] = useState('Lengua Española')
  const [classroom, setClassroom] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [calification, setCalification] = useState({
    _id: '',
    notebook: 0,
    practice: 0,
    participation: 0,
    test: 0,
    conduct: 0,
    homework: 0,
  })
  const { califications, classrooms } = useCTX()
  const { getAllGrades, updateGrades, getAllClassroom } = useStudentDispatch()

  useEffect(() => {
    getAllClassroom()
  }, [])

  useEffect(() => {
    if (classrooms?.length > 0) {
      setClassroom(classrooms[0]._id)
    }
  }, [classrooms])

  useEffect(() => {
    if (classroom) {
      getGrades()
    }
  }, [subject, classroom])

  const handleChange = (e, max) => {
    if (e.target.value > max) {
      onInvalidInput()
      return
    }
    setCalification((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const getGrades = async () => {
    setLoading(true)
    await getAllGrades(subject, classroom)
    setLoading(false)
  }

  const handleCalification = async () => {
    try {
      await updateGrades(calification)
      toast.success('Calificacion actualizada!')
      clearCalification()
    } catch (error) {
      toast.error('Hubo un error!')
    }
  }

  const fillCalification = (grade) => {
    if (grade._id === calification._id) return
    setCalification({ ...grade })
  }

  const clearCalification = () => {
    setCalification({
      _id: '',
      notebook: 0,
      practice: 0,
      participation: 0,
      test: 0,
      conduct: 0,
      homework: 0,
    })
  }

  const onInvalidInput = () => {
    toast.error('Pasas el limite de puntos!')
  }

  return (
    <Layout title={'Calificaciones'}>
      <SubjectButton subject={subject} setSubject={setSubject} row />

      {/* Filters */}
      <div className='px-2 md:px-0 flex-1 mb-8 border-b pb-2'>
        <div className='flex items-end'>
          <SearchInput input={search} setInput={setSearch} />

          <div className='ml-6 flex items-center'>
            <label className='block md:mr-2' htmlFor='semester'>
              Curso
            </label>
            <select
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className='p-2 border'
              id='semester'
            >
              {classrooms?.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className='px-2 md:px-0'>
          {/* Students grades */}
          <ul>
            {califications
              ?.filter((i) => i.student?.classroom === classroom)
              .filter(
                (i) =>
                  i.student?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  i.student?.lastname
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((grade) => (
                <li
                  key={grade._id}
                  id={grade.student.name}
                  onClick={() => fillCalification(grade)}
                  className={`py-4 flex flex-col lg:flex-row justify-between items-center border-b hover:opacity-100 px-4 ${
                    calification._id === grade._id
                      ? 'opacity-100 border border-blue-400 rounded-md'
                      : 'opacity-50'
                  }`}
                >
                  <p className='mb-4 lg:mb-0 text-lg lg:text-xl xl:text-2xl font-bold self-center lg:w-1/4'>
                    {grade.student?.name} {grade.student?.lastname}
                  </p>
                  <div className='grid grid-cols-3 md:flex flex-1 justify-center'>
                    {calificationSubjects.map((i) => (
                      <div
                        key={i.title}
                        className='flex flex-col items-center mb-4 ml-4 text-xs xl:text-sm'
                      >
                        <label>{i.title.toUpperCase()}</label>
                        <input
                          type='number'
                          max={i.max}
                          min={0}
                          name={i.title}
                          onChange={(e) => handleChange(e, i.max)}
                          onInvalid={onInvalidInput}
                          className='border md:text-lg py-2 xl:py-4 invalid:border-red-700 invalid:outline-red-600 text-center w-8 md:w-12  xl:w-16'
                          value={
                            calification._id === grade._id
                              ? calification[i.title]
                              : grade[i.title]
                              ? grade[i.title]
                              : 0
                          }
                          disabled={grade._id !== calification._id}
                        />
                        <p className='text-xs'>MAX {i.max}</p>
                      </div>
                    ))}
                  </div>
                  <div className='flex'>
                    <div className='flex flex-col-reverse items-center lg:flex-col text-center lg:items-end ml-4'>
                      <label className='uppercase'>Final</label>
                      <p className='border py-1 md:py-2 lg:py-3 xl:py-4 text-center h-10 lg:h-12 xl:h-16 w-10 lg:w-12 xl:w-16'>
                        {getLiteral(grade)}
                      </p>
                    </div>
                    <div className='flex flex-col-reverse items-center lg:flex-col text-center md:items-end ml-4'>
                      <label className='uppercase'>Update</label>
                      <button
                        disabled={grade._id !== calification._id}
                        onClick={handleCalification}
                        className='border grid place-items-center bg-blue-500 rounded-lg text-center h-10 lg:h-12 xl:h-16 w-10 lg:w-12 xl:w-16'
                      >
                        <GrUpdate size={25} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
      {classrooms?.length === 0 && (
        <div className='bg-red-400 flex-1 rounded-md h-fit py-6 text-center text-xl font-medium font-mono'>
          No tienes cursos agregue uno!
        </div>
      )}

      {califications?.length === 0 ||
        (!califications && (
          <div className='bg-red-400 flex-1 rounded-md h-fit py-6 text-center text-xl font-medium font-mono'>
            No tienes cursos agregue uno!
          </div>
        ))}
    </Layout>
  )
}

export default Calificaciones
