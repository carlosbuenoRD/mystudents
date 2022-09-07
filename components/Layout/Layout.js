import Head from 'next/head'

//Components
import Navbar from './Navbar'

function Layout({ children, title }) {
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
