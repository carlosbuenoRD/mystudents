import React from 'react'

function SubjectButton({ setSubject, subject, row }) {
  return (
    <div
      className={`${
        row ? 'flex p-2 lg:p-4 ' : ''
      }border-b sticky top-0 text-lg md:text-xl lg:text-2xl z-40`}
    >
      <button
        onClick={() => setSubject('Lengua Española')}
        className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm hover:bg-red-400 ${
          subject === 'Lengua Española'
            ? 'scale-105 font-bold bg-red-400'
            : 'text-sm md:text-base lg:text-lg bg-red-400/70'
        }`}
      >
        Lengua Española
      </button>
      <button
        onClick={() => setSubject('Ciencias Sociales')}
        className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm hover:bg-yellow-400 ${
          subject === 'Ciencias Sociales'
            ? 'scale-105 font-bold bg-yellow-400'
            : 'text-sm md:text-base lg:text-lg bg-yellow-400/70 '
        }`}
      >
        Ciencias Sociales
      </button>
      <button
        onClick={() => setSubject('Ciencias Naturales')}
        className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm hover:bg-green-400 ${
          subject === 'Ciencias Naturales'
            ? 'scale-105 font-bold bg-green-400'
            : 'text-sm md:text-base lg:text-lg bg-green-400/70'
        }`}
      >
        Ciencias Naturales
      </button>
      <button
        onClick={() => setSubject('Matematicas')}
        className={`w-full transition-all h-20 mb-3 rounded-md shadow-sm hover:bg-blue-400 ${
          subject === 'Matematicas'
            ? 'scale-105 font-bold bg-blue-400'
            : 'text-sm md:text-base lg:text-lg bg-blue-400/70'
        }`}
      >
        Matematicas
      </button>
    </div>
  )
}

export default SubjectButton
