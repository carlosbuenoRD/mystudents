import { useCallback, useContext, useMemo } from 'react'
import { StateContext, DispatchContext } from '../context'
import { studentActions } from 'context/reducers/students'
import axios from 'axios'
import cookie from 'js-cookie'

export const useCTX = () => {
  return useContext(StateContext)
}

export const useStudentDispatch = () => {
  const dispatch = useContext(DispatchContext)
  const { auth } = useCTX()

  let config = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  }

  const getAll = useCallback(
    async (classroom) => {
      const { data } = await axios.get(
        `/api/students?classroom=${classroom}`,
        config
      )
      dispatch({ type: studentActions.GET_ALL_STUDENTS, payload: data })
    },
    [dispatch]
  )

  const getOne = useCallback(
    async (id) => {
      const { data } = await axios.get(`/api/students/${id}`, config)
      dispatch({ type: studentActions.GET_ONE_STUDENTS, payload: data })
    },
    [dispatch]
  )

  const createStudent = useCallback(
    async (payload) => {
      const { data } = await axios.post('/api/students', payload, config)
      dispatch({ type: studentActions.CREATE_STUDENT, payload: data })
    },
    [dispatch]
  )

  const updateStudent = useCallback(
    async (payload) => {
      const { data } = await axios.put(
        `/api/students/${payload._id}`,
        payload,
        config
      )
      dispatch({ type: studentActions.UPDATE_STUDENT, payload: data })
    },
    [dispatch]
  )

  const deleteStudent = useCallback(
    async (id) => {
      await axios.delete(`/api/students/${id}`, config)
      dispatch({ type: studentActions.DELETE_STUDENT, payload: id })
    },
    [dispatch]
  )

  const clearStudents = () => {
    dispatch({ type: studentActions.CLEAR_STUDENTS })
  }

  // grades

  const getAllGrades = useCallback(
    async (subject, classroom) => {
      const { data } = await axios.get(
        `/api/califications?subject=${subject}&classroom=${classroom}`,
        config
      )
      dispatch({ type: studentActions.GET_ALL_CALIFICATIONS, payload: data })
    },
    [dispatch]
  )

  const getOneGrade = useCallback(
    async (id) => {
      const { data } = await axios.get(`/api/califications/${id}`, config)
      dispatch({ type: studentActions.GET_ONE_CALIFICATIONS, payload: data })
    },
    [dispatch]
  )

  const updateGrades = useCallback(
    async (payload) => {
      const { data } = await axios.put(
        `/api/califications/${payload._id}`,
        payload,
        config
      )
      dispatch({ type: studentActions.UPDATE_CALIFICATION, payload: data })
    },
    [dispatch]
  )

  // CHECKLIST

  const getAllList = useCallback(
    async (subject, date, classroom) => {
      const { data } = await axios.get(
        `/api/checklist?subject=${subject}&date=${date}&classroom=${classroom}`,
        config
      )
      dispatch({ type: studentActions.GET_ALL_CHECKLIST, payload: data })
    },
    [dispatch]
  )

  const createList = useCallback(
    async (payload) => {
      const { data } = await axios.post('/api/checklist', payload, config)
      dispatch({ type: studentActions.CREATE_CHECKLIST, payload: data })
    },
    [dispatch]
  )

  // CLassroom

  const getAllClassroom = useCallback(async () => {
    const { data } = await axios.get('/api/classroom', config)
    dispatch({ type: studentActions.GET_ALL_CLASSROOM, payload: data })
  }, [dispatch])

  const createClassroom = useCallback(
    async (payload) => {
      const { data } = await axios.post('/api/classroom', payload, config)
      dispatch({ type: studentActions.CREATE_CLASSROOM, payload: data })
    },
    [dispatch]
  )

  const deleteClassroom = useCallback(
    async (id) => {
      await axios.delete(`/api/classroom/${id}`, config)
      dispatch({ type: studentActions.DELETE_CLASSROOM, payload: id })
    },
    [dispatch]
  )

  // Login

  const login = async (password) => {
    const { data } = await axios.post(`/api/auth/login`, { password })
    cookie.set('auth', data.jwt)
    dispatch({ type: studentActions.LOGIN, payload: data.jwt })
  }

  const loginQuestion = async (question) => {
    const { data } = await axios.post(`/api/auth/question`, { question })
    cookie.set('auth', data.jwt)
    dispatch({ type: studentActions.LOGIN, payload: data.jwt })
  }

  const logout = async () => {
    dispatch({ type: studentActions.LOGIN })
    cookie.remove('auth')
  }

  const updatePassword = async (payload) => {
    await axios.put(`/api/auth/update`, payload, config)
  }

  return useMemo(
    () => ({
      getAll,
      getOne,
      getAllGrades,
      getOneGrade,
      createStudent,
      deleteStudent,
      clearStudents,
      updateStudent,
      updateGrades,
      getAllList,
      createList,
      getAllClassroom,
      createClassroom,
      deleteClassroom,
      login,
      loginQuestion,
      logout,
      updatePassword,
    }),
    [dispatch]
  )
}
