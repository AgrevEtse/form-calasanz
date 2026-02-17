import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { PARENTESCO_ARRAY } from '@/utils/parentescoHelpers'
import { PagoSchema } from '@/schemas/PagoSchema'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormPago = forwardRef((_, ref) => {
  const { form, dispatch } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('Persona de Pagos')
  }, [])

  useImperativeHandle(ref, () => ({
    validate: () => {
      const pagoResult = PagoSchema.safeParse(form.persona_pago)
      if (!pagoResult.success)
        throw new Error(pagoResult.error.issues[0].message)

      toast.success('Responsable de Pagos Guardado')
    }
  }))

  return (
    <div className='mx-auto flex w-full flex-col items-center justify-center rounded-md p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        Responsable de Pagos
      </h2>

      <div className='mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <label className='floating-label'>
          <span>
            Nombre Completo <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.persona_pago.nombre}
            maxLength={70}
            name='nombre'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'persona_pago',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='text'
            placeholder='Nombre Completo *'
            className='input input-md w-full'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Parentesco <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.persona_pago.responsable}
            name='responsable'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'persona_pago',
                field: e.target.name,
                value: Number(e.target.value)
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge el parentesco...
            </option>
            {PARENTESCO_ARRAY.map((parentesco) => (
              <option
                key={parentesco.id}
                value={parentesco.value}
              >
                {parentesco.label}
              </option>
            ))}
          </select>
        </label>

        <label className='floating-label'>
          <span>
            Correo Electrónico <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.persona_pago.correo}
            maxLength={50}
            name='correo'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'persona_pago',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='email'
            placeholder='Correo Electrónico *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Teléfono (móvil) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.persona_pago.telefono}
            name='telefono'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'persona_pago',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='tel'
            placeholder='Télefono (móvil) *'
            pattern='[0-9]{10}'
            className='input input-md w-full'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            ¿Requiere Factura? <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.persona_pago.factura}
            name='factura'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'persona_pago',
                field: e.target.name,
                value: e.target.value === 'true'
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge la opción...
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </label>
      </div>
    </div>
  )
})

FormPago.displayName = 'FormPago'

export default FormPago
