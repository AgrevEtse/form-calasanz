import { useContext } from 'react'
import GlobalStateContext from '@/context/GlobalStateContext'

const useGlobalState = () => {
  return useContext(GlobalStateContext)
}

export default useGlobalState
