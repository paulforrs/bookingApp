import ReservationDetail from "./ReservationDetail"

function ReservationArray(props){
    const {reservations, setReservationDetail} = props
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
    )}
   export default ReservationArray