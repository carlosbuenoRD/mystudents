//Components
import Layout from '@components/Layout/Layout'
import Schedule from '@components/Schedule'

export default function Home() {
  return (
    <Layout>
      <section className='grid grid-cols-2 my-4 gap-10'>
        <div className='bg-orange-400/70 p-6 rounded-md shadow-sm'>
          <div className='flex justify-end'>
            <div className='w-14 h-14 font-bold font-mono rounded-full bg-slate-300 grid place-items-center'>
              26
            </div>
          </div>
          <h1 className='text-8xl text-slate-600 text-center font-bold'>
            Viernes
          </h1>
          <ul className='mt-6 flex justify-center'>
            <li className='h-14 w-14 bg-slate-200 grid place-items-center rounded-full'>
              Lun
            </li>
            <li className='h-14 w-14 bg-slate-200 grid place-items-center rounded-full mx-4'>
              Mar
            </li>
            <li className='h-14 w-14 bg-slate-200 grid place-items-center rounded-full'>
              Mie
            </li>
            <li className='h-14 w-14 bg-slate-200 grid place-items-center rounded-full mx-4'>
              Jue
            </li>
            <li className='h-14 w-14 bg-slate-200 grid place-items-center rounded-full'>
              vie
            </li>
          </ul>
        </div>
        <div className='border px-6 py-4 flex flex-col justify-between shadow-sm rounded-sm'>
          <div className='border-b'>
            <h1 className='text-2xl pb-2'>Siguiente clase en 15:39</h1>
          </div>
          <h1 className='text-6xl text-slate-600 text-center font-bold'>
            Naturales
          </h1>
          <h1 className='text-2xl'>
            Proxima clase:{' '}
            <i className='ml-2 font-medium text-xl'>Lengua Española</i>
          </h1>
        </div>
      </section>

      <section className='border h-64'></section>

      {/* Schedule */}
      <section className='mt-16'>
        <Schedule />
      </section>
    </Layout>
  )
}
