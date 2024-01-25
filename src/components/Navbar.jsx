import { Outlet, Link } from "react-router-dom";
function Navbar(){
    return (
    <>
        <ul>
            <li><Link to="/">Home</Link></li>
            
            <li><Link to="/bookings">Booking</Link></li>
            <li><Link to="/Add">Add Booking</Link></li>
        </ul>
    </>
    )
}
export default Navbar