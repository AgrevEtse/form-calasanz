// Esta función crea la fecha actual en string con formato 'YYYY-MM-DD'
export const createCurrentDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Esta función toma la fecha en formato 'YYYY-MM-DDTHH:mm:ss.sssZ' y la retorna en formato 'YYYY-MM-DD'
export const formatDate = (date) => {
  return date.split('T')[0]
}

export const createDateISOString = (date) => {
  return new Date(date).toISOString()
}
