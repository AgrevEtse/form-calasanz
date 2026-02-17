import { Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from '@/components/Pages/HomePage'
import Reinscripcion from '@/components/Pages/Reinscripcion'
import NotFound404 from '@/components/Pages/NotFound404'
import Form from '@/components/Pages/Form/Form'
import useGlobalState from '@/context/useGlobalState'

const App = () => {
  const { resetStates } = useGlobalState()

  const handleClick = () => {
    resetStates()
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='navbar bg-neutral text-neutral-content w-full rounded-2xl shadow-sm'>
          <div className='navbar-start'>
            <Link
              className='btn btn-secondary text-xl'
              to='/'
            >
              Calasanz Inscripciones
            </Link>
          </div>

          <div className='navbar-end'>
            <Link to='/form'>
              <button
                onClick={handleClick}
                className='btn btn-warning mx-1'
              >
                Nueva Inscripción
              </button>
            </Link>
            <Link to='/reinscripcion'>
              <button
                onClick={handleClick}
                className='btn btn-success mx-1'
              >
                Reinscripción
              </button>
            </Link>
          </div>
        </div>

        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/reinscripcion'
            element={<Reinscripcion />}
          />
          <Route
            path='/form'
            element={<Form />}
          />
          <Route
            path='*'
            element={<NotFound404 />}
          />
        </Routes>
      </div>
      <Toaster
        position='top-center'
        reverseOrder={true}
      />
    </>
  )
}

export default App
