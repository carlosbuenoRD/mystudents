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

  const getOne = useCallback(
    async (id) => {
      const { data } = await axios.get(`/api/students/${id}`)
      dispatch({ type: studentActions.GET_ONE_STUDENTS, payload: data })
    },
    [dispatch]
  )

  const createStudent = useCallback(
    async (payload) => {
      const { data } = await axios.post('/api/students', payload)
      dispatch({ type: studentActions.CREATE_STUDENT, payload: data })
    },
    [dispatch]
  )

  const updateStudent = useCallback(
    async (payload) => {
      const { data } = await axios.put(`/api/students/${payload._id}`, payload)
      dispatch({ type: studentActions.UPDATE_STUDENT, payload: data })
    },
    [dispatch]
  )

  const deleteStudent = useCallback(
    async (id) => {
      await axios.delete(`/api/students/${id}`)
      dispatch({ type: studentActions.DELETE_STUDENT, payload: id })
    },
    [dispatch]
  )

  // grades

  const getAllGrades = useCallback(
    async (subject) => {
      const { data } = await axios.get(`/api/califications?subject=${subject}`)
      dispatch({ type: studentActions.GET_ALL_CALIFICATIONS, payload: data })
    },
    [dispatch]
  )

  const getOneGrade = useCallback(
    async (id) => {
      const { data } = await axios.get(`/api/califications/${id}`)
      dispatch({ type: studentActions.GET_ONE_CALIFICATIONS, payload: data })
    },
    [dispatch]
  )

  const updateGrades = useCallback(
    async (payload) => {
      const { data } = await axios.put(
        `/api/califications/${payload._id}`,
        payload
      )
      dispatch({ type: studentActions.UPDATE_CALIFICATION, payload: data })
    },
    [dispatch]
  )

  // CHECKLIST

  const getAllList = useCallback(
    async (subject, date) => {
      const { data } = await axios.get(
        `/api/checklist?subject=${subject}&date=${date}`
      )
      dispatch({ type: studentActions.GET_ALL_CHECKLIST, payload: data })
    },
    [dispatch]
  )

  const createList = useCallback(
    async (payload) => {
      const { data } = await axios.post('/api/checklist', payload)
      dispatch({ type: studentActions.CREATE_CHECKLIST, payload: data })
    },
    [dispatch]
  )

  return useMemo(
    () => ({
      getAll,
      getOne,
      getAllGrades,
      getOneGrade,
      createStudent,
      deleteStudent,
      updateStudent,
      updateGrades,
      getAllList,
      createList,
    }),
    [dispatch]
  )
}
