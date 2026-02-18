import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { HermanoSchema } from '@/schemas/HermanoSchema'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormHermanos = forwardRef((_, ref) => {
  const { form, dispatch } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('Hermanos')
  }, [])

  useImperativeHandle(ref, () => ({
    validate: () => {
      const hermano1Result = HermanoSchema.safeParse(form.hermanos[0])
      if (!hermano1Result.success)
        throw new Error(`Hermano 1: ${hermano1Result.error.issues[0].message}`)

      const hermano2Result = HermanoSchema.safeParse(form.hermanos[1])
      if (!hermano2Result.success)
        throw new Error(`Hermano 2: ${hermano2Result.error.issues[0].message}`)

      const hermano3Result = HermanoSchema.safeParse(form.hermanos[2])
      if (!hermano3Result.success)
        throw new Error(`Hermano 3: ${hermano3Result.error.issues[0].message}`)

      toast.success('Hermanos Guardados')
    }
  }))

  return (
    <div className='bg-base-200 text-base-content mx-auto flex w-full flex-col rounded-md p-6 shadow-2xl'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        Hermanos Inscritos en el Colegio
      </h2>

      {form.hermanos.map((_, i) => {
        return (
          <div key={i}>
            <h3 className='mb-4 text-center font-bold'>Hermano {i + 1}</h3>
            <div className='mb-16 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:px-60'>
              <label className='floating-label'>
                <span>Nombre Completo</span>
                <input
                  value={form.hermanos[i].nombre}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ARRAY_ITEM',
                      arrayName: 'hermanos',
                      index: i,
                      field: e.target.name,
                      value: e.target.value
                    })
                  }
                  minLength={0}
                  maxLength={70}
                  name='nombre'
                  type='text'
                  placeholder='Nombre Completo'
                  className='input input-md border-base-content m-auto w-full'
                />
              </label>

              <label className='select select-md border-base-content w-full'>
                <span className='label'>Escolaridad</span>
                <select
                  value={form.hermanos[i].nivel}
                  name='nivel'
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ARRAY_ITEM',
                      arrayName: 'hermanos',
                      index: i,
                      field: e.target.name,
                      value: e.target.value
                    })
                  }
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge la escolaridad...
                  </option>
                  <option value='Preescolar'>Preescolar</option>
                  <option value='Primaria'>Primaria</option>
                  <option value='Secundaria'>Secundaria</option>
                  {/* <option value='Bachillerato'>Bachillerato</option> */}
                </select>
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
})

FormHermanos.displayName = 'FormHermanos'

export default FormHermanos
