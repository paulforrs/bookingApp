import { useEffect, useState } from "react"
import Calendar from "react-calendar"
const VITE_API_END_POINT = import.meta.env.VITE_API_END_POINT

function ReservationOverlay(props){
    const {reservationDetail, showReservation} = props
    // states
    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')

    useEffect(()=>{
        if(Object.keys(reservationDetail).length != 0){
            setFirstName(reservationDetail.guest.firstName)
            setLastName(reservationDetail.guest.lastName)
            setEmail(reservationDetail.guest.email)
            setCheckInDate(reservationDetail.checkInDate)
            setCheckOutDate(reservationDetail.checkOutDate)
        }
    },[reservationDetail])
    
    const handleFirstNameOnchange=(e)=>{
        setFirstName(e.target.value)
    }
// Update reservations
    async function patchReservationResponse(){
        try{
            const patchReservationRes = await fetch(`https://booking-api-ywo5.onrender.com/api/reservations/${reservationDetail._id}`,{
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    guest:{
                        firstName,
                        lastName,
                        email,
                    },
                    checkInDate,
                    checkOutDate
                })
            })
            const body = await patchReservationRes.json()
            console.log(body)
        }
        catch(err){
            console.log(err)
        }
    }

    function EditOverlay(){
        return(
            <>
            <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                        <h1 className="modal-title fs-5" id="reservationModalLabel">Edit reservation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="first-name" className="col-form-label">First Name:</label>
                            <input type="text" className="form-control" id="first-name" 
                                value={firstName}
                                onChange={(e)=>
                                    {setFirstName(e.target.value)
                                    console.log(e.target.value)}
                                    }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last-name" className="col-form-label">Last Name</label>
                            <input type="text" className="form-control" id="last-name" 
                                value={lastName}
                                onChange={(e)=>
                                    setLastName(e.target.value)
                            }/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkInDate"> Check-In
                                <Calendar id="checkInDate"value={checkInDate} 
                                minDate={new Date()}
                                onChange={(value, event)=>{
                                    setCheckInDate(value)
                                }}
                                />
                            </label>
                            <label htmlFor="checkOutDate"> Check-Out
                                <Calendar id="checkOutDate" value={checkOutDate} onChange={(value, event)=>{
                                    setCheckOutDate(value)
                                }}/>
                            </label>
                            
                        </div>
                        {/* <CalendarModal/> */}
                        <div className="mb-3">
                            <label htmlFor="email" className="col-form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>{
                        setIsEditing(!isEditing)
                        patchReservationResponse()
                        console.log('save')
                    }}>Save</button>
                </div>
                </div>
            </div>
        </div>
            </>
        )
        
    }

    function ShowOverlay(){
        return(
            <>
                    <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reservationModalLabel">Reservation Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <div className="mb-3">
                                <h1>First Name: {firstName}</h1>
                            </div>
                            <div className="mb-3">
                                <h1>Last Name: {lastName}</h1>
                            </div>
                            <div className="mb-3">
                                <div>Check-in:{(new Date(checkInDate).toDateString())}</div>
                                <div>Check-out:{(new Date(checkOutDate).toDateString())}</div>
                            </div>
                            {/* <CalendarModal/> */}
                            <div className="mb-3">
                               <h1>{email}</h1>
                            </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{
                            setIsEditing(!isEditing)
                        }}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                    </div>
            </>
        )
    }

    return(
        <>
            <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reservationModalLabel">Edit reservation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="first-name" className="col-form-label">First Name:</label>
                                    <input type="text" className="form-control" id="first-name" 
                                        value={firstName}
                                        onChange={(e)=>
                                            {console.log(e.target.value)
                                            setFirstName(e.target.value)}
                                            }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last-name" className="col-form-label">Last Name</label>
                                    <input type="text" className="form-control" id="last-name" 
                                        value={lastName}
                                        onChange={(e)=>
                                            setLastName(e.target.value)
                                    }/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="checkInDate"> Check-In
                                        <Calendar id="checkInDate"value={checkInDate} 
                                        minDate={new Date()}
                                        onChange={(value, event)=>{
                                            setCheckInDate(value)
                                        }}
                                        />
                                    </label>
                                    <label htmlFor="checkOutDate"> Check-Out
                                        <Calendar id="checkOutDate" value={checkOutDate} onChange={(value, event)=>{
                                            setCheckOutDate(value)
                                        }}/>
                                    </label>
                                    
                                </div>
                                {/* <CalendarModal/> */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>{
                                setIsEditing(!isEditing)
                                patchReservationResponse()
                                console.log('save')
                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReservationOverlay