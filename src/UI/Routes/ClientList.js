import React from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'
import FloatingActionButton from '../Components/Buttons/AddButton'
import {Link} from 'react-router-dom'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import ClientRow from '../Components/ClientRow'



 
const ClientList = ({invoices}) => {
    
    

    const { displayName, uid } = useSelector((state) => state.firebase.auth);

        useFirestoreConnect(
            {
            collection: `users/${uid}/clients`,
            storeAs: "clients"
            }
        )

        

    const clients = useSelector((state) => state.firestore.data.clients);
    const firestore = useFirestore();
    





    const handleDelete = (clientID) => {
        
        firestore.collection("users").doc(uid).collection("clients").doc(clientID.toString()).delete().then(() => {console.log("client deleted")})
        
    }
      



    return (
        
        <Container maxWidth="lg" className="car-container">
            
            <Link to="/addclient" style={{ textDecoration: 'none', color: "white"  }}><FloatingActionButton></FloatingActionButton></Link>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {clients  && Object.values(clients).map((client, idx) => (
                    
                   client && <ClientRow client={client} handleDelete={handleDelete} invoices={invoices} key={idx} />
                ))}
                </TableBody>
            </Table>
            
            
        </Container>
    )
}

export default ClientList
