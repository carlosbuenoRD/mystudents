import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCTX, useStudentDispatch } from '../hooks/useContextHook'

function Index() {
  const router = useRouter()
  const [password, setPassword] = useState('')

  const { auth } = useCTX()
  const { login } = useStudentDispatch()

  useEffect(() => {
    if (auth) {
      router.push('/home')
    }
  }, [auth])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(password)
      toast.success('Bienvido!')
      router.push('/home')
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center bg-orange-300/80'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl mb-4 md:mb-10 lg:mb-14 xl:mb-20 font-bold font-mono'>
        Bienvenido Pedro!
      </h1>
      <form onSubmit={handleLogin}>
        <div className='text-xs md:text-base lg:text-lg flex flex-col'>
          <label className='font-medium mb-1 text-center'>
            Ingresa la contraseña
          </label>
          <input
            type='password'
            value={password}
            className='border-2 border-slate-400 bg-slate-100 outline-orange-400 md:w-72 xl:w-96 md:py-1 lg:py-2 text-2xl px-2 rounded-md'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='w-full bg-slate-200/70 mt-2 py-2 hover:bg-slate-200'
            type='submit'
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Index
