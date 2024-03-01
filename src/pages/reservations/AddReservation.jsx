import { useContext, useState } from "react"
import {useImmer} from 'use-immer'
import Calendar from "react-calendar"
import NavbarComponent from "../../components/NavbarComponent"
import { ReservationContext } from "../../helper/ReservationContex"
const VITE_API_END_POINT = import.meta.env.VITE_API_END_POINT
// new reservation schema
// guest:{
//     guestId:{
//         type: Schema.Types.ObjectId,
//         require:true
//     },
//     firstName: {
//         type: String,
//         require: true
//     },
//     lastName:{
//         type: String,
//         require: true
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         lowercase: true,
//         validate:[isEmail, "Please enter a valid email"]
//     }
// },
// checkInDate:{
//     type: Date,
//     require: true
// },
// checkOutDate:{
//     type: Date,
//     require:true
// },
// roomDetails:[
//     {roomType: String,
//     numberOfGuests: {
//         adult: {
//             type: Number,
//             require: true
//         },
//         children: {
//             type: Number
//         }
//     } }
// ],
// totalCost:{
//     type: Number,
//     require: true
// },
// status:{
//     type: String,
//     default: ""
// },
// note: String
// },
// {
// timestamps: true
// }


function AddReservation(){
    const [guest,setGuest] = useState({})
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] = useState('')
    const [roomDetails, setRoomDetails] = useImmer([])
    const [totalCost, setTotalCost] = useState(0)
    const [email, setEmail] = useState('')
    const [selectedDates, setSelectedDates] = useState([]);
    const {reservations, setReservations} = useContext(ReservationContext)
    // Adding reservation

    async function addReservationResponse(){
        try{
            const addReservationResponse = await fetch(`${VITE_API_END_POINT}/api/reservations/new`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    guest: {
                        firstName,
                        lastName,
                        email,
                    },
                    checkInDate,
                    checkOutDate,
                    roomDetails,
                    totalCost: 2100,
                    note: "lorem"
    
                })
            })
            const body = await addReservationResponse.json()
            setReservations([...reservations,body])
            console.log(body)
            resetReservationDetails()
        }
        catch(err){
            console.log(err)
        }
    }
    function resetReservationDetails(){
        setCheckInDate('')
        setCheckOutDate('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setRoomDetails([])
        setTotalCost(0)
    }
    const handleDateChange = (date) => {
        // Check if the date is already selected
        const isDateSelected = selectedDates.includes(date);
    
        // If the date is already selected, remove it from the selection
        // If it's not selected, add it to the selection
        setSelectedDates((prevDates) =>
          isDateSelected
            ? prevDates.filter((d) => d !== date)
            : [...prevDates, date]
        );
      };

    function handleRoomDetailsCount(index,count, property){
        if(roomDetails[index]["numberOfGuests"][property] == 0 && count == -1){
            console.log(roomDetails)
            return
        }
        else{
            setRoomDetails(
                draft=>{
                    draft[index]['numberOfGuests'][property] = draft[index]['numberOfGuests'][property] + count
                }
            )
            console.log(roomDetails)
        }
    }
    function handleDeleteRoom(index){
        setRoomDetails(
            draft=>{
                draft.splice(index,1)
            }
        )
    }
    function RoomDetailsCounter(props){
        const {index, property,handler, icon} = props
        return(
            <div className="container d-flex flex-row counter-container align-items-center justify-content-between border-0 w-auto p-0 m-0" >
                
                <div className="d-flex flex-row text-center">
                    <h6 className="m-0 order-1">{property}</h6>
                    <span className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
                <div className="container d-flex flex-row border m-0 p-0 justify-content-between col-6" >
                    <button type="button"onClick={()=>handler(index,1, property)} className="btn btn-secondary room-details col-1">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </button>
                    <h5 className="m-0 col-5 bg-light d-flex align-items-center justify-content-center" >{roomDetails[index]["numberOfGuests"][property]}</h5>
                    <button type="button"onClick={()=>handler(index,-1, property)} className="btn btn-secondary room-details col-1">
                        <span className="material-symbols-outlined">
                            remove
                        </span>
                    </button>
                </div>
            </div>
        )
    }
    
    // roomdetails
    function roomDetailsArr(roomDetails){
        return(
            roomDetails.map((room, index)=>{
                return (
                    <div key={index} className="container border rounded col-2 p-2 m-1" >
                        <div className="d-flex flex-row justify-content-between">
                            <h4  data-room-index={index}>
                                Room :{index}
                            </h4>
                            <button type="button" className="btn" key={index} onClick={()=>handleDeleteRoom(index)}>
                            <span className="material-symbols-outlined" >
                                close
                            </span>
                            </button>
                        </div>
                        
                        <div className="d-flex flex-column">
                            <RoomDetailsCounter index={index} icon={'person'} property={"adult"} handler={handleRoomDetailsCount}/>
                            <RoomDetailsCounter index={index} icon={'child_care'} property={"children"} handler={handleRoomDetailsCount}/>
                            <RoomDetailsCounter index={index} icon={'pets'} property={"pets"} handler={handleRoomDetailsCount}/>
                            {/* adult counts */}
                        </div>
                    </div>   
            )
                
            })
        )
    }

    return(
        <>
            <NavbarComponent></NavbarComponent>
            <div className="container my-5 border-rounded p-3">
                <h1>Add new reservation</h1>
                <form>
                    <div className="row">
                        <div className="col-3">
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name"
                                id="first-name" 
                                value={firstName}
                                onChange={(e)=>
                                    setFirstName(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"
                                id="last-name" 
                                value={lastName}
                                onChange={(e)=>
                                    setLastName(e.target.value)
                                    }
                                />
                        </div>
                    </div>
                
                    <div className="my-3 col-3">
                    <input type="email" className="form-control" placeholder="Email"id="email" value={email} onChange={(e)=>
                            setEmail(e.target.value)
                    }/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="checkInDate"> Check-In / Check-Out
                            <Calendar id="checkInDate"value={selectedDates}
                            selectRange={true}
                            // minDate={new Date()}
                            onChange={(value,event) =>{
                                setSelectedDates(value)
                                setCheckInDate((value[0]))
                                setCheckOutDate(value[1])
                                }
                        }
                            />
                        </label>
                    </div>
                    <h2>Room Details</h2>
                    <div className="container-fluid d-flex flex-wrap justify-content-start border p-2" id="room-details-container">
                        {roomDetailsArr(roomDetails)}
                        {/* add button */}
                        <div className="col-1 m-1" id="add-room-button">
                            <button type="button" className="btn btn-outline-primary h-100 w-100"
                                onClick={()=>{
                                    setRoomDetails([...roomDetails,{
                                        numberOfGuests:{
                                            adult:0,children:0,pets:0
                                        },
                                    roomType: "lux"}])

                                    }}>
                                <span className="material-symbols-outlined" id="add-button-icon">
                                    add_box
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-success" onClick={addReservationResponse}> Add</button>
                    </div>
                </form>
            </div>
            
        </>
    )

}
export default AddReservation