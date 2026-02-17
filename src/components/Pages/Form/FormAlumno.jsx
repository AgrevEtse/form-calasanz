import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { PAISES_ARRAY } from '@/utils/paisesHelpers'
import { ESTADOS_ARRAY } from '@/utils/estadosHelpers'
import { getMunicipiosByEstado } from '@/utils/municipiosHelpers'
import {
  getFirstGradoByEscolaridad,
  getGradosByEscolaridad,
  getIdEscolaridad
} from '@/utils/escolaridadGradosHelpers'
import { AlumnoSchema, CURPSchema } from '@/schemas/AlumnoSchema'
import { EscuelaProcedenciaSchema } from '@/schemas/EscuelaProcedenciaSchema'
import { InscripcionSchema } from '@/schemas/InscripcionSchema'
import { DomicilioSchema } from '@/schemas/DomicilioSchema'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const FormAlumno = forwardRef((_, ref) => {
  const { curp, setCurp, form, dispatch } = useGlobalState()

  useEffect(() => {
    cambiarTitulo('Datos Alumno')
  }, [])

  useImperativeHandle(ref, () => ({
    validate: () => {
      const escuelaProcedenciaResult = EscuelaProcedenciaSchema.safeParse(
        form.escuela
      )
      if (!escuelaProcedenciaResult.success)
        throw new Error(escuelaProcedenciaResult.error.issues[0].message)

      const curpResult = CURPSchema.safeParse(curp)
      if (!curpResult.success)
        throw new Error(curpResult.error.issues[0].message)

      const alumnoResult = AlumnoSchema.safeParse(form.alumno)
      if (!alumnoResult.success)
        throw new Error(alumnoResult.error.issues[0].message)

      const inscripcionResult = InscripcionSchema.safeParse(form.inscripcion)
      if (!inscripcionResult.success)
        throw new Error(inscripcionResult.error.issues[0].message)

      const domicilioResult = DomicilioSchema.safeParse(form.domicilio)
      if (!domicilioResult.success)
        throw new Error(domicilioResult.error.issues[0].message)

      toast.success('Alumno Guardado')
    }
  }))

  return (
    <div className='mx-auto flex w-full flex-col items-center justify-center rounded-md p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>Datos del Alumno</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <label className='floating-label'>
          <span>
            CCT de Procedencia <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.escuela.cct}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'escuela',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={10}
            maxLength={10}
            name='cct'
            required
            type='text'
            placeholder='CCT *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Escuela de Procedencia <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.escuela.nombre}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'escuela',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={1}
            maxLength={100}
            name='nombre'
            required
            type='text'
            placeholder='Nombre Escuela *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>Matricula de Escuela de Procedencia</span>
          <input
            value={form.escuela.matricula}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'escuela',
                field: e.target.name,
                value: e.target.value
              })
            }
            name='matricula'
            minLength={1}
            maxLength={10}
            type='text'
            placeholder='Matricula'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            CURP <span className='text-rose-600'>*</span>
          </span>
          <input
            value={curp}
            onChange={(e) => {
              setCurp(e.target.value)
            }}
            minLength={18}
            maxLength={20}
            required
            type='text'
            placeholder='CURP *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Nombre(s) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.alumno.nombre}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
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
            value={form.alumno.apellido_paterno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
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
            value={form.alumno.apellido_materno}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
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

        <label className='select select-md w-full'>
          <span className='label'>
            Género <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.alumno.genero}
            required
            name='genero'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge el género...
            </option>
            <option value='H'>Hombre</option>
            <option value='M'>Mujer</option>
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Tipo Sanguíneo <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.alumno.tipo_sanguineo}
            required
            name='tipo_sanguineo'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge el tipo sanguineo...
            </option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Lateralidad <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.alumno.es_diestro}
            required
            name='es_diestro'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value === 'true'
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge la lateralidad...
            </option>
            <option value={true}>Derecho</option>
            <option value={false}>Izquierdo</option>
          </select>
        </label>

        <label className='input input-md w-full'>
          <span className='label'>
            Fecha Nacimiento <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.alumno.fecha_nacimiento}
            required
            name='fecha_nacimiento'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='date'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Nacionalidad <span className='text-rose-600'>*</span>
          </span>
          <select
            value={form.alumno.nacionalidad}
            required
            name='nacionalidad'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
          >
            <option
              disabled
              value='0'
            >
              Escoge la nacionalidad...
            </option>
            {PAISES_ARRAY.map((pais) => (
              <option
                key={pais.id}
                value={pais.value}
              >
                {pais.label}
              </option>
            ))}
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Escolaridad <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            name='escolaridad'
            value={form.inscripcion.escolaridad}
            onChange={(e) => {
              // Actualizar escolaridad
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'inscripcion',
                field: e.target.name,
                value: e.target.value
              })

              // Actualizar grado por el primero de la escolaridad
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'inscripcion',
                field: 'grado',
                value: Number(getFirstGradoByEscolaridad(e.target.value))
              })

              // Actualizar id_escolaridad
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'inscripcion',
                field: 'id_escolaridad',
                value: getIdEscolaridad(
                  e.target.value,
                  getFirstGradoByEscolaridad(e.target.value)
                )
              })
            }}
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

        <label className='select select-md w-full'>
          <span className='label'>
            Grado <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            name='grado'
            disabled={form.inscripcion.escolaridad === '0'}
            value={form.inscripcion.grado}
            onChange={(e) => {
              // Actualizar grado
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'inscripcion',
                field: e.target.name,
                value: Number(e.target.value)
              })

              // Actualizar id_escolaridad
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'inscripcion',
                field: 'id_escolaridad',
                value: getIdEscolaridad(
                  form.inscripcion.escolaridad,
                  e.target.value
                )
              })
            }}
          >
            <option
              disabled
              value='0'
            >
              Escoge el grado...
            </option>
            {form.inscripcion.escolaridad !== '0' &&
              getGradosByEscolaridad(form.inscripcion.escolaridad).map(
                (grado) => (
                  <option
                    key={grado.grado}
                    value={grado.grado}
                  >
                    {grado.nombre}
                  </option>
                )
              )}
          </select>
        </label>

        <label className='floating-label'>
          <span>
            Estatura (cm) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.alumno.estatura_cm}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: Number(e.target.value)
              })
            }
            min={50}
            max={250}
            name='estatura_cm'
            required
            type='number'
            placeholder='Estatura (cm) *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Peso (kg) <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.alumno.peso_kg}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: Number(e.target.value)
              })
            }
            min={1}
            max={200}
            name='peso_kg'
            required
            type='number'
            placeholder='Peso (kg) *'
            className='input input-md w-full'
          />
        </label>

        <label className='floating-label'>
          <span>
            Domicilio <span className='text-rose-600'>*</span>
          </span>
          <input
            value={form.domicilio.domicilio}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
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
            value={form.domicilio.colonia}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
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
            value={form.domicilio.codigo_postal}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
                field: e.target.name,
                value: e.target.value
              })
            }
            type='number'
            placeholder='C.P. *'
            min={100000}
            max={999999}
            name='codigo_postal'
            required
            pattern='[0-9]{6}'
            className='input input-md w-full'
          />
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Estado <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            name='estado'
            value={form.domicilio.estado}
            onChange={(e) => {
              // Actualizar estado
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
                field: e.target.name,
                value: e.target.value
              })

              // Actualizar ciudad con el primer municipio
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
                field: 'ciudad',
                value: getMunicipiosByEstado(e.target.value)[0]
              })
            }}
          >
            <option
              disabled
              value='0'
            >
              Escoge el estado...
            </option>
            {ESTADOS_ARRAY.map((estado) => (
              <option
                key={estado.id}
                value={estado.value}
              >
                {estado.label}
              </option>
            ))}
          </select>
        </label>

        <label className='select select-md w-full'>
          <span className='label'>
            Ciudad <span className='text-rose-600'>*</span>
          </span>
          <select
            required
            disabled={form.domicilio.estado === '0'}
            name='ciudad'
            value={form.domicilio.ciudad}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'domicilio',
                field: e.target.name,
                value: e.target.value
              })
            }}
          >
            <option
              disabled
              value='0'
            >
              Escoge el municipio...
            </option>
            {form.domicilio.estado !== '0' &&
              getMunicipiosByEstado(form.domicilio.estado).map((municipio) => {
                return (
                  <option
                    key={municipio}
                    value={municipio}
                  >
                    {municipio}
                  </option>
                )
              })}
          </select>
        </label>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Cuestiones Médicas</legend>
          <textarea
            value={form.alumno.nota_enfermedad}
            name='nota_enfermedad'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={0}
            maxLength={200}
            className='textarea h-24 w-full'
            placeholder='Indique si el alumno padece de alguna discapacidad, enfermedad crónica, alergias o algún tipo de tratamiento médico.'
          ></textarea>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Terapias</legend>
          <textarea
            value={form.alumno.nota_terapia}
            name='nota_terapia'
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                section: 'alumno',
                field: e.target.name,
                value: e.target.value
              })
            }
            minLength={0}
            maxLength={200}
            className='textarea h-24 w-full'
            placeholder='Indique si el alumno asiste a terapia, explique de que tipo: físico, psicológica u otra y por qué'
          ></textarea>
        </fieldset>
      </div>
    </div>
  )
})

FormAlumno.displayName = 'FormAlumno'

export default FormAlumno
