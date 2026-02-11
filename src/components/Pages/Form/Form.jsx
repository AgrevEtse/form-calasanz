import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

import useGlobalState from '@/context/useGlobalState'
import FormAlumno from '@/components/Pages/Form/FormAlumno'
import FormTutores from '@/components/Pages/Form/FormTutores'
import FormHermanos from '@/components/Pages/Form/FormHermanos'
import FormContacto from '@/components/Pages/Form/FormContacto'
import FormPago from '@/components/Pages/Form/FormPago'
import FormConfirm from '@/components/Pages/Form/FormConfirm'
import FormEnd from '@/components/Pages/Form/FormEnd'

import { postForm, postReiscripcion } from '@/utils/postForm'

const Form = () => {
  const { curp, form, currentStep, setCurrentStep, isReinscripcion } =
    useGlobalState()
  const stepRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const components = [
    FormAlumno,
    FormTutores,
    FormHermanos,
    FormContacto,
    FormPago,
    FormConfirm,
    FormEnd
  ]

  const CurrentComponent = components[currentStep]

  // Hacer Scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Obtener siguiente paso del formulario
  const nextStep = async () => {
    setIsLoading(true)
    try {
      await stepRef.current?.validate?.() // Primero valida los datos con el schema

      scrollToTop() // Scroll hacia arriba
      setCurrentStep((prev) => prev + 1) // Avanza
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message) // El stepRef.current?.validate?.() lanza un error si los datos son incorrectos
      setIsLoading(false)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    scrollToTop()
  }

  const enviarForm = async () => {
    setIsLoading(true)
    try {
      await stepRef.current?.validate?.()

      if (isReinscripcion) {
        await postReiscripcion({ curp, form })
      } else {
        await postForm({ curp, form })
      }

      scrollToTop()
      setCurrentStep((prev) => prev + 1)
      setIsLoading(false)
      toast.success('Datos guardados exitosamente')
    } catch (error) {
      toast.error(`${error.message}`)
      setCurrentStep(0)
      setIsLoading(false)
    }
  }

  return (
    <div className='container my-16 h-full'>
      {currentStep !== 6 && ( // Si no es el último paso
        <h3 className='mb-6 text-center text-4xl font-bold'>
          Registro del Alumno
        </h3>
      )}

      <CurrentComponent ref={stepRef} />

      {currentStep !== 6 && (
        <div className='mt-4 flex justify-between'>
          {currentStep > 0 && ( // Mostar botón de Anterior a partir de la seunda página del form
            <button
              onClick={prevStep}
              disabled={isLoading}
              className='btn btn-error mr-auto ml-4 rounded px-4 py-2 font-bold'
            >
              Anterior
            </button>
          )}

          {currentStep < components.length - 2 ? ( // Mostrar botón Siguiente hasta que sea la penúltima página
            <button
              onClick={nextStep}
              disabled={isLoading}
              className='btn btn-info mr-4 ml-auto rounded px-4 py-2 font-bold'
            >
              {isLoading && (
                <span className='loading loading-spinner loading-sm'></span>
              )}
              {!isLoading && 'Siguiente'}
            </button>
          ) : (
            // Mostrar botón Enviar si es la última página
            <button
              onClick={enviarForm}
              disabled={isLoading}
              className='btn btn-success mr-4 ml-auto rounded px-4 py-2 font-bold'
            >
              {isLoading && (
                <span className='loading loading-spinner loading-sm'></span>
              )}
              {!isLoading && 'Enviar'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Form
