import { useEffect } from "react"


function ReservationDetail(props){
    const {reservation, setReservationDetail} = props
    const firstName = reservation.guest.firstName
    const lastName = reservation.guest.lastName
    const checkInDate = (new Date(reservation.checkInDate)).toDateString()
    const checkOutDate = (new Date(reservation.checkOutDate)).toDateString()
    const status =()=>{
        const dateNow = Date.now()
        const checkInEpoch = (new Date(reservation.checkInDate)).getTime()
        const checkOutEpoch = (new Date(reservation.checkOutDate)).getTime()
        if(checkInEpoch<dateNow && checkOutEpoch>dateNow){
            return "Currently Hosting"
        }
        else if(checkInEpoch<dateNow && checkOutEpoch<dateNow){
            return "Past Guest"
        }
        
    }
    function setReservationDetails(){
        setReservationDetail(reservation)
    }
    // room details
    function roomDetailsArr(){
        return reservation.roomDetails.map((room, index)=>{
            return(
                <>
                    <div className="card w-25 p-1 me-1" key={index}>
                        <div className="card-body m-0 p-0">
                            <h6 className="card-title">{room.roomType}</h6>
                           
                            <ul className="list-group list-group-horizontal">
                                {room.numberOfGuests.adult && 
                                    <li className="list-group-item p-1" >
                                        <span className="material-symbols-outlined">
                                            person
                                        </span>
                                        {room.numberOfGuests.adult}
                                    </li>
                                }
                                
                                {room.numberOfGuests.children &&
                                    <li className="list-group-item p-1" >
                                        <span className="material-symbols-outlined">
                                            child_care
                                        </span>
                                    {room.numberOfGuests.children}
                                    </li>
                                }
                                {room.numberOfGuests.pets &&
                                    <li className="list-group-item p-1">
                                        <span className="material-symbols-outlined">
                                            pets
                                        </span>
                                    {room.numberOfGuests.pets}
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
               
                </>
            )
        })
    }
    useEffect(()=>{
        // roomDetailsArr(reservation)
    },[])
    return(
        <>
            <div className="card w-50 m-1" key={reservation._id} data-bs-toggle="modal" data-bs-target="#reservationModal" onClick={()=>setReservationDetails()}>
                <div className="card-body m-1 p-1">
                    <h5 className="card-title">{firstName} {lastName}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{status()}</h6>

                    {/* Checkin and checkout */}
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item mx-0">Check-in: {checkInDate}</li>
                        <li className="list-group-item">Check-Out: {checkOutDate}</li>
                    </ul>

                    <div className="container row align-items-start my-2">
                        {roomDetailsArr()} 
                    </div>
                    <p className="card-text"><small className="text-body-secondary">last updated: {(new Date(reservation.updatedAt)).toUTCString()}</small></p>
                </div>
            </div>        

        </>
    )
}

export default ReservationDetail