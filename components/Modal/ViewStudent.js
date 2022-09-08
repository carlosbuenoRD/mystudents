import { useEffect, useState } from 'react'
import { useStudentDispatch } from '../../hooks/useContextHook'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function ViewStudent({ show, onClose, student }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [classroom, setClassRoom] = useState('')

  const { updateStudent } = useStudentDispatch()

  useEffect(() => {
    setIsBrowser(true)
    if (student) {
      setState()
    }
  }, [student])

  const setState = () => {
    setClassRoom(student.classroom)
    setName(student.name)
    setLastname(student.lastname)
  }

  const handleUpdateStudent = () => {
    updateStudent({ _id: student._id, name, lastname, classroom })
    onClose()
  }

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'>
            Estudiante
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label>Apellido</label>
              <input
                type={'text'}
                className='border-2 border-blue-400 py-1 px-2 rounded-md outline-blue-500'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label>Curso</label>
              <input
                type={'text'}
                className='border-2 border-blue-400 py-1 px-2 rounded-md outline-blue-500'
                value={classroom}
                onChange={(e) => setClassRoom(e.target.value)}
              />
            </div>
          </form>

          <div></div>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={handleUpdateStudent}
            className='border-2 border-green-500 w-1/2 py-1 rounded-md mr-2'
          >
            Actualizar
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

export default ViewStudent