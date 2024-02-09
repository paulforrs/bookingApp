import { redirect } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent"
import Reservations from "./Reservations";
import { useEffect, useState } from "react";
import ReservationDetail from "../components/ReservationDetail";

// import { GoogleLogin } from '@react-oauth/google';

function Dashboard(){
    const [reservations,setReservations] = useState([])

    async function getReservations(){
        try{
            const reservationRes = await fetch("https://booking-api-ywo5.onrender.com/api/reservations",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
               },
            })
            const body = await reservationRes.json()
            console.log(body)
            setReservations(body)
        }
        catch(err){
            console.log(err)
        }
    }
    function reservationArr(){
        reservations.map((reservation)=>{
            console.log(reservation._id)
            return (<ReservationDetail reservation={reservation} key={reservation._id}></ReservationDetail>)
        })
}

    useEffect(()=>{
        getReservations()
        
    },[])
    useEffect(()=>{
        reservationArr()
    },[reservations])

    return(
        <>
            <NavbarComponent></NavbarComponent>
            <h1>Your reservation</h1>
            {reservations.map((reservation)=>{
   
            return (<ReservationDetail reservation={reservation} key={reservation._id}></ReservationDetail>)
            })}
        </>
    )
}
export default Dashboard