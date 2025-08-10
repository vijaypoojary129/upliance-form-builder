import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Box, Button, TextField, MenuItem, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { FieldSchema, FieldType, FormSchema } from '../types'
import FieldEditor from '../shared/FieldEditor'
import { saveForm } from '../utils/storage'

export default function Create() {
  const [fields, setFields] = useState<FieldSchema[]>([])
  const [selected, setSelected] = useState<FieldSchema | null>(null)
  const [nameDialogOpen, setNameDialogOpen] = useState(false)
  const [formName, setFormName] = useState('')

  function addField(type: FieldType) {
    const f: FieldSchema = {
      id: uuid(),
      type,
      label: type.toUpperCase(),
      required: false,
      defaultValue: '',
      options: type==='select'||type==='radio' ? ['Option 1','Option 2'] : undefined,
      validations: {},
      derived: null,
      order: fields.length
    }
    setFields(prev=>[...prev, f])
    setSelected(f)
  }

  function updateField(updated: FieldSchema) {
    setFields(prev=>prev.map(p=>p.id===updated.id?updated:p))
    setSelected(updated)
  }

  function removeField(id: string) {
    setFields(prev=>prev.filter(p=>p.id!==id).map((f,i)=>({...f,order:i})))
    setSelected(null)
  }

  function save() {
    setNameDialogOpen(true)
  }

  function confirmSave() {
    if (!formName) return
    const schema: FormSchema = {
      id: uuid(),
      name: formName,
      createdAt: new Date().toISOString(),
      fields
    }
    saveForm(schema)
    setNameDialogOpen(false)
    setFormName('')
    alert('Form saved to localStorage! Visit My Forms.')
  }

  return (
    <Box display='flex' gap={2}>
      <Paper sx={{ p:2, flex:1 }}>
        <Typography variant='h6'>Add Fields</Typography>
        <Box sx={{ mt:2, display:'flex', gap:1, flexWrap:'wrap' }}>
          {['text','number','textarea','select','radio','checkbox','date'].map(t=>(
            <Button key={t} variant='outlined' onClick={()=>addField(t as FieldType)}>{t}</Button>
          ))}
        </Box>
        <Box sx={{ mt:3 }}>
          {fields.map(f=>(
            <Paper key={f.id} sx={{ p:1, my:1 }} onClick={()=>setSelected(f)}>
              <Typography>{f.label} ({f.type})</Typography>
              <Button size='small' onClick={()=>removeField(f.id)}>Delete</Button>
            </Paper>
          ))}
        </Box>
        <Button variant='contained' sx={{ mt:2 }} onClick={save}>Save Form</Button>
      </Paper>
      <Paper sx={{ p:2, width:420 }}>
        <Typography variant='h6'>Field Editor</Typography>
        {selected ? 
          <FieldEditor field={selected} allFields={fields} onChange={updateField} /> :
          <Typography sx={{ mt:2 }}>Select a field to configure</Typography>
        }
      </Paper>

      <Dialog open={nameDialogOpen} onClose={()=>setNameDialogOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField label='Form name' fullWidth value={formName} onChange={e=>setFormName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setNameDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
