import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function Confirmation({ show, onClose, success, text, onConfirm }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'></h2>
          <button
            onClick={onClose}
            className='border-2 opacity-70 p-1 rounded-full text-slate-700 hover:shadow-md hover:opacity-100'
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className='modal_card__body p-6'>
          <h1 className='text-2xl text-slate-700'>{text}</h1>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={handleConfirm}
            className={`border-2 w-1/2 py-1 rounded-md mr-2 ${
              success ? 'border-green-500' : 'border-red-500'
            }`}
          >
            Completar
          </button>
          <button className='border-2 w-1/2 py-1 rounded-md mr-2'>
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

export default Confirmation
