import { createContext, useReducer } from 'react'

// Reducers
import studentReducer from './reducers/students'

export const StateContext = createContext()
export const DispatchContext = createContext()

const initialState = {
  students: [],
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
