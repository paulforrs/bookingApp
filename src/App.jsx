
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from './pages/Reservations';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
// import { useContext, useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorPage from './pages/ErrorPage';
// import { UserContext } from './context/ContextCreate';
import.meta.env.BASE_URL

// ENV
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID

// Context
// const UserContext()
function App() {
  // const navigate = useNavigate()
  function PrivateRoute(){
    return(
      <>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/reservations" element={<Reservations />} />
      </>
    )
  }
  return (
    <>
    
      <BrowserRouter>
        <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="*" element={<ErrorPage />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    
    </>
  )
}

export default App
