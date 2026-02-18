import { forwardRef, useEffect } from 'react'

import { Link } from 'react-router-dom'

import useGlobalState from '@/context/useGlobalState'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormEnd = forwardRef(() => {
  const { resetStates } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('¡Registro Terminado!')
  }, [])

  const handleClick = () => {
    resetStates()
  }

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='bg-base-200 text-base-content w-full max-w-md rounded-md p-8 text-center shadow-2xl'>
        <h2 className='mb-4 text-5xl font-extrabold'>Registro Terminado</h2>
        <p className='mb-3'>
          Concluiste satisfactoriamente el registro del alumno.
        </p>
        <p className='mb-6 text-xl font-bold'>
          La inscripción termina con el pago de la misma.
        </p>
        <div className='flex flex-row justify-center gap-4'>
          <Link to='/form'>
            <button
              className='btn btn-warning rounded-xl py-2'
              onClick={handleClick}
            >
              Nueva Inscripcion
            </button>
          </Link>
          <Link to='/reinscripcion'>
            <button
              className='btn btn-success rounded-xl py-2'
              onClick={handleClick}
            >
              Reinscripcion
            </button>
          </Link>
          <Link to='https://www.calasanz.edu.mx/'>
            <button
              className='btn btn-info rounded-xl py-2'
              onClick={handleClick}
            >
              Salir
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
})

FormEnd.displayName = 'FormFinal'

export default FormEnd
