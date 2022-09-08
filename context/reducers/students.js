export const studentActions = {
  GET_ALL_STUDENTS: 'GET_ALL_STUDENTS',
  GET_ALL_CALIFICATIONS: 'GET_ALL_CALIFICATIONS',
  CREATE_STUDENT: 'CREATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  UPDATE_CALIFICATION: 'UPDATE_CALIFICATION',
}

export default function studentReducer(state, { type, payload }) {
  switch (type) {
    case studentActions.GET_ALL_STUDENTS:
      return {
        ...state,
        students: payload,
      }

    case studentActions.CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, payload],
      }

    case studentActions.DELETE_STUDENT:
      const removedStudent = state.students.filter((i) => i._id !== payload)
      return {
        ...state,
        students: [...removedStudent],
      }

    case studentActions.UPDATE_STUDENT:
      const updatedStudent = state.students.map((i) =>
        i._id !== payload._id ? i : payload
      )
      return {
        ...state,
        students: [...updatedStudent],
      }

    // CALIFICATIONS

    case studentActions.GET_ALL_CALIFICATIONS:
      return {
        ...state,
        califications: payload,
      }

    case studentActions.UPDATE_CALIFICATION:
      const updatedCalification = state.califications.map((i) =>
        i._id !== payload._id ? i : payload
      )
      return {
        ...state,
        califications: [...updatedCalification],
      }

    default:
      return state
  }
}
