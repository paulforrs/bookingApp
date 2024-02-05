
import './App.css'
// import Navbar from './components/Navbar'
// import CalendarComponent from './pages/Calendar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from './pages/Reservations';
import Home from './pages/Home'
import { useEffect } from 'react';

async function Test(){
  const dataRes = await fetch("localhost:3000/users",{

  })
  const data = await dataRes
  console.log(data)
}


function App() {
  useEffect(()=>{
    Test
  })
  return (
    <>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="reservations" element={<Reservations />} />
        </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
