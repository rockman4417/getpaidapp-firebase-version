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
import { useFirestore } from "react-redux-firebase";
import EditIcon from '@material-ui/icons/Edit';



// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//     console.log('looking up cookies')
//     return cookies["loggedIn"] ? true : false
    
// }
 
const TemplateList = (props) => {
    // const [loggedIn, setLoggedIn] = useState(false)

    const { displayName, uid } = useSelector((state) => state.firebase.auth);
        useFirestoreConnect({
            collection: `users/${uid}/templates`,
            storeAs: "templates",
        });
    const templates = useSelector((state) => state.firestore.data.templates);
     console.log(templates);

     const firestore = useFirestore();


     const handleDelete = (templateID) => {
        
        firestore.collection("users").doc(uid).collection("templates").doc(templateID.toString()).delete().then(() => {console.log("template deleted")})
        
    }



    return (
        
        <Container maxWidth="lg" className="car-container">
            
            <Link to="/addtemplate" style={{ textDecoration: 'none', color: "white"  }}><FloatingActionButton></FloatingActionButton></Link>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Template Name</TableCell>
                        <TableCell>Template Amount</TableCell>
                        <TableCell>Template Description</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                {templates && Object.values(templates).map((template, idx) => (
                    template &&<TableRow key={idx}>
                        <TableCell>
                            <Link to={`/details/template/${template.templateID}`} style={{ textDecoration: 'none' }}>{template["template_name"]}</Link>
                            
                            </TableCell>
                        
                        <TableCell>{template["template_amount"]}</TableCell>
                        <TableCell>{template["template_description"]}</TableCell>
                        <TableCell>
                        <Link to={{pathname: `/edit/template/${template?.templateID}`, template: {template}}} style={{ textDecoration: 'none', color: 'pink'  }}><EditIcon/></Link>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            
            
        </Container>
    )
}

export default TemplateList



// firestore.collection("users").doc(uid).collection("templates").doc(clientID).delete(doc)