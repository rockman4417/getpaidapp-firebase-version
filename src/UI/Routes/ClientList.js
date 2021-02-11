import React, { useEffect, useState } from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import FloatingActionButton from '../Components/Buttons/AddButton'
import {Link} from 'react-router-dom'
import cookie from 'cookie'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";



// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//     console.log('looking up cookies')
//     return cookies["loggedIn"] ? true : false
    
// }
 
const ClientList = (props) => {
    // const [loggedIn, setLoggedIn] = useState(false)

    const { displayName, uid } = useSelector((state) => state.firebase.auth);
        useFirestoreConnect({
            collection: `users/${uid}/clients`,
            storeAs: "clients",
        });
    const clients = useSelector((state) => state.firestore.data.clients);
     console.log(clients);

    // useEffect (() => {checkAuth() ? setLoggedIn(true) : setLoggedIn(false)}, [])

    return (
        
        <Container maxWidth="lg" className="car-container">
            
            <Link to="/addclient" style={{ textDecoration: 'none', color: "white"  }}><FloatingActionButton></FloatingActionButton></Link>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {clients && Object.values(clients).map((client, idx) => (
                    <TableRow key={idx}>
                        <TableCell>
                            <Link to={`/clients`} style={{ textDecoration: 'none' }}>{client["first_name"]}</Link>
                            
                            </TableCell>
                        <TableCell>{client["address"]}</TableCell>
                        <TableCell>{client["cell"]}</TableCell>
                        <TableCell>{client["email"]}</TableCell>
                        <TableCell>
                            <DeleteIcon
                                onClick={() => props.removeClient(idx)   }
                                className="icon text-red" /> 
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            
            
        </Container>
    )
}

export default ClientList



// firestore.collection("users").doc(uid).collection("clients").doc(clientID).delete(doc)