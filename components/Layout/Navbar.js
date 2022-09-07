import { useState } from 'react'
import Link from 'next/link'

//Icons
import { BsDoorClosed } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { BsListCheck } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <header className='h-20 shadow-md'>
      <nav className='px-2 sm:px-0 container m-auto flex items-center justify-between h-full xl:px-12'>
        <Link href={'/'} passHref>
          <a className='font-bold text-xl z-50'>MyStudents</a>
        </Link>

        <ul
          className={`fixed md:relative transition-all flex flex-col md:flex-row text-2xl pt-20 ${
            mobileMenu ? 'w-full' : 'w-0'
          } top-0 bottom-0 right-0 bg-green-50 md:bg-white md:pt-0 md:text-lg md:w-fit md:flex-row`}
        >
          <li className='mx-8 md:mx-0'>
            <Link href={'/list'} passHref>
              <a className='cursor-pointer flex items-center hover:bg-orange-300 transition-all p-2 rounded-lg'>
                <BsListCheck className='mr-2 -mb-1' size={20} />
                Lista
              </a>
            </Link>
          </li>
          <li className='mx-8'>
            <Link href={'/students'} passHref>
              <a className='cursor-pointer flex items-center hover:bg-orange-300 transition-all p-2 rounded-lg'>
                <FaUserGraduate className='mr-2' />
                Estudiantes
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
