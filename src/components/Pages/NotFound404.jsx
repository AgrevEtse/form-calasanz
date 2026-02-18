import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { cambiarTitulo } from '@/utils/cambiarTitulo'

const NotFound404 = () => {
  useEffect(() => {
    cambiarTitulo('404')
  }, [])

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='bg-base-200 text-base-content w-full max-w-md rounded-md p-8 text-center shadow-2xl'>
        <h2 className='text-error mb-4 text-5xl font-extrabold'>404</h2>
        <p className='mb-6 text-gray-600'>
          Página no encontrada. Parece que te has perdido.
        </p>
        <Link to='/'>
          <button className='btn btn-error w-full rounded-xl'>
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound404
