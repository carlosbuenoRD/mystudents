import { useEffect, useState } from 'react'
import { useStudentDispatch } from '../../hooks/useContextHook'
import ReactDom from 'react-dom'

// Icons
import { AiOutlineClose } from 'react-icons/ai'
import completedList from '@utils/completedList'

function ViewCheckList({ show, onClose, list }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const content = show ? (
    <div className={'modal_overlay'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-lg tracking-wider'>
            Lista
          </h2>
          <button
            onClick={onClose}
            className='border-2 opacity-70 p-1 rounded-full text-slate-700 hover:shadow-md hover:opacity-100'
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className='modal_card__body'>
          {list?.list.map((i) => (
            <div
              key={i._id}
              className={`p-2 mb-1 rounded-md ${
                i.present ? 'bg-green-300/80' : 'bg-red-300/80'
              }`}
            >
              {i.student.name}
            </div>
          ))}
        </div>
        <div className='modal_card__footer'>
          <p
            className={`text-center w-full py-2 font-bold text-slate-600 font-mono ${
              completedList(list) ? ' bg-green-400' : ' bg-red-400/90'
            }`}
          >
            {completedList(list) ? 'Completado' : 'Incompleto'}
          </p>
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

export default ViewCheckList
