//Components
import Layout from '@components/Layout/Layout'
import formatDate from '@utils/formatDate'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BsListCheck } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { GrNotes } from 'react-icons/gr'
import axios from 'axios'

const Schedule = dynamic(() => import('@components/Schedule'), { ssr: false })

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    process.env.URL || 'http://localhost:3000/api/count'
  )

  return {
    props: {
      studentsCount: data.students,
      classroomsCount: data.classrooms,
    },
  }
}

export default function Home({ studentsCount, classroomsCount }) {
  return (
    <Layout>
      <section className='grid md:grid-cols-2 my-4 gap-4 lg:gap-6 xl:gap-8'>
        <div className=' md:60  bg-orange-400/70 p-6 rounded-md shadow-sm'>
          <div className='flex justify-end'>
            <div className='w-10 h-10 lg:w-14 lg:h-14 text-xl font-medium font-mono rounded-full bg-slate-200/90 grid place-items-center'>
              {new Date().getDate()}
            </div>
          </div>
          <h1 className='text-3xl uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  text-slate-600 text-center font-bold'>
            {formatDate(new Date(), 'day')}
          </h1>
          <div className='grid grid-cols-2 place-items-center w-full mt-6'>
            <div className='flex flex-col items-center w-full border-r-2 border-slate-500'>
              <h1 className='text-2xl font-medium'>{classroomsCount}</h1>
              <p className='text-lg'>Cursos</p>
            </div>
            <div className='flex flex-col items-center'>
              <h1 className='text-2xl font-medium'>{studentsCount}</h1>
              <p className='text-lg'>Estudiantes</p>
            </div>
          </div>
        </div>
        <div className=' h-48 md:h-full border px-6 py-4 flex flex-col justify-between shadow-sm rounded-sm'>
          <div className='border-b'>
            <h1 className='text-lg md:text-xl lg:text-2xl pb-2'>
              Siguiente clase en <i className='font-medium'>15:39</i>
            </h1>
          </div>
          <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-600 text-center font-bold'>
            Naturales
          </h1>
          <h1 className='text-lg md:text-xl lg:text-2xl'>
            Proxima clase: <i className='ml-2 font-medium'>Lengua Española</i>
          </h1>
        </div>
      </section>

      <section className='border flex h-48 md:h-64 rounded-l-md'>
        <div className='flex w-full place-items-center'>
          <Link href='/checklist' passHref>
            <a className='flex flex-col justify-center items-center cursor-pointer transition-all bg-cyan-100/80 w-full h-full hover:scale-105 hover:bg-cyan-100'>
              <BsListCheck className='mr-2 -mb-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' />
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-5'>
                Lista
              </h1>
            </a>
          </Link>
          <Link href={'/students'} passHref>
            <a className='flex flex-col justify-center items-center cursor-pointer transition-all bg-yellow-100/80 w-full h-full hover:scale-105 hover:bg-yellow-100'>
              <FaUserGraduate className='mr-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' />
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-5'>
                Estudiantes
              </h1>
            </a>
          </Link>
          <Link href={'/calificaciones'} passHref>
            <a className='flex flex-col justify-center items-center cursor-pointer transition-all bg-emerald-100 w-full h-full hover:scale-105 hover:bg-emerald-100'>
              <GrNotes className='mr-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' />
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-5'>
                Calificaciones
              </h1>
            </a>
          </Link>
        </div>
      </section>

      {/* Schedule */}
      <section className='mt-16 relative bg-slate-50'>
        <Schedule />
      </section>
    </Layout>
  )
}
