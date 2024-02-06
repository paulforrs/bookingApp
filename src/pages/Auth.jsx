import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';



function Auth(){
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
          console.log(credentialResponse);
        },
        onError: () => {
          console.log('Login Failed');
        },
      });
    return(
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                />
        </>
        
    )
    
}
export default Auth
