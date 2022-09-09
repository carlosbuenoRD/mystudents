import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { calificationSubjects } from '@utils/data'
import { toast } from 'react-toastify'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'
import getLiteral from '@utils/getLiteral'
import SearchInput from '@components/SearchInput'
import { GrUpdate } from 'react-icons/gr'
import Loading from '@components/Loading'

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
    if (classrooms) {
      setClassroom(classrooms[0]._id)
    }
  }, [classrooms])

  useEffect(() => {
    if (classroom) {
      getGrades()
    }
  }, [subject, classroom])

  const handleChange = (e) => {
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

  return (
    <Layout title={'Calificaciones'}>
      <div className='border-b flex p-4 sticky top-0 z-50'>
        <button
          onClick={() => setSubject('Lengua Española')}
          className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-70 font-bold hover:bg-red-400 ${
            subject === 'Lengua Española'
              ? 'scale-105 text-2xl bg-red-400'
              : 'text-lg bg-red-400/70'
          }`}
        >
          Lengua Española
        </button>
        <button
          onClick={() => setSubject('Ciencias Sociales')}
          className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-700 font-bold hover:bg-yellow-400 ${
            subject === 'Ciencias Sociales'
              ? 'scale-105 text-2xl bg-yellow-400'
              : 'text-lg bg-yellow-400/70 '
          }`}
        >
          Ciencias Sociales
        </button>
        <button
          onClick={() => setSubject('Ciencias Naturales')}
          className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-700 font-bold hover:bg-green-400 ${
            subject === 'Ciencias Naturales'
              ? 'scale-105 text-2xl bg-green-400'
              : 'text-lg bg-green-400/70'
          }`}
        >
          Ciencias Naturales
        </button>
        <button
          onClick={() => setSubject('Matematicas')}
          className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-700 font-bold hover:bg-blue-400 ${
            subject === 'Matematicas'
              ? 'scale-105 text-2xl bg-blue-400'
              : 'text-lg bg-blue-400/70'
          }`}
        >
          Matematicas
        </button>
      </div>

      {/* Filters */}
      <div className='flex-1 mb-8 mt-4'>
        <div className='flex items-end'>
          <SearchInput input={search} setInput={setSearch} />

          <div className='ml-6'>
            <label className='block' htmlFor='semester'>
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
        <>
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
                  className={`py-4 flex justify-between items-center border-b hover:opacity-100 px-4 ${
                    calification._id === grade._id
                      ? 'opacity-100 border border-blue-400 rounded-md'
                      : 'opacity-50'
                  }`}
                >
                  <p className='text-2xl font-bold self-center w-4/12'>
                    {grade.student?.name} {grade.student?.lastname}
                  </p>
                  <div className='flex flex-1'>
                    {calificationSubjects.map((i) => (
                      <div
                        key={i.title}
                        className='flex flex-col items-center ml-4'
                      >
                        <label>{i.title.toUpperCase()}</label>
                        <input
                          type='number'
                          name={i.title}
                          onChange={handleChange}
                          className='border py-4 text-center w-16'
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
                    <div className='flex flex-col text-center items-end ml-4'>
                      <label className='uppercase'>Final</label>
                      <p className='border py-4 text-center h-16 w-16'>
                        {getLiteral(grade)}
                      </p>
                    </div>
                    <div className='flex flex-col text-center items-end ml-4'>
                      <label className='uppercase'>Update</label>
                      <button
                        disabled={grade._id !== calification._id}
                        onClick={handleCalification}
                        className='border grid place-items-center bg-blue-500 rounded-lg text-center h-16 w-16'
                      >
                        <GrUpdate size={25} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </Layout>
  )
}

export default Calificaciones
