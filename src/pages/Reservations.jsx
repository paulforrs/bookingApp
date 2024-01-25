import Navbar from '../components/Navbar'
import ReservationDetails from '../components/ReservationDetails'
import { useEffect,useState } from 'react';

function Bookings(){

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to fetch data from
        const response = await fetch('YOUR_API_ENDPOINT');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
    return(
        <>
            <Navbar></Navbar>
            <h1>Bookings</h1>
            <ReservationDetails></ReservationDetails>
        </>
        
    )
}
export default Bookings