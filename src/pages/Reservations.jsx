import Navbar from '../components/NavbarComponent'
// import AddBooking from '../components/ReservationDetails';
import ReservationDetails from '../components/ReservationDetail'
import { useEffect,useState } from 'react';


function Reservations(){

    // function reservationArr(){
    //     return(
    //         reservations.map(reservation=>{
    //             <ReservationDetails reservation={reservation}></ReservationDetails>
    //         })
    //     )
    // }

useEffect(()=>{
},[])

  const [isAdding, setIsAdding] = useState(false)
    function toggleAddOverlay(){
        setIsAdding(!isAdding)
        console.log('toggle')
    }
    return(
        <>
            <Navbar></Navbar>
            <h1>Bookings</h1>
            <button onClick={()=>toggleAddOverlay()}>Add</button>
            {/* {reservationArr()} */}
        </>
        
    )
}
export default Reservations