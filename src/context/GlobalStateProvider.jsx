import { useState } from 'react'
import PropTypes from 'prop-types'

import GlobalStateContext from '@/context/GlobalStateContext'
import { DEFAULT_CURP, DEFAULT_FORM } from '@/utils/defaultStates.js'
import { useReducer } from 'react'

const GlobalStateProvider = ({ children }) => {
  const [curp, setCurp] = useState(DEFAULT_CURP)
  const [isReinscripcion, setIsReinscripcion] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD': {
        const { section, field, value } = action
        return {
          ...state,
          [section]: {
            ...state[section],
            [field]: value
          }
        }
      }

      case 'UPDATE_ARRAY_ITEM': {
        const { arrayName, index, field, value } = action

        const updatedArray = [...state[arrayName]]
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: value
        }

        return {
          ...state,
          [arrayName]: updatedArray
        }
      }

      case 'SET_ARRAY_ITEM': {
        const { arrayName, index, value } = action
        const updated = [...state[arrayName]]
        updated[index] = value
        return {
          ...state,
          [arrayName]: updated
        }
      }

      case 'SET_SECTION': {
        const { property, value } = action
        return {
          ...state,
          [property]: value
        }
      }

      case 'RESET': {
        return action.payload
      }

      default:
        return state
    }
  }

  const [form, dispatch] = useReducer(formReducer, DEFAULT_FORM)

  const resetStates = () => {
    setCurp(DEFAULT_CURP)
    dispatch({ type: 'RESET', payload: DEFAULT_FORM })
    setCurrentStep(0)
    setIsReinscripcion(false)
  }

  return (
    <GlobalStateContext.Provider
      value={{
        curp,
        setCurp,
        isReinscripcion,
        setIsReinscripcion,
        form,
        dispatch,
        resetStates,
        currentStep,
        setCurrentStep
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

GlobalStateProvider.propTypes = {
  children: PropTypes.node
}

export default GlobalStateProvider
