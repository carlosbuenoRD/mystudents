import { useEffect, useState } from 'react'
import { useStudentDispatch, useCTX } from '../../hooks/useContextHook'
import ReactDom from 'react-dom'
import getLiteral from '@utils/getLiteral'

// Icons
import { AiOutlineClose } from 'react-icons/ai'
import Confirmation from '@components/Confirmation'
import Link from 'next/link'

function ViewStudent({ show, onClose, student }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [edit, setEdit] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [classroom, setClassRoom] = useState('')

  const { calification } = useCTX()
  const { updateStudent, getOneGrade } = useStudentDispatch()

  useEffect(() => {
    setIsBrowser(true)
    if (student) {
      getOneGrade(student._id)
      setState()
    }
  }, [student])

  const setState = () => {
    setClassRoom(student.classroom)
    setName(student.name)
    setLastname(student.lastname)
  }

  const handleUpdateStudent = () => {
    updateStudent({
      _id: student._id,
      name,
      lastname,
      classroom,
    })
    setEdit(false)
  }

  const content = show ? (
    <div className={'modal_overlay overflow-hidden'}>
      <div className='modal_card'>
        <div className='modal_card__header'>
          <h2 className='font-medium font-mono text-xl lg:text-2xl tracking-wider'>
            Perfil de estudiante
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
                disabled={!edit}
                type={'text'}
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label>Apellido</label>
              <input
                disabled={!edit}
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
                className='border-2 border-slate-400 py-2 text-lg px-2 rounded-md outline-blue-500'
                value={classroom.name}
                onChange={(e) => setClassRoom(e.target.value)}
              />
            </div>
          </form>

          {calification && (
            <div className='text-center my-4'>
              <h2 className='text-2xl'>Calificaciones</h2>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-5 mt-4'>
                <div className='border-2 p-1 border-red-400'>
                  <h1 className='font-medium font-mono text-xl uppercase'>
                    {getLiteral(calification[0])}
                  </h1>
                  <p>Español</p>
                </div>
                <div className='border-2 p-1 border-yellow-400'>
                  <h1 className='font-medium font-mono text-xl uppercase'>
                    {getLiteral(calification[1])}
                  </h1>
                  <p>Sociales</p>
                </div>
                <div className='border-2 p-1 border-blue-400'>
                  <h1 className='font-medium font-mono text-xl uppercase'>
                    {getLiteral(calification[2])}
                  </h1>
                  <p>Matematicas</p>
                </div>
                <div className='border-2 p-1 border-green-400'>
                  <h1 className='font-medium font-mono text-xl uppercase'>
                    {getLiteral(calification[3])}
                  </h1>
                  <p>Naturales</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='modal_card__footer'>
          {edit ? (
            <>
              <button
                onClick={() => setConfirmation(true)}
                className='border-2 bg-blue-300/80 hover:bg-blue-300 -mb-2  transition-all w-1/2 h-14 font-medium tracking-widest rounded-md mr-2'
              >
                Actualizar
              </button>
              <button
                onClick={() => {
                  setEdit(false)
                  setState()
                }}
                className='border-2 bg-red-300/80 hover:bg-red-300 -mb-2  transition-all w-1/2 h-14rounded-md mr-2'
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className='w-full transition-all bg-blue-300 h-14 -mb-2 text-xl font-medium font-mono tracking-widest'
                style={{ paddingTop: '0px' }}
                onClick={() => setEdit(true)}
              >
                Editar
              </button>
              <Link href={`/calificaciones#${student.name}`} passHref>
                <a
                  className='w-2/5 ml-2 transition-all grid place-items-center bg-green-300 h-14 -mb-2 text-lg px-2 font-medium font-mono tracking-widest'
                  style={{ paddingTop: '0px' }}
                >
                  Calificar
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      <Confirmation
        show={confirmation}
        onClose={() => setConfirmation(false)}
        onConfirm={handleUpdateStudent}
        text='Estas seguro de actualizar los datos del estudiante?'
        success
      />
    </div>
  ) : null

  if (isBrowser) {
    return ReactDom.createPortal(content, document.getElementById('modal-root'))
  } else {
    return null
  }
}

export default ViewStudent
