import React from 'react'
import ClientList from './ClientList'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";




export default function ClientListWrapper() {
    const { displayName, uid } = useSelector((state) => state.firebase.auth);
    useFirestoreConnect(
        {
        collection: `users/${uid}/invoices`,
        storeAs: "invoices"
        }
    )

    const invoices = useSelector((state) => state.firestore.data.invoices);




    return (
        <ClientList invoices={invoices}/>
    )
}
