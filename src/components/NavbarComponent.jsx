import { Link,useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { useContext } from "react";
import { UserContext } from "../helper/Context";


function NavbarComponent(){
    const {setUser}=useContext(UserContext)
    const navigate = useNavigate()
    function logOut(){
        googleLogout()
        sessionStorage.clear()
        setUser({})
        navigate("/")
        console.log("logout")
    }
    return (
    <>
        {/* <ul classNameName="nav">
            <li classNameName="nav-item"><Link to="/dashboard">Home</Link></li>
            
            <li classNameName="nav-item"><Link to="/reservations">Reservations</Link></li>
            <li classNameName="nav-item"><Link to="/Add">Add Booking</Link></li>
            <button classNameName="nav-item" onClick={()=>logOut()}>Logout</button>
        </ul> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Basilia Guesthouse</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={()=>navigate('/dashboard')}>Home</a>
              </li>
              <li className="nav-item" onClick={()=>navigate('/calendar')}>
                <a className="nav-link" >Calendar</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Reservations
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={()=>navigate('/reservations')}>Reservations</a></li>
                  <li><a className="dropdown-item" onClick={()=>navigate('/reservations/new')}>Add new</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item disabled" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
              <button className="btn btn-outline-danger" onClick={logOut}>Log Out</button>
          </div>
        </div>
      </nav>

    </>
    )
}
export default NavbarComponent