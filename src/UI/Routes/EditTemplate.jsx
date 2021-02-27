import React, { Component, Fragment, useState, useEffect } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';





const AddClient = (props) => {


    const { uid } = useSelector((state) => state.firebase.auth);

    const [open, setOpen] = useState(false);
    const [template, setTemplate] = useState(props.location.template.template)

    console.log('template', props.location.template.template)
    
    const firestore = useFirestore();
    const history = useHistory();
    
    const handleTextChange = (e) => {
        const newState = { ...template }
        newState[e.target.id] = e.target.value
        setTemplate(newState)
    }

    


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = { ...template }
        // payload.id = props.clients.length + 1
        delete payload.open
        console.log("THE TEMPLATE", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("templates")
          .doc(template.templateID)
          .update(payload)

          .then(()=> {
            history.push(`/details/template/${template?.templateID}`)
          })
        
      
        console.log("template updated!")
        
        
    }

    const handleDelete = (templateID) => {
        
        firestore.collection("users").doc(uid).collection("templates").doc(templateID.toString()).delete().then(() => {console.log("template deleted")})
        
    }


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    


   
        return (
            
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '100px'}}>
                                <form 
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', flexDirection: 'column', width: '50vh'}}>
                                <TextField 
                                    id="template_name" 
                                    placeholder="Template Name" 
                                    value={template.template_name} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="template_amount" 
                                    placeholder="Amount" 
                                    value={template.template_amount} 
                                    onChange={handleTextChange} 
                                    required />
                                <TextField 
                                    id="template_description" 
                                    placeholder="Description" 
                                    value={template.template_description} 
                                    onChange={handleTextChange} 
                                    required />
                               
                                <br />
                                
                                <div style={{width: '50vh', display: 'flex', justifyContent: 'space-between'}}>
                                    <Button variant="outlined" color="secondary" onClick={handleClickOpen} startIcon={<DeleteIcon/>}>
                                                Delete Template
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
                                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this template?"}</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            You will still keep all your invoices accociated with this template.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleClose, ()=> handleDelete(template.templateID)} color="secondary" autoFocus>
                                            Delete
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            
                            
                            </div>
                        
        )
    }


export default AddClient

