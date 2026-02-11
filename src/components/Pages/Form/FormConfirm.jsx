import { cambiarTitulo } from '@/utils/cambiarTitulo'
import { forwardRef, useEffect } from 'react'

const FormConfirm = forwardRef(() => {
  useEffect(() => {
    cambiarTitulo('¿Enviar?')
  }, [])

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='bg-primary text-primary-content w-full max-w-md rounded-2xl p-8 text-center shadow-2xl'>
        <h2 className='mb-4 text-5xl font-extrabold'>
          ¿Enviar los datos guardados?
        </h2>
        <p className='mb-6 text-lg'>
          Completaste todos los pasos del formulario. ¿Estás seguro de que
          deseas enviar los datos guardados?
        </p>
      </div>
    </div>
  )
})

FormConfirm.displayName = 'FormFinal'

export default FormConfirm
