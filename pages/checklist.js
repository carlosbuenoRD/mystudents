import Layout from '@components/Layout/Layout'
import { students, classrooms } from '@utils/data'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'

function CheckList() {
  const [subject, setSubject] = useState(null)
  console.log(Array.from(classrooms))
  return (
    <Layout title='Lista'>
      <div className='flex my-4'>
        <div className='w-1/4 mr-6 border shadow-sm rounded-md p-2 text-slate-700'>
          <p className='text-lg mt-2'>
            Proxima clase <i className='font-medium'>10:00am</i>
          </p>
          <h1 className='text-3xl mb-2 font-bold'>Lengua Española, 4A</h1>
        </div>
        <div className='self-end flex shadow-sm pb-2 items-center justify-between flex-1'>
          <div className='flex'>
            <div className='mr-4'>
              <label>Curso</label>
              <select className='border p-1'>
                {Array.from(classrooms).map((i) => (
                  <option>{i}</option>
                ))}
              </select>
            </div>
            <input type='date' className='border p-1 rounded-md' />
          </div>
          <button className='border border-green-500 p-2 transition-all rounded-md font-medium font-mono hover:bg-green-400/80'>
            Pasar Lista
          </button>
        </div>
      </div>
      <div className='flex h-[70vh]'>
        <div className='w-1/4 mr-6'>
          <div className='border-bp-4 sticky top-0'>
            <button
              onClick={() => setSubject('Español')}
              className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-70 font-bold hover:bg-red-400 ${
                subject === 'Español'
                  ? 'scale-105 text-2xl bg-red-400'
                  : 'text-lg bg-red-400/70'
              }`}
            >
              Lengua Española
            </button>
            <button
              onClick={() => setSubject('Sociales')}
              className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-700 font-bold hover:bg-yellow-400 ${
                subject === 'Sociales'
                  ? 'scale-105 text-2xl bg-yellow-400'
                  : 'text-lg bg-yellow-400/70 '
              }`}
            >
              Ciencias Sociales
            </button>
            <button
              onClick={() => setSubject('Naturales')}
              className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm text-slate-700 font-bold hover:bg-green-400 ${
                subject === 'Naturales'
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
        {/* List */}
        <div className='flex-1 h-full overflow-y-scroll'>
          {students.map((student) => (
            <div className='grid grid-cols-2  border-b p-3 hover:bg-slate-100 '>
              <p className='text-xl self-center'>
                {student.name} {student.lastname}
              </p>
              <div className=' justify-self-end pr-4'>
                <button className='border-2 mr-4 border-green-400 text-green-500 rounded-full p-1'>
                  <BiCheck size={25} />
                </button>
                <button className='border-2 border-red-400 text-red-500 rounded-full p-1'>
                  <AiOutlineClose size={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* List */}
        {/* <div className='flex-1 h-full overflow-y-scroll'>
          {students.map((student) => (
            <div className='grid grid-cols-4 cursor-pointer border-b p-3 hover:bg-slate-100 '>
              <p>25/10/2022</p>
              <p>11:12am</p>
              <p>{student.classroom}</p>
              <div className='flex items-center justify-self-end pr-4'>
                completado
                <button className='border-2 mr-4 ml-1 border-green-400 text-green-500 rounded-full p-1'>
                  <BiCheck size={25} />
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  )
}

export default CheckList
