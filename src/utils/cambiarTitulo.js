export const cambiarTitulo = (titulo) => {
  if (!titulo) {
    document.title = '? - Calasanz Inscripciones'
    return
  }

  document.title = `${titulo} - Calasanz Inscripciones`
}
