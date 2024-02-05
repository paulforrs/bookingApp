function AddBooking(){
    // function onChangeCheckIn(){
    //     // change checkin
    // }
    // function onChangeCheckOut(){
    //     // change checkout
    // }
    // function onChangeGuestName(){
    //     // change guest name
    // }
    // function onChangeNumOfRooms(){

    // }
    // function onChangeNumofGuests(){
        
    // }
    return(
        <>
            <div>
                <label htmlFor="">
                    Guest:
                    <input type="guestName" />
                </label>
                
                <label htmlFor="">Check-in
                    <input type="date" />
                </label>
                <label htmlFor="">Check-out
                    <input type="date" />
                </label>
                <label htmlFor="numberOfGuests"> Number of Guests
                    <input type="number" name="numberOfGuests"/>
                </label>
                <label htmlFor="numberOfRooms"> Number of rooms
                    <input type="number" name="numberOfRooms"/>
                </label>
            </div>
        </>
    )
}

export default AddBooking