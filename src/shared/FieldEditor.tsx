import React from 'react'
import { FieldSchema } from '../types'
import { Box, TextField, Switch, FormControlLabel, Button } from '@mui/material'

export default function FieldEditor({ field, allFields, onChange }:{ field: FieldSchema, allFields: FieldSchema[], onChange:(f:FieldSchema)=>void }) {
  function update(partial:Partial<FieldSchema>) {
    onChange({...field, ...partial})
  }

  return (
    <Box sx={{ display:'flex', flexDirection:'column', gap:1 }}>
      <TextField label='Label' value={field.label} onChange={e=>update({label:e.target.value})} />
      <FormControlLabel control={<Switch checked={field.required} onChange={e=>update({required:e.target.checked})} />} label='Required' />
      <TextField label='Default value' value={field.defaultValue ?? ''} onChange={e=>update({defaultValue:e.target.value})} />
      {(field.type==='select' || field.type==='radio') && (
        <TextField label='Options (comma separated)' value={(field.options||[]).join(',')} onChange={e=>update({options:e.target.value.split(',').map(s=>s.trim())})} />
      )}
      <TextField label='Validations: minLength' type='number' value={field.validations?.minLength ?? ''} onChange={e=>update({validations:{...field.validations, minLength: e.target.value? Number(e.target.value): undefined}})} />
      <TextField label='Validations: maxLength' type='number' value={field.validations?.maxLength ?? ''} onChange={e=>update({validations:{...field.validations, maxLength: e.target.value? Number(e.target.value): undefined}})} />
      <FormControlLabel control={<Switch checked={!!field.validations?.email} onChange={e=>update({validations:{...field.validations, email: e.target.checked}})} />} label='Email format' />
      <FormControlLabel control={<Switch checked={!!field.validations?.passwordRule} onChange={e=>update({validations:{...field.validations, passwordRule: e.target.checked}})} />} label='Password rule' />

      <Box sx={{ mt:2 }}>
        <strong>Derived Field</strong>
        <div>
          <Button onClick={()=>{
            const parentIds = allFields.filter(f=>f.id!==field.id).slice(0,2).map(f=>f.id)
            onChange({...field, derived:{ parentIds, formula: field.derived?.formula || ''}})
          }}>Auto-select up to 2 parents</Button>
        </div>
        {field.derived && (
          <>
            <TextField label='Parents (comma ids)' fullWidth value={field.derived.parentIds.join(',')} onChange={e=>onChange({...field, derived:{...field.derived, parentIds: e.target.value.split(',').map(s=>s.trim())}})} />
            <TextField label='Formula (use p0,p1...)' fullWidth value={field.derived.formula} onChange={e=>onChange({...field, derived:{...field.derived, formula: e.target.value}})} />
            <div style={{ fontSize:12, marginTop:6 }}>Example: <code>p0 ? Math.floor((Date.now()-new Date(p0))/31557600000) : ''</code></div>
            <Button onClick={()=>onChange({...field, derived: null})}>Clear Derived</Button>
          </>
        )}
      </Box>
    </Box>
  )
}
