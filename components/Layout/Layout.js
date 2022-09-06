//Components
import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className='container m-auto'>{children}</div>
    </div>
  )
}

export default Layout
