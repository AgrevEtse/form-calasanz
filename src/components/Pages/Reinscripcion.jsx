import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import { formatDate } from '@/utils/dateFormater'
import { getDataByIdEscolaridad } from '@/utils/escolaridadGradosHelpers'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const API_URL = import.meta.env.VITE_API_URL

const Reinscripcion = () => {
  const navigate = useNavigate()

  const {
    curp,
    setCurp,
    maternoPapa,
    setMaternoPapa,
    maternoMama,
    setMaternoMama,
    dispatch,
    setIsReinscripcion
  } = useGlobalState()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    cambiarTitulo('Reinscripción')
  }, [])

  const fetchDataFromCurp = async () => {
    if (curp === '' || curp.length < 18) {
      toast.error('Ingresa el CURP correctamente')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/inscripcion/checkCurp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          curp: curp,
          materno_papa: maternoPapa,
          materno_mama: maternoMama
        })
      })

      const data = await res.json()

      // CURP Baneado
      if (data.statusCode === 400 && data.message) {
        confirm(data.message)
        //toast.error(data.message)
        return
      }

      // CURP Ya inscrito
      if (data.inscrito_ciclo_actual && data.message) {
        toast.error(data.message)
        return
      }

      // CURP Sin registro previo
      if (
        !data.inscrito_ciclo_actual &&
        data.message &&
        data.statusCode !== 200
      ) {
        toast.error('es este? ' + data.message)
        return
      }

      const resAlumno = await fetch(`${API_URL}/inscripcion/fromcurp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          curp: curp,
          materno_papa: maternoPapa,
          materno_mama: maternoMama
        })
      })

      const dataAlumno = await resAlumno.json()

      // REINSCRIPCION
      dispatch({
        type: 'SET_SECTION',
        property: 'alumno',
        value: dataAlumno.data.alumno
      })

      // Actualizar fecha nacimiento
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'alumno',
        field: 'fecha_nacimiento',
        value: formatDate(dataAlumno.data.alumno.fecha_nacimiento)
      })

      // Actualizar lateralidad
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'alumno',
        field: 'es_diestro',
        value: dataAlumno.data.alumno.fecha_nacimiento === 1 ? true : false
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'domicilio',
        value: dataAlumno.data.domicilio
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'escuela',
        value: dataAlumno.data.escuela[0]
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'inscripcion',
        value: dataAlumno.data.inscripcion[0]
      })

      // Actualizar escolaridad
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'inscripcion',
        field: 'escolaridad',
        value: getDataByIdEscolaridad(
          dataAlumno.data.inscripcion[0].id_escolaridad
        ).escolaridad
      })

      // Actualizar grado
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'inscripcion',
        field: 'grado',
        value: getDataByIdEscolaridad(
          dataAlumno.data.inscripcion[0].id_escolaridad
        ).grado
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'persona_pago',
        value: dataAlumno.data.persona_pagos[0]
      })

      // Actualizar factura
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'persona_pago',
        field: 'factura',
        value: dataAlumno.data.persona_pagos[0].factura === 1 ? true : false
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'tutor_1',
        value: dataAlumno.data.tutor_1[0]
      })

      // Actualizar fecha nacimiento
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'tutor_1',
        field: 'fecha_nacimiento',
        value: formatDate(dataAlumno.data.tutor_1[0].fecha_nacimiento)
      })

      dispatch({
        type: 'SET_SECTION',
        property: 'tutor_2',
        value: dataAlumno.data.tutor_2[0]
      })

      // Actualizar fecha nacimiento
      dispatch({
        type: 'UPDATE_FIELD',
        section: 'tutor_2',
        field: 'fecha_nacimiento',
        value: formatDate(dataAlumno.data.tutor_1[0].fecha_nacimiento)
      })

      // Actualizar solo la cantidad de hermanos que existen, por ejemplo si solo regresa dos hermanos, solo actualizar esas posiciones, mientras que las faltantes se quedan por default
      dataAlumno.data.hermanos.forEach((hermano, i) => {
        dispatch({
          type: 'SET_ARRAY_ITEM',
          arrayName: 'hermanos',
          index: i,
          value: hermano
        })
      })

      // Actualizar solo la cantidad de contactos que existen, por ejemplo si solo regresa dos contactos, solo actualizar esas posiciones, mientras que las faltantes se quedan por default
      // Creo que no es necesario hacer esto en contactos, porque todos los contactos son obligatorios
      dataAlumno.data.contactos.forEach((contacto, i) => {
        dispatch({
          type: 'SET_ARRAY_ITEM',
          arrayName: 'contactos',
          index: i,
          value: contacto
        })
      })

      setIsReinscripcion(true)

      toast.success('Datos del alumno encontrados')
      navigate('/form')
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-base-200 text-base-content container my-16 flex h-full flex-col items-center justify-center rounded-md p-6 shadow-2xl'>
      <h2 className='mb-10 text-center text-5xl font-bold'>Reinscripción</h2>
      <h3 className='mb-4 text-center text-3xl'>Ingresa la CURP del alumno</h3>
      <h4 className='mb-4 text-center text-xl'>
        Si cambió la información, favor de ir a control escolar para
        actualizarla
      </h4>

      <div className='space-y-4'>
        <label className='floating-label w-2xs'>
          <span>CURP</span>
          <input
            type='text'
            placeholder='CURP'
            className='input input-md border-base-content'
            value={curp}
            onChange={(e) => setCurp(e.target.value.trim())}
          />
        </label>

        <label className='floating-label w-2xs'>
          <span>Apellido Materno del Papá</span>
          <input
            type='text'
            placeholder='Apellido Materno del Papá'
            className='input input-md border-base-content'
            value={maternoPapa}
            onChange={(e) => setMaternoPapa(e.target.value.trim())}
          />
        </label>

        <label className='floating-label w-2xs'>
          <span>Apellido Materno de la Mamá</span>
          <input
            type='text'
            placeholder='Apellido Materno de la Mamá'
            className='input input-md border-base-content'
            value={maternoMama}
            onChange={(e) => setMaternoMama(e.target.value.trim())}
          />
        </label>
      </div>

      <div className='mt-6 flex flex-col items-center justify-center'>
        <button
          className='btn btn-info'
          onClick={fetchDataFromCurp}
          disabled={isLoading || !curp || !maternoPapa || !maternoMama}
        >
          {isLoading && (
            <span className='loading loading-spinner loading-sm'></span>
          )}
          {!isLoading && 'Buscar'}
        </button>
      </div>
    </div>
  )
}

export default Reinscripcion
