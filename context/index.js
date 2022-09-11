import { createContext, useReducer } from 'react'
import cookie from 'js-cookie'
import { initialData } from '@utils/data'

// Reducers
import studentReducer from './reducers/students'

export const StateContext = createContext()
export const DispatchContext = createContext()

const initialState = {
  students: [],
  califications: [],
  allCkeckList: [],
  classrooms: [],
  scheduleData: initialData || [],
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
