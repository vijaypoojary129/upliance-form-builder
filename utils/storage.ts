import { FormSchema } from '../types'

const KEY = 'upliance_forms_v1'

export function saveForm(schema: FormSchema) {
  const all = getAllForms()
  all.unshift(schema)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getAllForms(): FormSchema[] {
  const s = localStorage.getItem(KEY)
  if (!s) return []
  try { return JSON.parse(s) as FormSchema[] } catch { return [] }
}

export function getForm(id: string): FormSchema | undefined {
  return getAllForms().find(f => f.id === id)
}
