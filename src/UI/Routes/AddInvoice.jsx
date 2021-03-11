import React, { Component, Fragment, useState, useEffect } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ChipDeletable from '../Components/Chips/ChipDeleteable'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab'
import moment from 'moment'
import { DataGrid } from '@material-ui/data-grid';
import AddInvoiceStepsWrapper from './AddInvoiceFlow/AddInvoiceStepsWrapper'




const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    root: {
      minWidth: 275,
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


const AddInvoice = (props) => {

    const classes = useStyles();
    const theme = useTheme();


    const [invoiceClient, setInvoiceClient] = useState({})
    const [invoiceTemplates, setInvoiceTemplates] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [notes, setNotes] = useState()
    const [templateNames, setTemplateNames] = useState([])
    const { uid } = useSelector((state) => state.firebase.auth);
    const [selection, setSelection] = useState()
    
    useFirestoreConnect([{
        
        collection: `users/${uid}/templates`,
        storeAs: "templates",
        
      },
      {
        collection: `users/${uid}/clients`,
        storeAs: "clients",
      }]);

      
    const firestore = useFirestore();
    const history = useHistory();
    let templatesArray = []
    let clientsArray = []
    // const handleTextChange = (e) => {
    //     const newState = { ...invoice }
    //     newState[e.target.id] = e.target.value
    //     setTemplate(newState)
    // }
    const clients = useSelector((state) => state.firestore.data.clients)
    const templates = useSelector((state) => state.firestore.data.templates)
    if(templates) {templatesArray = Object.values(templates)}
    if(clients) {clientsArray = Object.values(clients)}

    const columns = [
      { field: 'addRemove', headerName: 'Add/Remove', width: 200, renderCell: (params) => (
        <strong>
          <Fab size="small" color="secondary" aria-label="add">
            <RemoveIcon/>
          </Fab>
          <TextField id="standard-basic" style={{width: '20px'}} />
          <Fab size="small" color="primary" aria-label="add" onClick={handleChangeTest}>
            <AddIcon />
          </Fab>
          
        </strong>
      ),},
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'templateName', headerName: 'Template Name', width: 230 },
      { field: 'templateAmount', headerName: 'Amount', width: 150 },
      
      {
        field: 'description',
        headerName: 'Description',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
        
      },
    ];

    const rows = templates && templatesArray.map((template, idx) => {return {id: idx, 
                                                                             templateName: template.template_name, 
                                                                             templateAmount: template.template_amount, 
                                                                             description: template.template_description}}) 


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = { client: invoiceClient,
                          templates: invoiceTemplates,
                          
                           }
        // payload.id = props.clients.length + 1
        delete payload.open
        console.log("THE TEMPLATE", payload)
        
        firestore
          .collection("users")
          .doc(uid)
          .collection("invoices")
          .add(payload)
          .then((docRef) => {
            docRef.update({
            invoiceID: docRef.id,
            total: totalAmount,
            date: new Date()
        });
        
      })

      .then(()=> {
        history.push("/invoices")
      })
        
      
        console.log("invoice added!")
    }

    useEffect(() => {
      let total = 0
      for (let i = 0; i < invoiceTemplates.length; i++) {
        total += parseInt(invoiceTemplates[i].template_amount)
        
      }
      setTotalAmount(total)
      console.log('total', totalAmount)
      console.log('selection', selection)
    
    
    
    }, [invoiceTemplates])

    const handleChangeTest = (event) => {
      console.log('event.target.value', event.target.value)
    }

    const handleChangeTemplates = (event) => {
        
        console.log('event.target.value', event.target.value)
        setInvoiceTemplates([...event.target.value]);
        
        let total = 0
        for (let i = 0; i < invoiceTemplates.length; i++) {
        total += parseInt(invoiceTemplates[i].template_amount)
        
      }
      console.log('invoice templates', invoiceTemplates)
      let names = []
      for (let i = 0; i < invoiceTemplates.length; i++) {
      names.push(invoiceTemplates[i].template_name)
      
    }


      setTemplateNames(names)
      setTotalAmount(total)
      console.log('names', names)

        
        console.log('handleChange', event.target.value)
      };

      const handleChangeClient = (event) => {
        setInvoiceClient(event.target.value);
        console.log('handleChange', event.target.value)
      };
      
      const handleChangeMultiple = (event) => {
        console.log(event.target)
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setInvoiceTemplates(value);
      };

      
      const handleDelete = (template) => {
        console.log('template', template)
        console.info('You clicked the delete icon.');
        console.log('index',invoiceTemplates.indexOf(template))
        
        const newTemplates = invoiceTemplates
        const removed = newTemplates.splice(newTemplates.indexOf(template))
        console.log('new templates', newTemplates)
        setInvoiceTemplates(newTemplates)
        
        
      };
    


   
        return (
            
            <div>
              <div>
              <AddInvoiceStepsWrapper handleDelete={handleDelete} handleChangeMultiple={handleChangeMultiple} />
            </div>
            
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Templates</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={invoiceTemplates}
                onChange={handleChangeTemplates}
                input={<Input />}
                renderValue={()=>templateNames.join(', ')}
                MenuProps={MenuProps}
              >
                {templates && templatesArray.map((template) => (
                  <MenuItem key={template.templateID} value={template}>
                    
                    <Checkbox checked={invoiceTemplates.indexOf(template) > -1} />
                    
                    <ListItemText primary={template.template_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div style={{ height: 400, width: '50%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionChange={console.log('hello')} />
            </div>


            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Client</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={invoiceClient}
                onChange={handleChangeClient}
              >
                   {clients && clientsArray.map((client) => (
                    <MenuItem key={client.clientID} value={client}>
                    
                    
                    <ListItemText primary={client.first_name + " " + client.last_name} />
                  </MenuItem>
                ))}


                
              </Select>
              <FormHelperText>Select a Client</FormHelperText>
            </FormControl>


            <Card className={classes.root} style={{width: '500px', height: '250px', margin: '15px'}}>
              <CardContent>
        
                <Typography variant="h5" component="h2">
                  Templates
                </Typography>
                  
        
              </CardContent>
              <CardActions style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {templates && invoiceTemplates && invoiceTemplates.map((template) => (
                       
                        <ChipDeletable content={template.template_name} template={template} handleDelete={handleDelete} >{console.log('template', template)}</ChipDeletable>
                       


                  ))}

                </div>
                  
                  <p>Total {" " + "$" + totalAmount}</p>
              </CardActions>
            </Card>

            <Card className={classes.root} style={{width: '500px', height: '250px', margin: '15px'}}>
              <CardContent>
        
                <Typography variant="h5" component="h2">
                  Client
                </Typography>
                  
        
              </CardContent>
              <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  
                       
                       {invoiceClient.first_name && <ChipDeletable content={invoiceClient.first_name + " " + invoiceClient.last_name} handleDelete={handleDelete}>{console.log("invoice client",invoiceClient)}</ChipDeletable>}


                  
              </CardActions>
            </Card>
            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            
           </div>
                        
        )
}


export default AddInvoice

