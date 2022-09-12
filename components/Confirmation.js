import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'

function Confirmation({ show, onClose, success, text, onConfirm }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleConfirm = async () => {
    onConfirm()
    onClose()
  }

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__body p-6'>
          <h1 className='text-2xl text-slate-700'>{text}</h1>
        </div>
        <div className='modal_card__footer'>
          <button
            onClick={onClose}
            className='border-2 w-1/2 py-1 h-14 rounded-md mr-2'
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className={`border-2 w-1/2 py-1 h-14 rounded-md mr-2 ${
              success
                ? 'bg-green-300/80 hover:bg-green-300'
                : 'bg-red-300/80 hover:bg-red-300'
            }`}
          >
            Completar
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
