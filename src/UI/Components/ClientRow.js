import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from 'moment'


export default function ClientRow({client, handleDelete, invoices}) {

    const [open, setOpen] = React.useState(false);
    

    const invoiceRow = (invoice) => {
        
        
       
        
       return (
        <TableRow key={invoice.invoiceID}>
        <TableCell component="th" scope="row">
          {moment(invoice.date.seconds * 1000).format("dddd, MMMM Do YYYY")}
        </TableCell>
        <TableCell>{invoice.templates.map((template) => (template.template_name + ': $' + template.template_amount)).join(', ')}</TableCell>
        <TableCell align="right">{invoice.amount}</TableCell>
        <TableCell align="right">
          {'$' + invoice.total}
        </TableCell>
      </TableRow>




       )




    }








    return (
        <React.Fragment><TableRow>
                               
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/details/client/${client?.clientID}`} style={{ textDecoration: 'none'  }}>{client["first_name"] + ' ' + client["last_name"]}</Link>
                                </TableCell>
                                <TableCell>{client["address"]}</TableCell>
                                <TableCell>{client["cell"]}</TableCell>
                                <TableCell>{client["email"]}</TableCell>
                                <TableCell>
                                        <Link to={{pathname: `/edit/client/${client?.clientID}`, client: {client}}} style={{ textDecoration: 'none', color: 'pink'  }}><EditIcon/></Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={open} timeout="auto"  unmountOnExit>
                                <Box margin={1}>
                                  <Typography variant="h6" gutterBottom component="div">
                                    History
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Work Performed</TableCell>
                                        <TableCell align="right">Paid</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    
                                    <TableBody>
                                      {invoices && invoices !== "undefined" && Object.values(invoices).map((invoice) => (
                                         invoice && invoice.client.clientID === client.clientID && invoiceRow(invoice)
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                          </React.Fragment>
    )
}



