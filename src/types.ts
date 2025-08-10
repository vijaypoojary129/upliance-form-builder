export type FieldType = 'text'|'number'|'textarea'|'select'|'radio'|'checkbox'|'date'

export interface ValidationRules {
  notEmpty?: boolean
  minLength?: number | null
  maxLength?: number | null
  email?: boolean
  passwordRule?: boolean
}

export interface FieldSchema {
  id: string
  type: FieldType
  label: string
  required: boolean
  defaultValue?: any
  options?: string[]
  validations?: ValidationRules
  derived?: {
    parentIds: string[]
    formula: string
  } | null
  order: number
}

export interface FormSchema {
  id: string
  name: string
  createdAt: string
  fields: FieldSchema[]
}
