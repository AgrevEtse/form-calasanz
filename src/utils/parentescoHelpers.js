import parentescoJSON from '@/assets/json/parentesco.json'

export const PARENTESCO_ARRAY = parentescoJSON.map(({ id, nombre }) => ({
  id,
  value: id,
  label: nombre
}))
