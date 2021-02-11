import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
const Client = ({ first_name, last_name, address }) => {
 
    const firestore = useFirestore();
    const {uid} = useSelector(state => state.firebase.auth);
  
  
  return (
    <div >
      
      {first_name, last_name, address}
    </div>
  );
};
export default Client;