import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../helper/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
// import {jwt} from "jsonwebtoken"

const VITE_API_END_POINT = import.meta.env.VITE_API_END_POINT

function Auth(){
  const {setUser, setIsAuthenticated} = useContext(UserContext)
  const [background,setBackground] = useState(null)
  const navigate = useNavigate()

  async function upsertUserResponse(credential){
     try{
        const upsertUserRes = await fetch(`${VITE_API_END_POINT}/api/signin`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(credential)
        })
        const body = await upsertUserRes.json()
        console.log(body)
     }
     catch(err){
      console.log(err)
      navigate('/')
     }
  }

  useEffect(()=>{
    setBackground("/img/bckgrnd.jpg")
  },[])

  function GoogleAuth(){
    return(
      <>
      <div className='p-5' id='auth-page'>
        <div className='container col-6 bg-light p-5 rounded'>
          <h2>Log in</h2>
          <GoogleLogin
              onSuccess={credentialResponse => {
                  setIsAuthenticated(true)
                  const userCredential = jwtDecode(credentialResponse.credential)
                  const user = {
                    email: userCredential.email,
                    jti: userCredential.jti,
                    exp: userCredential.exp,
                    iat: userCredential.iat,
                    nbf: userCredential.nbf
                  }
                  setUser(userCredential)
                  upsertUserResponse(userCredential)
                  console.log(userCredential)
                  sessionStorage.setItem("user",JSON.stringify(user))
                  sessionStorage.setItem("userToken", )
                  navigate("/dashboard")
                  
              }}
              onError={() => {
                  console.log('Login Failed');
              }}
              useOneTap
              />
        </div>
      </div>
      
    </>
      
    )
  }

  return(
      <>
                  <GoogleAuth/>
      </>
  )
}
export default Auth
