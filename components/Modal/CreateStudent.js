import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function CreateStudent({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'>
            Agregar Estudiante
          </h2>
          <button
            onClick={onClose}
            className='border-2 opacity-70 p-1 rounded-full text-slate-700 hover:shadow-md hover:opacity-100'
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className='modal_card__body'>
          <form>
            <div className='flex flex-col'>
              <label>Nombre</label>
              <input
                type={'text'}
                className='border-2 border-blue-400 py-1 px-2 rounded-md outline-blue-500'
              />
            </div>
            <div className='flex flex-col my-2'>
              <label>Apellido</label>
              <input
                type={'text'}
                className='border-2 border-blue-400 py-1 px-2 rounded-md outline-blue-500'
              />
            </div>
            <div className='flex flex-col'>
              <label>Curso</label>
              <input
                type={'text'}
                className='border-2 border-blue-400 py-1 px-2 rounded-md outline-blue-500'
              />
            </div>
          </form>
        </div>
        <div className='modal_card__footer'>
          <button className='border-2 border-green-500 w-1/2 py-1 rounded-md mr-2'>
            Agregar
          </button>
          <button className='border-2 border-red-500 w-1/2 py-1 rounded-md mr-2'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDom.createPortal(content, document.getElementById('modal-root'))
  } else {
    return null
  }
}

export default CreateStudent
