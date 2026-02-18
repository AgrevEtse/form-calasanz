import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { PARENTESCO_ARRAY } from '@/utils/parentescoHelpers'
import { ContactoSchema } from '@/schemas/ContactoSchema'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormContacto = forwardRef((_, ref) => {
  const { form, dispatch } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('Contactos de Emergencia')
  }, [])

  useImperativeHandle(ref, () => ({
    validate: () => {
      const contacto1Result = ContactoSchema.safeParse(form.contactos[0])
      if (!contacto1Result.success)
        throw new Error(
          `Contacto 1: ${contacto1Result.error.issues[0].message}`
        )

      const contacto2Result = ContactoSchema.safeParse(form.contactos[1])
      if (!contacto2Result.success)
        throw new Error(
          `Contacto 2: ${contacto2Result.error.issues[0].message}`
        )

      const contacto3Result = ContactoSchema.safeParse(form.contactos[2])
      if (!contacto3Result.success)
        throw new Error(
          `Contacto 3: ${contacto3Result.error.issues[0].message}`
        )

      toast.success('Contactos Guardados')
    }
  }))

  return (
    <div className='bg-base-200 text-base-content mx-auto flex w-full flex-col rounded-md p-6 shadow-2xl'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        Contactos de Emergencia
      </h2>

      {form.contactos.map((_, i) => {
        return (
          <div key={i}>
            <h3 className='mb-4 text-center font-bold'>
              Contacto de Emergencia {i + 1}
            </h3>
            <div className='mb-16 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <label className='floating-label'>
                <span>
                  Nombre Completo <span className='text-rose-600'>*</span>
                </span>
                <input
                  value={form.contactos[i].nombre}
                  maxLength={70}
                  name='nombre'
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ARRAY_ITEM',
                      arrayName: 'contactos',
                      index: i,
                      field: e.target.name,
                      value: e.target.value
                    })
                  }
                  type='text'
                  placeholder='Nombre Completo *'
                  className='input input-md border-base-content m-auto w-full'
                />
              </label>

              <label className='floating-label'>
                <span>
                  Teléfono <span className='text-rose-600'>*</span>
                </span>
                <input
                  value={form.contactos[i].telefono}
                  name='telefono'
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ARRAY_ITEM',
                      arrayName: 'contactos',
                      index: i,
                      field: e.target.name,
                      value: e.target.value
                    })
                  }
                  type='tel'
                  placeholder='Télefono *'
                  pattern='[0-9]{10}'
                  className='input input-md border-base-content m-auto w-full'
                />
              </label>

              <label className='select select-md border-base-content w-full'>
                <span className='label'>
                  Parentesco <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={form.contactos[i].parentesco}
                  name='parentesco'
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ARRAY_ITEM',
                      arrayName: 'contactos',
                      index: i,
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

              {form.contactos[i].parentesco === 7 ? (
                <label className='floating-label'>
                  <span>
                    Otro <span className='text-rose-600'>*</span>
                  </span>
                  <input
                    value={form.contactos[i].otro}
                    name='otro'
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_ARRAY_ITEM',
                        arrayName: 'contactos',
                        index: i,
                        field: e.target.name,
                        value: e.target.value
                      })
                    }
                    type='text'
                    placeholder='Especifica el parentesco...'
                    className='input input-md border-base-content m-auto w-full'
                  />
                </label>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
})

FormContacto.displayName = 'FormContacto'

export default FormContacto
