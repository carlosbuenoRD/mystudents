import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs'
import { TbArrowAutofitContent } from 'react-icons/tb'
// import { schedule } from '@utils/data'

function ScheduleContainer({ children }) {
  const [flip, setFlip] = useState(false)
  const [edit, setEdit] = useState(false)

  function fnBrowserDetect() {
    let userAgent = navigator.userAgent
    let browserName

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = 'chrome'
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = 'firefox'
    } else if (userAgent.match(/safari/i)) {
      browserName = 'safari'
    } else if (userAgent.match(/opr\//i)) {
      browserName = 'opera'
    } else if (userAgent.match(/edg/i)) {
      browserName = 'edge'
    } else {
      browserName = 'No browser detection'
    }
    return browserName
  }

  fnBrowserDetect()

  if (fnBrowserDetect() !== 'safari') {
    window.screen.orientation.addEventListener('change', (e) => {
      if (e.target.ScreenOrientation === 90) {
        setFlip(true)
      } else {
        setFlip(false)
      }
    })
  }

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center mb-6'>
        <div className='flex relative justify-evenly items-center w-3/4'>
          <button
            onClick={() => setEdit(false)}
            className={`border border-red-300 hover:bg-red-300 transition-all rounded-sm px-8 h-12 ${
              !edit && 'invisible'
            }`}
          >
            Cancelar
          </button>

          <h1 className='text-center mt-4 text-4xl lg:text-5xl xl:text-6xl xl:mb-4 font-medium font-mono tracking-wider mb-4'>
            Horario
          </h1>
          <button
            onClick={() => setEdit(true)}
            className={`border transition-all rounded-sm px-8 h-12 ${
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
        className={`w-3/4 m-auto z-50 ${flip ? '' : 'hidden md:block'} ${
          edit ? '' : 'pointer-events-none'
        }`}
      >
        {children}
      </div>

      <div className='md:hidden  border shadow-md p-8 flex flex-col justify-center items-center text-xl'>
        <BsPhone className='flip' size={40} />
        <TbArrowAutofitContent size={30} />
        {fnBrowserDetect() === 'safari'
          ? 'No esta disponible en safari.'
          : 'Gira la pantalla'}
      </div>
    </>
  )
}

export default ScheduleContainer

{
  /* <table className='w-full shadow-lg'>
          <thead className='border'>
            <tr>
              <th className='border-r h-20 bg-slate-50/90'>Lunes</th>
              <th className='border-r h-20 bg-slate-50/90'>Martes</th>
              <th className='border-r h-20 bg-slate-50/90'>Miercoles</th>
              <th className='border-r h-20 bg-slate-50/90'>Jueves</th>
              <th className='border-r h-20 bg-slate-50/90'>Viernes</th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <tbody>
              {schedule.map((day, index) => (
                <Droppable key={index} droppableId={`${day.length + index}`}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      className='border'
                      {...provided.droppableProps}
                    >
                      {day.map((c, i) => (
                        <Draggable
                          key={i}
                          index={i}
                          draggableId={`${index * i}`}
                        >
                          {(p) => (
                            <td
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              className={`h-20 border-r text-center ${
                                c && 'bg-red-400'
                              }`}
                            >
                              {c}
                            </td>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tr>
                  )}
                </Droppable>
              ))}
            </tbody>
          </DragDropContext>
        </table> */
}
