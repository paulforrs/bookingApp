
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Reservations from './pages/Reservations';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorPage from './pages/ErrorPage';
import { UserContext } from './helper/Context';
// import { UserContext } from './context/ContextCreate';
import.meta.env.BASE_URL

// ENV
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID

// Context
// const UserContext()
function App() {
  const [user,setUser] = useState({})
  const navigate= useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function getUser(){
    setUser(JSON.parse(sessionStorage.getItem("bookingApp")) || {})
  }

  useEffect(()=>{
    getUser()
   },[])

  useEffect(()=>{
    if(!(Object.keys(user).length === 0)){
    setIsAuthenticated(true)
    navigate('/dashboard')
  }else{
    setIsAuthenticated(false)
  }
  },[user])

  function PrivateRoute({children}){
    useEffect(() => {
      if (!isAuthenticated) {
        console.log('auth')
        navigate("/auth");
      }
    }, []);
    return (
      <>
        {children}
      </>
    );
  }
  return (
    <>
    <UserContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
      {/* <BrowserRouter> */}
          <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
            <Routes>
              <Route path="/" element={<Auth />}></Route>
              <Route path="auth" element={<Auth />}></Route>
              <Route path="*" element={<ErrorPage />} />
              <Route path="dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
              <Route path="reservations" element={<PrivateRoute><Reservations/></PrivateRoute>}></Route>
            </Routes>
          </GoogleOAuthProvider>
        {/* </BrowserRouter> */}
    </UserContext.Provider>
      
    
    </>
  )
}

export default App
