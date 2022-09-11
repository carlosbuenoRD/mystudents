import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs'
import { TbArrowAutofitContent } from 'react-icons/tb'

function ScheduleContainer({ children }) {
  const [flip, setFlip] = useState(false)
  const [edit, setEdit] = useState(false)

  window.screen.orientation?.addEventListener('change', (e) => {
    if (e.target.ScreenOrientation === 90) {
      setFlip(true)
    } else {
      setFlip(false)
    }
  })

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center mb-6'>
        <div className='flex relative justify-between lg:justify-evenly items-center w-full px-2 lg:w-3/4'>
          <button
            onClick={() => setEdit(false)}
            className={`border border-red-300 hover:bg-red-300 transition-all rounded-sm px-2 md:px-8 h-8 md:h-10 lg:h-12 ${
              !edit && 'invisible'
            }`}
          >
            Cancelar
          </button>

          <h1 className='text-center mt-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl xl:mb-4 font-medium font-mono tracking-wider mb-4'>
            Horario
          </h1>
          <button
            onClick={() => setEdit(true)}
            className={`border transition-all rounded-sm px-2 md:px-8 h-8 md:h-10 lg:h-12 ${
              edit
                ? 'border-green-300 hover:bg-green-300'
                : 'border-blue-300 hover:bg-blue-300'
            }`}
          >
            {edit ? 'Guardar' : 'Editar'}
          </button>
        </div>
        <ul className='grid grid-cols-4 gap:3 sm:gap-5'>
          <li className='flex text-xs sm:text-base flex-col md:flex-row items-center'>
            <div className='w-8 h-2 bg-red-400 mr-1'></div>
            <p>Lengua Española</p>
          </li>
          <li className='flex text-xs sm:text-base flex-col md:flex-row items-center'>
            <div className='w-8 h-2 bg-blue-400 mr-1'></div>
            <p>Matematicas</p>
          </li>
          <li className='flex text-xs sm:text-base flex-col md:flex-row items-center'>
            <div className='w-8 h-2 bg-yellow-400 mr-1'></div>
            <p>Ciencias Sociales</p>
          </li>
          <li className='flex text-xs sm:text-base flex-col md:flex-row items-center'>
            <div className='w-8 h-2 bg-green-400 mr-1'></div>
            <p>Ciencias Naturales</p>
          </li>
        </ul>
      </div>
      <div
        className={`w-3/4 m-auto z-50 ${
          flip ? '' : 'hidden md:block shadow-lg'
        } ${edit ? '' : 'pointer-events-none'}`}
      >
        <div className='grid grid-cols-5'>
          <p className='h-14 w-full grid place-items-center border bg-white'>
            Lunes
          </p>
          <p className='h-14 w-full grid place-items-center border bg-white'>
            Martes
          </p>
          <p className='h-14 w-full grid place-items-center border bg-white'>
            Miercoles
          </p>
          <p className='h-14 w-full grid place-items-center border bg-white'>
            Jueves
          </p>
          <p className='h-14 w-full grid place-items-center border bg-white'>
            Viernes
          </p>
        </div>
        {children}
      </div>

      <div className='md:hidden  border shadow-md p-8 flex flex-col justify-center items-center text-xl'>
        <BsPhone className='flip' size={40} />
        <TbArrowAutofitContent size={30} />
        {!window.screen.orientation
          ? 'No esta disponible.'
          : 'Gira la pantalla'}
      </div>
    </>
  )
}

export default ScheduleContainer
