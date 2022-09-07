export const studentActions = {
  GET_ALL_STUDENTS: 'GET_ALL_STUDENTS',
}

export default function studentReducer(state, { type, payload }) {
  switch (type) {
    case studentActions.GET_ALL_STUDENTS:
      return {
        ...state,
        students: payload,
      }

    default:
      return state
  }
}
