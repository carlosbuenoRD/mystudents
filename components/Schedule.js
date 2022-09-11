import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs'
import { TbArrowAutofitContent } from 'react-icons/tb'

function Schedule() {
  const [flip, setFlip] = useState(false)

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
        <h1 className='text-center mt-4 text-4xl lg:text-5xl xl:text-6xl xl:mb-4 font-medium font-mono tracking-wider mb-4'>
          Horario
        </h1>
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
      <div className={`w-3/4 m-auto z-50 ${flip ? '' : 'hidden md:block'}`}>
        <table className='w-full shadow-lg'>
          <thead className='border'>
            <tr>
              <th className='border-r h-20 bg-slate-50/90'>Lunes</th>
              <th className='border-r h-20 bg-slate-50/90'>Martes</th>
              <th className='border-r h-20 bg-slate-50/90'>Miercoles</th>
              <th className='border-r h-20 bg-slate-50/90'>Jueves</th>
              <th className='border-r h-20 bg-slate-50/90'>Viernes</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border'>
              <td className='h-20 border-r text-center bg-red-400'>Español</td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center bg-yellow-400'>
                Sociales
              </td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center bg-green-400'>
                Naturales
              </td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center bg-red-400'>Español</td>
              <td className='h-20 border-r text-center bg-green-400'>
                Naturales
              </td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center bg-blue-400'>
                Matematicas
              </td>
              <td className='h-20 border-r text-center'></td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center bg-green-400'>
                Naturales
              </td>
              <td className='h-20 border-r text-center bg-blue-400'>
                Matematicas
              </td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center bg-green-400'>
                Naturales
              </td>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center bg-blue-400'>
                Matematicas
              </td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center bg-yellow-400'>
                Sociales
              </td>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center bg-red-400'>Español</td>
              <td className='h-20 border-r text-center'></td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center bg-yellow-400'>
                Sociales
              </td>
            </tr>
            <tr className='border'>
              <td className='h-20 border-r text-center '></td>
              <td className='h-20 border-r text-center bg-yellow-400'>
                Sociales
              </td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
              <td className='h-20 border-r text-center'></td>
            </tr>
          </tbody>
        </table>
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

export default Schedule
