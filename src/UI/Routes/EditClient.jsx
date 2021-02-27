import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Link} from 'react-router-dom'




const AddClient = (props) => {
    const [open, setOpen] = useState(false);
    const { uid } = useSelector((state) => state.firebase.auth);



    const [client, setClient] = useState(props.location.client.client)

    console.log('client', props.location.client)






    
    const firestore = useFirestore();
    const history = useHistory();
    
    const handleTextChange = (e) => {
        const newState = { ...client }
        newState[e.target.id] = e.target.value
        setClient(newState)
    }

    


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = { ...client }
        delete payload.open
        console.log("THE CLIENT", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("clients")
          .doc(client.clientID)
          .update(payload)
          

      .then(()=> {
        history.push(`/details/client/${client?.clientID}`)
      })
        
      
        console.log("client updated!")
        
        
    }

    const handleDelete = (clientID) => {
        
        firestore.collection("users").doc(uid).collection("clients").doc(clientID.toString()).delete().then(() => {console.log("client deleted")})
        .then(()=> {
          history.push("/clients")
        })
          
        
          console.log("client deleted!")
        
      }

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    


    return (
            
        <div style={{display: 'flex', justifyContent: 'center'}}>
           <Link to="/clients" ><Button variant="contained">BACK</Button></Link>
           <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '100px'}}>
           
           <form 
           onSubmit={handleSubmit}
           style={{ display: 'flex', flexDirection: 'column', width: '50vh'}}>
           <TextField 
               id="first_name" 
               placeholder="First Name" 
               value={client.first_name} 
               onChange={handleTextChange} 
               required />
           <TextField 
               id="last_name" 
               placeholder="Last Name" 
               value={client.last_name} 
               onChange={handleTextChange} 
               required />
           <TextField 
               id="business_name" 
               placeholder="Business Name" 
               value={client.business_name} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="address" 
               placeholder="Address" 
               value={client.address} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="city" 
               placeholder="City" 
               value={client.city} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="state" 
               placeholder="State" 
               value={client.state} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="zip" 
               placeholder="Zip" 
               value={client.zip} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="phone1" 
               placeholder="Phone1" 
               value={client.phone1} 
               onChange={handleTextChange} 
                />
           <TextField 
               id="cell" 
               placeholder="Cell" 
               value={client.cell} 
               onChange={handleTextChange} 
               required />
           <TextField 
               id="email" 
               placeholder="Email Address" 
               value={client.email} 
               onChange={handleTextChange} 
                />
           <br />
           <div style={{width: '50vh', display: 'flex', justifyContent: 'space-between'}}>
           <Button variant="outlined" color="secondary" onClick={handleClickOpen} startIcon={<DeleteIcon/>}>
                       Delete Client
                   </Button>
           <Button variant="contained" color="primary" type="submit" style={{width: '60%'}} startIcon={<SaveIcon />}>Save Changes</Button>
               
           </div>
               
           
           
       </form>
       </div>
       
       
               <div>
                   
                   <Dialog
                       open={open}
                       onClose={handleClose}
                       aria-labelledby="alert-dialog-title"
                       aria-describedby="alert-dialog-description"
                   >
                       <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this client?"}</DialogTitle>
                       <DialogContent>
                       <DialogContentText id="alert-dialog-description">
                           You will still keep all your invoices accociated with this client.
                       </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                       <Button onClick={handleClose} color="primary">
                           Cancel
                       </Button>
                       <Button onClick={handleClose, ()=> handleDelete(client.clientID)} color="secondary" autoFocus>
                           Delete
                       </Button>
                       </DialogActions>
                   </Dialog>
               </div>


   </div> 
   
)

 
}


export default AddClient

