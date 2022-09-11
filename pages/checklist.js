import React, { useEffect, useState } from 'react'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'
import { toast } from 'react-toastify'

//Icons
import { AiOutlineClose } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'

//Components
import Confirmation from '@components/Confirmation'
import Layout from '@components/Layout/Layout'
import ViewCheckList from '@components/Modal/ViewCheckList'
import completedList from '@utils/completedList'
import formatDate from '@utils/formatDate'
import SubjectButton from '@components/subjectButton'

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
    if (classrooms?.length > 0) {
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

  const handleCreateList = async () => {
    try {
      if (list.length !== students.length) {
        toast.error('Faltan estudiantes!')
        return
      }
      await createList({ list, subject, classroom })
      toast.success('Lista realizada!')
      setHistory(!history)
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

  console.log(allCheckList)

  return (
    <Layout title='Lista'>
      <div className='flex flex-col lg:flex-row my-4'>
        <div className='hidden lg:block w-2/6 mr-6 border shadow-sm rounded-md p-2 text-slate-700'>
          <p className='text-lg mt-2'>
            Proxima clase <i className='font-medium'>10:00am</i>
          </p>
          <h1 className='text-2xl mb-2 font-bold'>{subject}, 4A</h1>
        </div>
        <div className='lg:hidden'>
          <SubjectButton subject={subject} setSubject={setSubject} row />
        </div>
        <div className='px-2 md:px-0 lg:self-end flex shadow-sm pb-2 items-center justify-between flex-1'>
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
              className='border p-1 rounded-md mr-2'
            />
          </div>
          <button
            onClick={() => setHistory(!history)}
            className={`border p-2 transition-all rounded-md text-xs md:text-base font-medium font-mono ${
              history
                ? 'border-green-500 hover:bg-green-400/80'
                : 'border-red-500 hover:bg-red-400/80'
            }`}
          >
            {history ? 'Pasar Lista' : 'Cancelar'}
          </button>
        </div>
      </div>
      <div className='px-2 md:px-0 flex flex-col lg:flex-row lg:h-[65vh]'>
        <div className='hidden lg:block w-2/6 mr-6'>
          <SubjectButton subject={subject} setSubject={setSubject} />
        </div>

        {history ? (
          <>
            {allCheckList?.length === 0 || !allCheckList ? (
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
                    <p className='text-end md:text-start'>
                      {formatDate(list.createdAt, 'time')}
                    </p>
                    <p className='hidden md:block'>{list.subject}</p>
                    <p className='md:hidden'></p>
                    <div className='flex items-center justify-self-end pr-4'>
                      <p className='hidden md:block'>
                        {completedList(list) ? 'Completado' : 'Incompleto'}
                      </p>
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
          <>
            {students?.length === 0 ? (
              <div className='bg-red-400 flex-1 rounded-md h-fit py-6 text-center text-xl font-medium font-mono'>
                No tienes estudiantes agregue uno!
              </div>
            ) : (
              <div className='flex-1 h-full overflow-y-scroll'>
                {students?.map((student) => (
                  <div
                    key={student._id}
                    className={`grid grid-cols-2 border-b p-3 ${chooseColor(
                      student
                    )}`}
                  >
                    <p className='md:text-lg lg:text-xl self-center'>
                      {student.name} {student.lastname}
                    </p>
                    <div className=' justify-self-end pr-4 text-2xl'>
                      <button
                        onClick={() => handleListChange(student, true)}
                        className='border-2 mr-4 border-green-400 text-green-500 rounded-full p-1'
                      >
                        <BiCheck />
                      </button>
                      <button
                        onClick={() => handleListChange(student, false)}
                        className='border-2 border-red-400 text-red-500 rounded-full p-1'
                      >
                        <AiOutlineClose />
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
          </>
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
