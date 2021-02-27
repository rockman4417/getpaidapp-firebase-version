import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete'

import {Link} from 'react-router-dom'
import cookie from 'cookie'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";



const useStyles = makeStyles({
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
});

export default function SimpleCard(props) {
  const {client_name, date_created, total_amount, type} = props
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  



  return (
    <Card className={classes.root} style={{margin: '10px'}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          RECENT INVOICE
        </Typography>
        <Typography variant="h5" component="h2">
         
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {date_created}
        </Typography>
        <Typography variant="body2" component="p">
          ${total_amount}
          <br />
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">VIEW MORE</Button>
      </CardActions>
    </Card>
  );
}