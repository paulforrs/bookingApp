import NavbarComponent from '../../components/NavbarComponent'
// import AddBooking from '../components/ReservationDetails';
import { useContext, useEffect,useState } from 'react';
import { ReservationContext } from '../../helper/ReservationContex';
import ReservationDetail from '../../components/ReservationDetail';
import ReservationArray from '../../components/ReservationArray';


function Reservations(props){
    const {currentlyHosting, pastGuest, upcoming, all, cancelled} = props
    const [reservationDetail,setReservationDetail] = useState({})
    const [reservations, setReservations] = useState([])
    const [active, setActive] = useState(1)
    // console.log(currentlyHosting, pastGuest, upcoming)
    const navItems = ['All   ', 'Currently Hosting', 'Upcoming','Past guests', 'Cancelled']
    function setActiveTab(e){
        setActive(e.target.id)
    }
    // function navItemsArr(navItems, active){
    //     return navItems.map((navItem, index) =>{
    //         if(active == index){
    //             return(
    //                 <>
    //                     <li className="nav-item active" id='reservations-all' key={index} onClick={()=>setActive(index)}>
    //                         <a className="nav-link" aria-current="page" href="#">{navItem}</a>
    //                     </li>
    //                 </>
    //             )
    //         }
    //         return(
    //             <>
    //                 <li className="nav-item" id='reservations-all' key={index}>
    //                     <a className="nav-link" aria-current="page" href="#">{navItem}</a>
    //                 </li>
    //             </>
    //         )
    //     })
    // }

    return(
        <>
            <NavbarComponent></NavbarComponent>
            <h1>Reservations</h1>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                All
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="current-tab" data-bs-toggle="tab" data-bs-target="#current-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                Currently Hosting
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                                Upcoming
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">
                                Past Guests
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="cancelled-tab" data-bs-toggle="tab" data-bs-target="#cancelled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">
                                Cancelled
                            </button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="all-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <ReservationArray reservations={all}></ReservationArray>
                    </div>
                    <div className="tab-pane fade show" id="current-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <ReservationArray reservations={currentlyHosting}></ReservationArray>
                    </div>
                    <div className="tab-pane fade" id="upcoming-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                        <ReservationArray reservations={upcoming}></ReservationArray>
                    </div>
                    <div className="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                        <ReservationArray reservations={pastGuest}></ReservationArray>
                    </div>
                    <div className="tab-pane fade" id="cancelled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">
                        <ReservationArray reservations={cancelled}></ReservationArray>
                    </div>
                </div>
            </div>
        </>
        
    )
}
export default Reservations