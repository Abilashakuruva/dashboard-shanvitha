import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'
import NavBar from './vendorDashboard/components/NavBar'
import Login from './vendorDashboard/components/forms/Login'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/> }/>      


      </Routes>  
</div>
  )
}

export default App
