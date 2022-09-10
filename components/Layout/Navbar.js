import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

//Icons
import { BsDoorClosed } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrNotes } from 'react-icons/gr'
import { CgClose } from 'react-icons/cg'

function Navbar() {
  const router = useRouter()
  const [mobileMenu, setMobileMenu] = useState(false)

  let { pathname } = router

  console.log(pathname)

  return (
    <header className='h-20 md:h-28 shadow-md'>
      <nav className='px-2 relative sm:px-0 container m-auto flex items-center justify-between h-full xl:px-12'>
        <Link href={'/'} passHref>
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
        </ul>

        <button className='hidden md:block    p-1 border-2 rounded-md text-orange-600 border-orange-400'>
          <BsDoorClosed size={30} />
        </button>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className='block z-50 md:hidden p-1 border-2 rounded-md text-orange-600 border-orange-400'
        >
          <GiHamburgerMenu size={30} />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
