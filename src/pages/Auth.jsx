import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../helper/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth(){
  const {setUser, setIsAuthenticated} = useContext(UserContext)
  const [background,setBackground] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setBackground("/img/bckgrnd.jpg")
  },[])

  function GoogleAuth(){
    return(
      <GoogleLogin
                onSuccess={credentialResponse => {
                    const user = credentialResponse;
                    console.log(user)
                    setUser(credentialResponse)
                    setIsAuthenticated(true)
                    sessionStorage.setItem("bookingApp",JSON.stringify(user))
                    navigate("/dashboard")
                    
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                />
    )
  }

  return(
      <>
                  <GoogleAuth/>
      </>
  )
}
export default Auth
