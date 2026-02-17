import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { GRADO_MAX_ESTUDIOS_ARRAY } from '@/utils/gradoMaxEstudiosHelpers'
import { TutorSchema } from '@/schemas/TutorSchema'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormTutores = forwardRef((_, ref) => {
  const { form, dispatch } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('Tutores')
  }, [])

  useImperativeHandle(ref, () => ({
    validate: () => {
      const tutor1Result = TutorSchema.safeParse(form.tutor_1)
      if (!tutor1Result.success)
        throw new Error(`Tutor 1: ${tutor1Result.error.issues[0].message}`)

      const tutor2Result = TutorSchema.safeParse(form.tutor_2)
      if (!tutor2Result.success)
        throw new Error(`Tutor 2: ${tutor2Result.error.issues[0].message}`)

      toast.success('Tutores Guardados')
    }
  }))

  return (
    <div className='mx-auto flex w-full flex-col items-center justify-center rounded-md p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        Datos de los Tutores
      </h2>

      <h3 className='mb-4 text-center font-bold'>Papá / Tutor 1</h3>
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <label className='floating-label'>
          <span>
            Nombre(s) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.nombre}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='nombre'
            required
            type='text'
            placeholder='Nombre(s) *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Apellido Paterno <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.apellido_paterno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='apellido_paterno'
            required
            type='text'
            placeholder='Apellido Paterno *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Apellido Materno <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.apellido_materno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='apellido_materno'
            required
            type='text'
            placeholder='Apellido Materno *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Lugar de Nacimiento <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.estado_nacimiento}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='estado_nacimiento'
            required
            type='text'
            placeholder='Lugar de Nacimiento *'
            className='input input-md w-full'
          />
        </label>

        <label className='input input-md w-full'>
          <span className='label'>
            Fecha Nacimiento <span className='text-rose-600'>*</span>
          </span>
          <input
            required
            value={form.tutor_1.fecha_nacimiento}
            name='fecha_nacimiento'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='date'
          />
        </label>

        <label className='floating-label'>
          <span>
            Domicilio <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.domicilio}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={30}
            name='domicilio'
            required
            type='text'
            placeholder='Domicilio *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Colonia <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.colonia}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={30}
            name='colonia'
            required
            type='text'
            placeholder='Colonia *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            C.P. <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.codigo_postal}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={100000}
            max={999999}
            name='codigo_postal'
            required
            type='number'
            placeholder='C.P. *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Teléfono (móvil) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.telefono_movil}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={1000000000}
            max={9999999999}
            name='telefono_movil'
            required
            type='tel'
            placeholder='Télefono (móvil) *'
            pattern='[0-9]{10}'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>Teléfono (fijo)</span>
          <input
            value={form.tutor_1.telefono_fijo}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={1000000000}
            max={9999999999}
            name='telefono_fijo'
            type='tel'
            placeholder='Télefono (fijo)'
            pattern='[0-9]{10}'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Correo Electrónico <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.correo_electronico}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={50}
            name='correo_electronico'
            required
            type='email'
            placeholder='Correo Electrónico *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Ocupación <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_1.oupacion}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='oupacion'
            required
            type='text'
            placeholder='Ocupación *'
            className='input input-md w-full'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Grado Máx Estudios <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            value={form.tutor_1.grado_max_estudios}
            name='grado_max_estudios'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge el Grado Estudios...
            </option>
            {GRADO_MAX_ESTUDIOS_ARRAY.map(({ id, value, label }) => (
              <option
                key={id}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            ¿Es tutor principal? <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.tutor_1.primario}
            name='primario'
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value === 'true'
              })

              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value !== 'true'
              })
            }}
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

      {/* --------------------------------------------------------------------------- */}

      <h3 className='mb-4 text-center font-bold'>Mamá / Tutor 2</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <label className='floating-label'>
          <span>
            Nombre(s) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.nombre}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='nombre'
            required
            type='text'
            placeholder='Nombre(s) *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Apellido Paterno <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.apellido_paterno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='apellido_paterno'
            required
            type='text'
            placeholder='Apellido Paterno *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Apellido Materno <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.apellido_materno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='apellido_materno'
            required
            type='text'
            placeholder='Apellido Materno *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Lugar de Nacimiento <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.estado_nacimiento}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='estado_nacimiento'
            required
            type='text'
            placeholder='Lugar de Nacimiento *'
            className='input input-md w-full'
          />
        </label>

        <label className='input input-md w-full'>
          <span className='label'>
            Fecha Nacimiento <span className='text-rose-600'>*</span>
          </span>
          <input
            required
            value={form.tutor_2.fecha_nacimiento}
            name='fecha_nacimiento'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='date'
          />
        </label>

        <label className='floating-label'>
          <span>
            Domicilio <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.domicilio}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={30}
            name='domicilio'
            required
            type='text'
            placeholder='Domicilio *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Colonia <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.colonia}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={30}
            name='colonia'
            required
            type='text'
            placeholder='Colonia *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            C.P. <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.codigo_postal}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={100000}
            max={999999}
            name='codigo_postal'
            required
            type='number'
            placeholder='C.P. *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Teléfono (móvil) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.telefono_movil}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={1000000000}
            max={9999999999}
            name='telefono_movil'
            required
            type='tel'
            placeholder='Teléfono (móvil) *'
            pattern='[0-9]{10}'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>Teléfono (fijo)</span>
          <input
            value={form.tutor_2.telefono_fijo}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            min={1000000000}
            max={9999999999}
            name='telefono_fijo'
            type='tel'
            placeholder='Teléfono (fijo)'
            pattern='[0-9]{10}'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Correo Electrónico <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.correo_electronico}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={50}
            name='correo_electronico'
            required
            type='email'
            placeholder='Correo Electrónico *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Ocupación <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.tutor_2.oupacion}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={40}
            name='oupacion'
            required
            type='text'
            placeholder='Ocupación *'
            className='input input-md w-full'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Grado Máx Estudios <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            value={form.tutor_2.grado_max_estudios}
            name='grado_max_estudios'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge el Grado Estudios...
            </option>
            {GRADO_MAX_ESTUDIOS_ARRAY.map(({ id, value, label }) => (
              <option
                key={id}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            ¿Es tutor principal? <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.tutor_2.primario}
            name='primario'
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_2',
                field: e.target.name,
                value: e.target.value === 'true'
              })

              dispatch({
                type: 'UPDATE_FIELD',
                section: 'tutor_1',
                field: e.target.name,
                value: e.target.value !== 'true'
              })
            }}
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

FormTutores.displayName = 'FormTutores'

export default FormTutores
