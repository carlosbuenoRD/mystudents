import { createContext, useReducer } from 'react'
import cookie from 'js-cookie'

// Reducers
import studentReducer from './reducers/students'

export const StateContext = createContext()
export const DispatchContext = createContext()

const initialState = {
  students: [],
  califications: [],
  allCkeckList: [],
  classrooms: [],
  auth: cookie.get('auth') ? cookie.get('auth') : null,
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default ContextProvider
