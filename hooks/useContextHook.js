import { useCallback, useContext, useMemo } from 'react'
import { StateContext, DispatchContext } from '../context'
import { studentActions } from 'context/reducers/students'
import axios from 'axios'

export const useCTX = () => {
  return useContext(StateContext)
}

export const useStudentDispatch = () => {
  const dispatch = useContext(DispatchContext)

  const getAll = useCallback(async () => {
    const { data } = await axios.get('/api/students')
    dispatch({ type: studentActions.GET_ALL_STUDENTS, payload: data })
  }, [dispatch])

  return useMemo(
    () => ({
      getAll,
    }),
    [dispatch]
  )
}
