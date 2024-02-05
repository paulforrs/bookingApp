import Navbar from '../components/Navbar'
// import AddBooking from '../components/ReservationDetails';
import ReservationDetails from '../components/ReservationDetails'
import { useEffect,useState } from 'react';


function Bookings(){
    async function Test(){
        fetch("127.0.0.1:3000/users",{
      
        }).then((res)=>{
            res
        }).then(()=>console.log)
      }
      
    useEffect(()=>{
        Test()
      }),[]
  const [isAdding, setIsAdding] = useState(false)
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to fetch data from
//         const response = await fetch('YOUR_API_ENDPOINT');
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
    function toggleAddOverlay(){
        setIsAdding(!isAdding)
        console.log('toggle')
    }
    return(
        <>
            <Navbar></Navbar>
            <h1>Bookings</h1>
            <button onClick={()=>toggleAddOverlay()}>Add</button>
            {/* {isAdding ? <AddBooking/>:null} */}
            <ReservationDetails></ReservationDetails>
        </>
        
    )
}
export default Bookings