import { redirect } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent"
import Reservations from "./reservations/Reservations";
import { useContext, useEffect, useState } from "react";
import ReservationDetail from "../components/ReservationDetail";
import ReservationOverlay from "../components/ReservationOverlay";
import { ReservationContext } from "../helper/ReservationContex";

const VITE_API_END_POINT = import.meta.env.VITE_API_END_POINT
const VITE_GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY
// import { GoogleLogin } from '@react-oauth/google';
function Dashboard(props){
    const {reservations} = props
    const [reservationDetail,setReservationDetail] = useState({})
    const [reservationIndex, setReservationIndex] = useState()
    const [showReservation, setShowReservation] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    // const {reservations, setReservations} = useContext(ReservationContext)

    async function fetchGoogleHoliday(){
        const googleHolidayResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/en.philippines%23holiday%40group.v.calendar.google.com/events?key=${VITE_GOOGLE_KEY}`)
        const body = await googleHolidayResponse.json()
        console.log(body)
    }
    function reservationArr(reservations){
        return(
            reservations.map((reservation, index)=>{
                return (
                <ReservationDetail
                    reservation={reservation}
                    key={index}
                    setReservationDetail = {setReservationDetail}
                    >
                </ReservationDetail>)
            })
        )
        
    }
    function PlaceHolder(){
        return(
            <>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            </>
        )
    }
    useEffect(()=>{
        console.log(isLoading)
        if(reservations.length == 0){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    },[reservations])
    useEffect(()=>{
        fetchGoogleHoliday()
    },[])

    if(isLoading){
        return(
            <>
                <NavbarComponent></NavbarComponent>
                <PlaceHolder/>
            </>
        )
    }
    return(
        <>
            <NavbarComponent></NavbarComponent>
            <div className="container-fluid">
                <h1>Your reservation</h1>
                
                {reservationArr(reservations)}

                {!showReservation && <ReservationOverlay reservationDetail={reservationDetail}></ReservationOverlay>}
                
            </div>
            
        </>
    )
}
export default Dashboard