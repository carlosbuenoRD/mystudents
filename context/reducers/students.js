export const studentActions = {
  GET_ALL_STUDENTS: 'GET_ALL_STUDENTS',
  GET_ALL_CLASSROOM: 'GET_ALL_CLASSROOM',
  GET_ALL_CALIFICATIONS: 'GET_ALL_CALIFICATIONS',
  GET_ALL_CHECKLIST: 'GET_ALL_CHECKLIST',
  GET_ONE_STUDENTS: 'GET_ONE_STUDENTS',
  GET_ONE_CALIFICATIONS: 'GET_ONE_CALIFICATIONS',
  CREATE_STUDENT: 'CREATE_STUDENT',
  CREATE_CLASSROOM: 'CREATE_CLASSROOM',
  CREATE_CHECKLIST: 'CREATE_CHECKLIST',
  DELETE_STUDENT: 'DELETE_STUDENT',
  DELETE_CLASSROOM: 'DELETE_CLASSROOM',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  UPDATE_CALIFICATION: 'UPDATE_CALIFICATION',
  CLEAR_STUDENTS: 'CLEAR_STUDENTS',
}

export default function studentReducer(state, { type, payload }) {
  switch (type) {
    case studentActions.GET_ALL_STUDENTS:
      return {
        ...state,
        students: payload,
      }

    case studentActions.GET_ONE_STUDENTS:
      return {
        ...state,
        student: payload,
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

    case studentActions.CLEAR_STUDENTS:
      return {
        ...state,
        students: [],
      }

    // CALIFICATIONS

    case studentActions.GET_ALL_CALIFICATIONS:
      return {
        ...state,
        califications: payload,
      }

    case studentActions.GET_ONE_CALIFICATIONS:
      return {
        ...state,
        calification: payload,
      }

    case studentActions.UPDATE_CALIFICATION:
      const updatedCalification = state.califications.map((i) =>
        i._id !== payload._id ? i : payload
      )
      return {
        ...state,
        califications: [...updatedCalification],
      }

    // CheckList

    case studentActions.GET_ALL_CHECKLIST:
      return {
        ...state,
        allCheckList: payload,
      }

    case studentActions.CREATE_CHECKLIST:
      return {
        ...state,
        allCheckList: [...state.allCheckList, payload],
      }

    // Classroom

    case studentActions.GET_ALL_CLASSROOM:
      return {
        ...state,
        classrooms: payload,
      }

    case studentActions.CREATE_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, payload],
      }

    case studentActions.DELETE_CLASSROOM:
      const removedClassroom = state.classrooms.filter((i) => i._id !== payload)
      return {
        ...state,
        students: [...removedClassroom],
      }

    default:
      return state
  }
}
