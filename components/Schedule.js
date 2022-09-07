import React from 'react'

function Schedule() {
  return (
    <div className='w-3/4 m-auto'>
      <div className='w-fullw-3/4 flex flex-col justify-center items-center mb-6'>
        <h1 className='text-center text-5xl font-medium font-mono tracking-wider mb-4'>
          Horario
        </h1>
        <ul className='grid grid-cols-4 gap-5'>
          <li className='flex items-center'>
            <div className='w-8 h-2 bg-red-400 mr-1'></div>
            <p>Lengua Española</p>
          </li>
          <li className='flex items-center'>
            <div className='w-8 h-2 bg-blue-400 mr-1'></div>
            <p>Matematicas</p>
          </li>
          <li className='flex items-center'>
            <div className='w-8 h-2 bg-yellow-400 mr-1'></div>
            <p>Ciencias Sociales</p>
          </li>
          <li className='flex items-center'>
            <div className='w-8 h-2 bg-green-400 mr-1'></div>
            <p>Ciencias Naturales</p>
          </li>
        </ul>
      </div>
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
  )
}

export default Schedule
