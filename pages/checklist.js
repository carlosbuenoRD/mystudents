import React, { useEffect, useState } from 'react'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'

//Icons
import { AiOutlineClose } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'

//Components
import Confirmation from '@components/Confirmation'
import Layout from '@components/Layout/Layout'
import ViewCheckList from '@components/Modal/ViewCheckList'
import completedList from '@utils/completedList'
import formatDate from '@utils/formatDate'

function CheckList() {
  const [viewList, setViewList] = useState(false)
  const [subject, setSubject] = useState('Lengua Española')
  const [history, setHistory] = useState(true)
  const [confirmation, setConfirmation] = useState(false)
  const [classroom, setClassroom] = useState('')
  const [list, setList] = useState([])
  const [selectedList, setSelectedList] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const { students, allCheckList, classrooms } = useCTX()
  const { getAll, getAllList, createList, getAllClassroom } =
    useStudentDispatch()

  useEffect(() => {
    getAllClassroom()
  }, [])

  useEffect(() => {
    if (classroom) {
      getAll(classroom)
    }
  }, [classroom])

  useEffect(() => {
    setList([])
    if (classroom) {
      getAllList(subject, date, classroom)
    }
  }, [history, subject, date, classroom])

  useEffect(() => {
    if (classrooms) {
      setClassroom(classrooms[0]._id)
    }
  }, [classrooms])

  const handleListChange = (student, present) => {
    const exist = list.findIndex((i) => i.student === student._id)
    if (exist !== -1) {
      setList(
        list.map((i) =>
          i.student === student._id ? { student: i.student, present } : i
        )
      )
    } else {
      setList((prev) => [...prev, { student: student._id, present }])
    }
  }

  const handleViewList = (list) => {
    setViewList(true)
    setSelectedList(list)
  }

  const chooseColor = (student) => {
    let curr = list.find((i) => i.student === student._id)
    if (curr) {
      if (curr.present) {
        return 'bg-green-400/60'
      } else {
        return 'bg-red-400/80'
      }
    }
  }

  const handleCreateList = () => {
    createList({ list, subject, classroom })
    setHistory(!history)
  }

  return (
    <Layout title='Lista'>
      <div className='flex my-4'>
        <div className='w-1/4 mr-6 border shadow-sm rounded-md p-2 text-slate-700'>
          <p className='text-lg mt-2'>
            Proxima clase <i className='font-medium'>10:00am</i>
          </p>
          <h1 className='text-3xl mb-2 font-bold'>{subject}, 4A</h1>
        </div>
        <div className='self-end flex shadow-sm pb-2 items-center justify-between flex-1'>
          <div className='flex'>
            <div className='mr-4'>
              <label>Curso</label>
              <select
                onChange={(e) => setClassroom(e.target.value)}
                className='border p-1'
              >
                {classrooms?.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='border p-1 rounded-md'
            />
          </div>
          <button
            onClick={() => setHistory(!history)}
            className={`border p-2 transition-all rounded-md font-medium font-mono ${
              history
                ? 'border-green-500 hover:bg-green-400/80'
                : 'border-red-500 hover:bg-red-400/80'
            }`}
          >
            {history ? 'Pasar Lista' : 'Cancelar'}
          </button>
        </div>
      </div>
      <div className='flex h-[70vh]'>
        <div className='w-1/4 mr-6'>
          <div className='border-bp-4 sticky top-0'>
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
        </div>

        {history ? (
          <>
            {allCheckList?.length === 0 ? (
              <div className='bg-red-400 flex-1 rounded-md h-fit py-6 text-center text-xl font-medium font-mono'>
                No tienes pases de lista!
              </div>
            ) : (
              <div className='flex-1 h-full overflow-y-scroll'>
                {allCheckList?.map((list) => (
                  <div
                    key={list._id}
                    onClick={() => handleViewList(list)}
                    className='grid grid-cols-4 cursor-pointer border-b p-3 hover:bg-slate-100 '
                  >
                    <p>{formatDate(list.createdAt, 'date')}</p>
                    <p>{formatDate(list.createdAt, 'time')}</p>
                    <p>{list.subject}</p>
                    <div className='flex items-center justify-self-end pr-4'>
                      {completedList(list) ? 'Completado' : 'Incompleto'}
                      <div
                        className={`border-2 mr-4 ml-1 rounded-full p-1 ${
                          completedList(list)
                            ? 'border-green-400'
                            : 'border-red-400'
                        }`}
                      >
                        {completedList(list) ? (
                          <BiCheck size={25} />
                        ) : (
                          <AiOutlineClose size={25} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className='flex-1 h-full overflow-y-scroll'>
            {students?.map((student) => (
              <div
                key={student._id}
                className={`grid grid-cols-2 border-b p-3 ${chooseColor(
                  student
                )}`}
              >
                <p className='text-xl self-center'>
                  {student.name} {student.lastname}
                </p>
                <div className=' justify-self-end pr-4'>
                  <button
                    onClick={() => handleListChange(student, true)}
                    className='border-2 mr-4 border-green-400 text-green-500 rounded-full p-1'
                  >
                    <BiCheck size={25} />
                  </button>
                  <button
                    onClick={() => handleListChange(student, false)}
                    className='border-2 border-red-400 text-red-500 rounded-full p-1'
                  >
                    <AiOutlineClose size={25} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setConfirmation(true)}
              className='text-center w-full py-4 bg-green-400/80 hover:bg-green-400 text-lg font-medium font-mono'
            >
              Terminar
            </button>
          </div>
        )}
      </div>
      <ViewCheckList
        show={viewList}
        onClose={() => {
          setViewList(false)
          setSelectedList({})
        }}
        list={selectedList}
      />
      <Confirmation
        show={confirmation}
        onClose={() => setConfirmation(false)}
        onConfirm={handleCreateList}
        text='Estas seguro de terminar la lista?'
        success
      />
    </Layout>
  )
}

export default CheckList
