import React, {useEffect} from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import {Button} from '@material-ui/core'


const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/dashboard");
      });
  };

  const signInWithFacebook = () => {
    firebase
      .login({
        provider: "facebook",
        type: "popup",
      })
      .then(() => {
        history.push("/dashboard");
      });
  };

  useEffect(()=>{firebase.logout()}, [])

  
  return (
    <div style={{marginTop: '200px'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <h1 style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>Sign In</h1>
          <Button variant="contained" color="primary" style={{width: '300px', margin: '10px'}} onClick={(event) => {
              event.preventDefault();
              signInWithGoogle();
              }}>
              Sign In with Google
          </Button>
          
          {/* <Button variant="contained" color="primary" style={{width: '300px', margin: '10px'}}
            onClick={(event) => {
              event.preventDefault();
              signInWithFacebook();
            }}
          >
            Sign In with Facebook
          </Button> */}
      </div>
    </div>
  );
};
export default SignIn;