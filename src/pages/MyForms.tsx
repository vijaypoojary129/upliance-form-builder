import React, { useEffect, useState } from 'react'
import { getAllForms } from '../utils/storage'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MyForms() {
  const [forms, setForms] = useState<any[]>([])
  useEffect(()=> setForms(getAllForms()), [])
  if (!forms.length) return <div>No saved forms.</div>
  return (
    <div>
      <Typography variant='h5'>My Forms</Typography>
      <List>
        {forms.map(f=> (
          <ListItem key={f.id} component={Link} to={'/preview/'+f.id}>
            <ListItemText primary={f.name} secondary={new Date(f.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
