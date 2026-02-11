import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { cambiarTitulo } from '@/utils/cambiarTitulo'

const HomePage = () => {
  useEffect(() => {
    cambiarTitulo('Inicio')
  }, [])

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl'>
        <h1 className='mb-4 text-3xl font-bold text-indigo-700'>
          Calasanz Inscripciones
        </h1>
        <p className='mb-6 text-gray-600'>
          Completa el formulario para asegurar tu lugar en el próximo ciclo
          escolar.
        </p>
        <div className='flex flex-col space-y-4'>
          <Link
            to='/form'
            className='block'
          >
            <button className='btn btn-warning w-full rounded-xl'>
              Nueva Inscripción
            </button>
          </Link>
          <Link
            to='/reinscripcion'
            className='block'
          >
            <button className='btn btn-success w-full rounded-xl'>
              Reinscripción
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
