import { redirect } from "react-router-dom";
import Navbar from "../components/Navbar"
// import { GoogleLogin } from '@react-oauth/google';

function Dashboard(){
    return(
        <>
            <Navbar></Navbar>
            <h1>Home</h1>
            <button onClick={()=>{
                console.log("signin");
                redirect('signin')
            }}></button>
        </>
    )
}
export default Dashboard