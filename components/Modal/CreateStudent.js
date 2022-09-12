import { useEffect, useState } from 'react'
import { useStudentDispatch } from '../../hooks/useContextHook'
import { toast } from 'react-toastify'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function CreateStudent({ show, onClose, classroom }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')

  const { createStudent } = useStudentDispatch()

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCreateStudent = async () => {
    try {
      if (!name || !lastname) {
        toast.error('Completa todos los campos!')
        return
      }
      await createStudent({ name, lastname, classroom: classroom._id })
      toast.success('Estudiate agregado!')
      onClose()
      setName('')
      setLastname('')
    } catch (error) {
      toast.error('Hubo un problema!')
    }
  }

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
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label>Apellido</label>
              <input
                type={'text'}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label>Curso</label>
              <input
                disabled={true}
                type={'text'}
                value={classroom.name}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md'
              />
            </div>
          </form>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={onClose}
            className='border-2 bg-red-300/80 hover:bg-red-300 -mb-2  transition-all w-full h-14 rounded-md mr-2'
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateStudent}
            className='border-2 bg-green-300/80 hover:bg-green-300 -mb-2  transition-all w-full h-14 font-medium tracking-widest rounded-md'
          >
            Agregar
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
