import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, TextField, Typography, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio, Button } from '@mui/material'
import { getForm, getAllForms } from '../utils/storage'
import { FormSchema, FieldSchema } from '../types'
import { evalDerived } from '../utils/evalDerived'

export default function Preview() {
  const params = useParams()
  const [form, setForm] = useState<FormSchema|null>(null)
  const [values, setValues] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string,string>>({})

  useEffect(()=>{
    if (params.id) {
      const f = getForm(params.id)
      if (f) setForm(f)
    } else {
      const all = getAllForms()
      if (all.length) setForm(all[0])
    }
  }, [params.id])

  useEffect(()=>{
    if (!form) return
    const init: Record<string, any> = {}
    form.fields.forEach(f=> init[f.id] = f.defaultValue ?? '')
    setValues(init)
  }, [form])

  useEffect(()=>{
    if (!form) return
    // compute derived
    form.fields.forEach((f,i)=>{
      if (f.derived) {
        const parents = f.derived.parentIds.map(pid=> values[pid])
        const val = evalDerived(f.derived.formula, parents)
        setValues(prev=> ({...prev, [f.id]: val}))
      }
    })
  }, [values, form])

  if (!form) return <div>No form selected. Save a form in Create or visit My Forms.</div>

  function handleChange(id:string, v:any) {
    setValues(prev=> ({...prev, [id]: v}))
  }

  function validate(): boolean {
    const e: Record<string,string> = {}
    form.fields.forEach(f=>{
      const v = values[f.id]
      if (f.required && (!v && v!==0)) e[f.id] = 'Required'
      if (f.validations?.notEmpty && !v) e[f.id] = 'Cannot be empty'
      if (f.validations?.minLength && typeof v === 'string' && v.length < f.validations.minLength) e[f.id] = 'Too short'
      if (f.validations?.maxLength && typeof v === 'string' && v.length > f.validations.maxLength) e[f.id] = 'Too long'
      if (f.validations?.email && typeof v === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.id] = 'Invalid email'
      if (f.validations?.passwordRule && typeof v === 'string' && !(v.length>=8 && /[0-9]/.test(v))) e[f.id] = 'Password rule failed'
    })
    setErrors(e)
    return Object.keys(e).length===0
  }

  return (
    <Box>
      <Typography variant='h5'>{form.name}</Typography>
      <Typography variant='caption'>Created: {new Date(form.createdAt).toLocaleString()}</Typography>
      <Box sx={{ mt:2, display:'flex', flexDirection:'column', gap:2 }}>
        {form.fields.sort((a,b)=>a.order-b.order).map(f=>{
          const val = values[f.id] ?? ''
          return (
            <div key={f.id}>
              {f.type==='text' && <TextField label={f.label} value={val} onChange={e=>handleChange(f.id, e.target.value)} helperText={errors[f.id]} error={!!errors[f.id]} fullWidth />}
              {f.type==='number' && <TextField label={f.label} value={val} onChange={e=>handleChange(f.id, Number(e.target.value))} fullWidth />}
              {f.type==='textarea' && <TextField label={f.label} value={val} onChange={e=>handleChange(f.id, e.target.value)} multiline rows={4} fullWidth />}
              {f.type==='select' && <TextField select label={f.label} value={val} onChange={e=>handleChange(f.id, e.target.value)} helperText={errors[f.id]} error={!!errors[f.id]} fullWidth>
                {f.options?.map(o=> <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>}
              {f.type==='checkbox' && <FormControlLabel control={<Checkbox checked={!!val} onChange={e=>handleChange(f.id, e.target.checked)} />} label={f.label} />}
              {f.type==='radio' && <RadioGroup value={val} onChange={e=>handleChange(f.id, e.target.value)}>
                {f.options?.map(o=> <FormControlLabel key={o} value={o} control={<Radio />} label={o} />)}
              </RadioGroup>}
              {f.type==='date' && <TextField type='date' label={f.label} value={val} onChange={e=>handleChange(f.id, e.target.value)} InputLabelProps={{ shrink:true }} />}
            </div>
          )
        })}
        <Button variant='contained' onClick={()=>{ if (validate()) alert('Form valid!') }}>Submit</Button>
      </Box>
    </Box>
  )
}
