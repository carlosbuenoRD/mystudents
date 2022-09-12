import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStudentDispatch } from 'hooks/useContextHook'

//Icons
import { BsDoorClosed } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrNotes } from 'react-icons/gr'
import { CgClose } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import Confirmation from '@components/Confirmation'
import ChangePassword from '@components/Modal/ChangePassword'

function Navbar() {
  const router = useRouter()
  const [mobileMenu, setMobileMenu] = useState(false)
  const [show, setShow] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const { logout } = useStudentDispatch()

  let { pathname } = router

  return (
    <header className='h-20 md:h-28 shadow-md'>
      <nav className='px-2 relative sm:px-0 container m-auto flex items-center justify-between h-full xl:px-12'>
        <Link href={'/home'} passHref>
          <a className='font-bold font-mono text-2xl z-50'>My Students</a>
        </Link>

        <ul
          className={`fixed md:relative transition-all flex flex-col md:flex-row text-2xl pt-14 ${
            mobileMenu ? 'w-full' : 'w-0'
          } top-0 bottom-0 right-0 bg-orange-100 md:bg-white md:pt-0 md:text-lg md:w-fit md:flex-row`}
          style={{ zIndex: 100 }}
        >
          {mobileMenu && (
            <CgClose
              onClick={() => setMobileMenu(false)}
              className='md:hidden cursor-pointer absolute top-5 right-4'
            />
          )}
          <li className='mx-8 md:mx-0'>
            <Link href={'/checklist'} passHref>
              <a
                className={`cursor-pointer flex items-center hover:bg-orange-300 transition-all p-2 rounded-lg ${
                  pathname === '/checklist' && 'bg-orange-300'
                }`}
              >
                <BsListCheck className='mr-2 -mb-1' size={20} />
                Lista
              </a>
            </Link>
          </li>
          <li className='mx-8'>
            <Link href={'/students'} passHref>
              <a
                className={`cursor-pointer flex items-center hover:bg-orange-300 transition-all p-2 rounded-lg ${
                  pathname === '/students' && 'bg-orange-300'
                }`}
              >
                <FaUserGraduate className='mr-2' />
                Estudiantes
              </a>
            </Link>
          </li>
          <li className='mx-8 md:mx-0'>
            <Link href={'/calificaciones'} passHref>
              <a
                className={`cursor-pointer flex items-center hover:bg-orange-300 transition-all p-2 rounded-lg ${
                  pathname === '/calificaciones' && 'bg-orange-300'
                }`}
              >
                <GrNotes className='mr-2' />
                Calificaciones
              </a>
            </Link>
          </li>
          <li className=' flex-1 flex flex-col justify-end justify-self-end mx-8 md:hidden mb-8 md:mx-0'>
            <button
              onClick={() => setChangePassword(true)}
              className={`cursor-pointer flex items-center w-full hover:bg-orange-300 transition-all p-2 rounded-lg `}
            >
              <FiSettings className='mr-2' />
              Contraseña
            </button>
            <button
              onClick={() => setShow(true)}
              className={`cursor-pointer flex items-center w-full hover:bg-orange-300 transition-all p-2 rounded-lg `}
            >
              <BsDoorClosed className='mr-2' />
              Salir
            </button>
          </li>
        </ul>

        <div className='hidden md:flex'>
          <div className='relative '>
            <button
              className={`settings_btn cursor-pointer w-fit mr-6 hover:bg-blue-300 transition-all p-2 rounded-lg `}
            >
              <FiSettings size={30} />
            </button>
            <ul className='settings_options absolute text-lg font-mono text-start overflow-hidden -left-32 rounded-md bg-white shadow-md h-0 '>
              <li
                onClick={() => setChangePassword(true)}
                className='p-2 tracking-widest border hover:border-2 transition-all cursor-pointer border-orange-300 rounded-md'
              >
                Contraseña
              </li>
            </ul>
          </div>
          <button
            onClick={() => setShow(true)}
            className='p-1 border-2 rounded-md transition-all border-orange-300 hover:bg-orange-300'
          >
            <BsDoorClosed size={30} />
          </button>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className='block z-50 md:hidden p-1 border-2 transition-all rounded-md border-orange-300 hover:bg-orange-300'
        >
          <GiHamburgerMenu size={30} />
        </button>
      </nav>
      <Confirmation
        show={show}
        onClose={() => setShow(false)}
        onConfirm={logout}
        text={'Seguro de salir del sistema?'}
      />
      <ChangePassword
        show={changePassword}
        onClose={() => setChangePassword(false)}
      />
    </header>
  )
}

export default Navbar
