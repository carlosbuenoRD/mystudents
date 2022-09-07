import Layout from '@components/Layout/Layout'
import { students } from '@utils/data'
import React, { useState } from 'react'

function Calificaciones() {
  const [subject, setSubject] = useState('Español')

  return (
    <Layout title={'Calificaciones'}>
      <div className='border-b flex p-4 sticky top-0'>
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

      {/* Filters */}
      <div className='flex-1 mb-8 mt-4'>
        <div className='flex'>
          <div className='mr-4'>
            <label className='block' htmlFor='semester'>
              Semestre
            </label>
            <select className='p-2 border' id='semester'>
              <option>Primer semestre</option>
              <option>Segun Semestre</option>
            </select>
          </div>
          <div>
            <label className='block' htmlFor='semester'>
              Curso
            </label>
            <select className='p-2 border' id='semester'>
              <option>4a</option>
              <option>4b</option>
              <option>2b</option>
              <option>2a</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students grades */}
      <ul>
        {students.map((student) => (
          <li className='py-4 grid grid-cols-2 border-b'>
            <p className='text-2xl font-bold self-center'>
              {student.name} {student.lastname}
            </p>
            <div className='flex '>
              <div className='w-16 flex flex-col items-center ml-2'>
                <label>1ra</label>
                <input type='text' className='border py-4 w-full text-center' />
              </div>
              <div className='w-16 flex flex-col items-center ml-2'>
                <label>2da</label>
                <input type='text' className='border py-4 w-full text-center' />
              </div>
              <div className='w-16 flex flex-col items-center ml-2'>
                <label>3ra</label>
                <input type='text' className='border py-4 w-full text-center' />
              </div>
              <div className='w-16 flex flex-col items-center ml-2'>
                <label>4ta</label>
                <input type='text' className='border py-4 w-full text-center' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Calificaciones
