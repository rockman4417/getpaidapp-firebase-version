import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
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
        history.push("/clients");
      });
  };

  const signInWithFacebook = () => {
    firebase
      .login({
        provider: "facebook",
        type: "popup",
      })
      .then(() => {
        history.push("/clients");
      });
  };

  
  return (
    <div style={{marginTop: '200px'}}>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithFacebook();
        }}
      >
        Sign In with Facebook
      </button>
    </div>
  );
};
export default SignIn;