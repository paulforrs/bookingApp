
import './App.css'
// import Navbar from './components/Navbar'
// import CalendarComponent from './pages/Calendar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from './pages/Reservations';
import Home from './pages/Home'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="bookings" element={<Reservations />} />
        </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
