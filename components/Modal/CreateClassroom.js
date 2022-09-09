import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { toast } from 'react-toastify'
import { useStudentDispatch } from '../../hooks/useContextHook'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function CreateClassroom({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [name, setName] = useState('')

  const { createClassroom } = useStudentDispatch()

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCreateClassroom = async () => {
    try {
      if (!name) {
        toast.error('Escribe el nombre del curso!')
        return
      }
      await createClassroom({ name })
      toast.success('Nuevo curso agregado!')
      onClose()
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'>
            Agregar Curso
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
              <label>Curso</label>
              <input
                type={'text'}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={handleCreateClassroom}
            className='border-2 bg-green-300/80 hover:bg-green-300 -mb-2  transition-all w-full h-14 font-medium tracking-widest rounded-md mr-2'
          >
            Agregar
          </button>
          <button
            onClick={onClose}
            className='border-2 bg-red-300/80 hover:bg-red-300 -mb-2  transition-all w-full h-14 rounded-md'
          >
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

export default CreateClassroom
