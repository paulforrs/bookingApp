

function ReservationDetail(props){
    const {reservation} = props
    const guestName = reservation.guest.firstName
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
    console.log(status())
    return(
        <>
            <div className="container border m-2 rounded-4">
                <h1>Status:{status()}</h1>
                <h1>{guestName}</h1>
                <h4><p>Check-in</p>{checkInDate}</h4>
                <h4><p>Check-in</p>{checkOutDate}</h4>
            </div>
        </>
    )
}

export default ReservationDetail