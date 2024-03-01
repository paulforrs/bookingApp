
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Reservations from './pages/reservations/Reservations';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorPage from './pages/ErrorPage';
import { UserContext } from './helper/Context';
import AddReservation from './pages/reservations/AddReservation';
import { ReservationContext } from './helper/ReservationContex';
import CalendarPage from './pages/CalendarPage';
// import { UserContext } from './context/ContextCreate';
import.meta.env.BASE_URL

// ENV
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const VITE_API_END_POINT = import.meta.env.VITE_API_END_POINT
// Context
// const UserContext()
function App() {
  const navigate= useNavigate()
  const [user,setUser] = useState({})
  const [reservations,setReservations] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // reservation status
  const [currentlyHosting, setCurrentlyHosting] = useState([])
  const [pastGuest, setPastGuest] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [cancelled, setCancelled] = useState([])
  
// sort reservations
  function sortReservationStatus(reservations){
    console.log(currentlyHosting)
      reservations.map(reservation=>{
          const checkInDateTime = (new Date((new Date(reservation.checkInDate)).toDateString())).getTime()
          const checkOutDateTime = (new Date((new Date(reservation.checkOutDate)).toDateString())).getTime()
          const dateNowTime = (new Date((new Date()).toDateString())).getTime()
          // console.log((new Date(checkInDate)).getTime(), (new Date(checkOutDate)).getTime(), (new Date(dateNow)).getTime())
          // console.log( dateNow, checkInDate, checkOutDate)
          if(dateNowTime >= checkInDateTime && dateNowTime < checkOutDateTime){
            reservation.status = "Currently Hosting"
            currentlyHosting.push(reservation)
            setCurrentlyHosting(currentlyHosting)
          }
          else if(dateNowTime > checkInDateTime && dateNowTime> checkOutDateTime){
            // console.log('past guest', reservation)
            reservation.status = "Past Guest"
            pastGuest.push(reservation)
            setPastGuest(pastGuest)
          }
          else if(dateNowTime < checkInDateTime){
            // console.log("upcoming", reservation)
            reservation.status = "Upcoming"
            upcoming.push(reservation)
            setUpcoming(upcoming)
            
          }
          // if(reservation.status === "Cancelled"){
          //   setCancelled([...cancelled, reservation])
          //   return
          // }
          // if(dateNow> checkInDate){
          //   if(dateNow < checkOutDate){
          //     reservation.status = "Currently Hosting"
          //     setCurrentlyHosting([...currentlyHosting, reservation])
          //     console.log(currentlyHosting)
          //   }else{
          //     reservation.status = "Past Guest"
          //     setPastGuest([...pastGuest,reservation])
          //     console.log(pastGuest)
          //   }
          // }else{
          //   reservation.status = "Upcoming"
          //   setUpcoming([...upcoming, reservation])
          // }
      })
  }

  function getUser(){
    const sessionStorageUser = JSON.parse(sessionStorage.getItem("user")) || {}
    setUser(sessionStorageUser)
    if(!sessionStorageUser || sessionStorageUser.exp < (new Date()).getTime()){
      navigate('/')
    }
  }
  async function getReservations(){
    try{
        const reservationRes = await fetch(`${VITE_API_END_POINT}/api/reservations`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
           },
        })
        const body = await reservationRes.json()
        setReservations(body)
        setCancelled([])
        setCurrentlyHosting([])
        setPastGuest([])
        setUpcoming([])
    }
    catch(err){
        console.log(err)
    }
  }
  useEffect(()=>{
    getUser()
   },[])
  useEffect(()=>{

    sortReservationStatus(reservations)
  },[reservations])

  function PrivateRoute({children}){
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/auth");
      }
    }, []);
    return (
      <>
        {children}
      </>
    );
  }

  useEffect(()=>{
    if(!(Object.keys(user).length === 0)){
      setIsAuthenticated(true)
      getReservations()
      navigate('/dashboard')
    }else{
      setIsAuthenticated(false)
    }
  },[user])

  return (
    <>
    <UserContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
    <ReservationContext.Provider value={{reservations, setReservations}}>
      {/* <BrowserRouter> */}
      <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
            <Routes>
              <Route path="/" element={<Auth />}></Route>
              <Route path="auth" element={<Auth />}></Route>
              <Route path="*" element={<ErrorPage />} />
              <Route path="dashboard" element={<PrivateRoute><Dashboard reservations={reservations}/></PrivateRoute>}></Route>
              <Route path="reservations" 
                element={
                  <PrivateRoute>
                    <Reservations currentlyHosting={currentlyHosting} pastGuest={pastGuest} upcoming={upcoming} all={reservations} cancelled={cancelled}/>
                  </PrivateRoute>}>
                </Route>
              <Route path="reservations/new" element={<PrivateRoute><AddReservation/></PrivateRoute>}></Route>
              <Route path="calendar" element={<PrivateRoute><CalendarPage reservations={reservations}/></PrivateRoute>}></Route>
            </Routes>
          </GoogleOAuthProvider>
        {/* </BrowserRouter> */}
    </ReservationContext.Provider>
    </UserContext.Provider>
      
    
    </>
  )
}

export default App
