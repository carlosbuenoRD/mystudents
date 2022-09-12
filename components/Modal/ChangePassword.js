import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { toast } from 'react-toastify'
import { useStudentDispatch } from '../../hooks/useContextHook'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function ChangePassword({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')

  const { updatePassword } = useStudentDispatch()

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleUpdatePassword = async () => {
    try {
      if (!oldPassword || !newPassword) {
        toast.error('Te falto una contraseña!')
        return
      }
      await updatePassword({ oldPassword, newPassword, answer })
      clearState()
      toast.success('Contraseña actualizada!')
      onClose()
    } catch (error) {
      toast.error(error.response.data || 'Hubo un problema!')
    }
  }

  const clearState = () => {
    setAnswer('')
    setNewPassword('')
    setOldPassword('')
    setQuestion('')
  }

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'>
            Cambiar contraseña
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
              <label>Vieja contraseña *</label>
              <input
                type={'password'}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label>Nueva contraseña *</label>
              <input
                type={'password'}
                className='border-2 border-slate-400 mb-4 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label>Pregunta de seguridad</label>
              <select
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
              >
                <option value=''>Selecciona</option>
                <option value='Como se llama el primer nieto de tu abuela'>
                  Como se llama el primer nieto de tu abuela
                </option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label>Respuesta</label>
              <input
                type={'text'}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={onClose}
            className='border-2 bg-red-300/80 hover:bg-red-300 -mb-2  transition-all w-full h-14 rounded-md'
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdatePassword}
            className='border-2 bg-blue-300/80 hover:bg-blue-300 -mb-2  transition-all w-full h-14 font-medium tracking-widest rounded-md mr-2'
          >
            Actualizar
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

export default ChangePassword
