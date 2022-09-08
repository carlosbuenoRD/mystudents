import { useState, useEffect } from 'react'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'

// Components
import Layout from '@components/Layout/Layout'
import CreateStudent from '@components/Modal/CreateStudent'
import SearchInput from '@components/SearchInput'
import StudentsTable from '@components/Tables/StudentsTable'

// Icons
import { TiUserAdd } from 'react-icons/ti'
import Confirmation from '@components/Confirmation'

function Students() {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const { students } = useCTX()
  const { getAll } = useStudentDispatch()

  useEffect(() => {
    getAll()
  }, [])

  return (
    <Layout title={'Students'}>
      <div className='my-4 flex justify-between items-center'>
        <SearchInput input={search} setInput={setSearch} />
        <button
          onClick={() => setShow(true)}
          className='border-2 opacity-70 text-slate-700 p-2 rounded-full hover:opacity-100 hover:shadow-md'
        >
          <TiUserAdd size={25} />
        </button>
      </div>
      <StudentsTable
        students={students.filter(
          (i) =>
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.lastname.toLowerCase().includes(search.toLowerCase())
        )}
      />
      <CreateStudent show={show} onClose={() => setShow(false)} />
    </Layout>
  )
}

export default Students
