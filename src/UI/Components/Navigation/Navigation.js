import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, 
    Typography, Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import HomeButton from './HomeButton'
import HamburgerDrawr from './HamburgerDrawr'

import { Link } from 'react-router-dom'
import cookie from 'cookie'


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    console.log('looking up cookies')
    return cookies["loggedIn"] ? true : false
    
}

const Navigation = (props) => {
    const classes = useStyles();

    const [loggedIn, setLoggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    useEffect (() => {checkAuth() ? setLoggedIn(true) : setLoggedIn(false)}, [])

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
        
    
    const logout = () => {
        document.cookie = "loggedIn=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        
        if(loggedIn) {
            window.location.replace("/login")
        }
    }



    

    return (

        <div>
                <AppBar position="relative" >
                <Toolbar >
                    {/* <HamburgerDrawr/> */}
                    <Typography variant="h6" style={{ flexGrow: "1" }}>
                        GET PAID APP
                    </Typography>
                    <ul className="nav-list" style={{listStyleType: "none", display: "flex"}}>
                        
                        {loggedIn ? 
                        <li className="nav-list-item" style={{display: 'flex'}}>
                            
              
                <HomeButton/>
                          

                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>    
                
                        </li>  
                        : null}
                        <li className="nav-list-item" style={{display: 'flex'}}>
                            <Link to="/" onClick={logout} style={{ textDecoration: 'none', color: "white"  }}><Button color="inherit" >{loggedIn ? "Logout" : "Login"}</Button></Link>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
            {loggedIn ? 
            <AppBar position="relative" style={{backgroundColor: '#B8B8B8', height: '25px', marginBottom: '50px'}}>
            <Toolbar style={{display: 'flex', alignItems: 'flex-start'}}>
                    
                    <Typography variant="p" style={{ flexGrow: "1" }}>
                        {/* Logged in as: {props.user.username}  */}
                    </Typography>
                    
                </Toolbar>
            </AppBar>  
            : null}
            </div>
        )
    
}

export default Navigation




























// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

// import HomeButton from './HomeButton'
// import HamburgerDrawr from './HamburgerDrawr'

// const useStyles = makeStyles((theme) => ({

//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function MenuAppBar() {
//   const classes = useStyles();
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <FormGroup>
//         <FormControlLabel
//           control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup>
//       <AppBar position="static">
//         <Toolbar>
//           <HamburgerDrawr/>
//           <Typography variant="h6" className={classes.title}>
            
//           </Typography>
//           {auth && (
//             <div>
//                 <div style={{display: 'flex'}}>
//                 <HomeButton/>


//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>    
//                 </div>

                
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }