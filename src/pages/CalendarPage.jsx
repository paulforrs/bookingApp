import Calendar from "react-calendar"
import NavbarComponent from "../components/NavbarComponent"
import { useState } from "react"

function CalendarPage(props){
  const {reservations} = props
  console.log(reservations)

  // test
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventRanges, setEventRanges] = useState(reservations.map(reservation=>{
    return {start: new Date(reservation.checkInDate), end: new Date(reservation.checkOutDate)}
  }));

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isEventDate = eventRanges.some(
        (range) => date >= range.start && date <= range.end
      );

      return isEventDate ? <div className="event-range-marker" /> : null;
    }

    return null;
  };

  // test
  return(
    <>
     <NavbarComponent/>
     
     <div className="container">
      <h1>Calendar</h1>
        <Calendar className='vw-100 h-100' id
          tileContent={({ activeStartDate, date, view }) => {
            return reservations.map((reservation, index)=>{
              const order = `order-${index} bg-success p-0 m-0`
              if(reservation.checkInDate <= date.toISOString() && reservation.checkOutDate >= date.toISOString()){
                
                return <div key={index} className={order} value={[reservation.checkInDate,reservation.checkOutDate]}>{reservation.guest.firstName}</div>
              }
            })
          }}

          tileClassName={({ activeStartDate, date, view }) => {
            return 'col-4 h-100 p-1'
          }
          }
          />

     </div>
    </>
  )
    }
  

export default CalendarPage