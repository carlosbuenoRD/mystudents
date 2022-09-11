import Head from 'next/head'
import { useCTX } from 'hooks/useContextHook'
import { useRouter } from 'next/router'

//Components
import Navbar from './Navbar'
import { useEffect } from 'react'

function Layout({ children, title }) {
  const router = useRouter()
  const { auth } = useCTX()

  useEffect(() => {
    if (!auth) {
      router.push('/')
    }
  }, [auth])

  return (
    <div>
      <Head>
        <title>{title || 'MyStudents'}</title>
      </Head>
      <Navbar />
      <div className='container m-auto xl:px-12'>{children}</div>
    </div>
  )
}

export default Layout
