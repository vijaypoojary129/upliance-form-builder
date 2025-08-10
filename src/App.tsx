import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Create from './pages/Create'
import Preview from './pages/Preview'
import MyForms from './pages/MyForms'

export default function App() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>upliance - Form Builder</Typography>
          <Button color='inherit' component={Link} to='/create'>Create</Button>
          <Button color='inherit' component={Link} to='/preview'>Preview</Button>
          <Button color='inherit' component={Link} to='/myforms'>My Forms</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt:4 }}>
        <Routes>
          <Route path='/' element={<Create />} />
          <Route path='/create' element={<Create />} />
          <Route path='/preview/:id?' element={<Preview />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/myforms' element={<MyForms />} />
        </Routes>
      </Container>
    </div>
  )
}
