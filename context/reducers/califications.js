export const calificationActions = {
  GET_ALL_CALIFICATIONS: 'GET_ALL_CALIFICATIONS',
}

export default function calificationReducer(state, { type, payload }) {
  switch (type) {
    case calificationActions.GET_ALL_CALIFICATIONS:
      return {
        ...state,
        califications: payload,
      }

    default:
      return state
  }
}
