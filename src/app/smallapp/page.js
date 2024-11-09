'use client'

import * as React from 'react';

import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';

import FormControl from '@mui/joy/FormControl';

import FormLabel from '@mui/joy/FormLabel';

import Input from '@mui/joy/Input';

import Typography from '@mui/joy/Typography';



import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';


import { useState } from 'react';


export default function MyApp() {


  const [showLogin, setShowLogin] = useState(false);

  const [showDash, setShowDash] = useState(false);

  const [showFirstPage, setShowFirstPage] = useState(true);

  const [showRegister, setShowRegister] = useState(false);


  function runShowLogin() {



    setShowFirstPage(false);

    setShowLogin(true);

    setShowDash(false);

    setShowRegister(false);

  }


  function runShowDash() {

    setShowFirstPage(false);

    setShowLogin(false);

    setShowDash(true);

    setShowRegister(false);




  }


  function runShowFirst() {

    setShowFirstPage(true);

    setShowLogin(false);

    setShowDash(false);

    setShowRegister(false);


  }

  function runShowRegister() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(true);
  }

  return (



    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">

        <Toolbar>

          <IconButton

            size="large"

            edge="start"

            color="inherit"

            aria-label="menu"

            sx={{ mr: 2 }}

          >

            <MenuIcon />

          </IconButton>


          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>

            Krispy Kreme

          </Typography>

          <Button color="inherit" onClick={runShowFirst}>First</Button>

          <Button color="inherit" onClick={runShowLogin}>Login</Button>

          <Button color="inherit" onClick={runShowDash}>Dashboard</Button>

          <Button color="inherit" onClick={runShowRegister}>Register</Button>

        </Toolbar>

      </AppBar>



      {showFirstPage &&

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

          Indulge in the sweet world of Krispy Kreme, where every doughnut is crafted to perfection. Our app is designed to make it easier
          than ever for you to browse our delicious range, from classic Original Glazed to seasonal specials. Whether you're craving a quick treat or planning a celebration
          , Krispy Kreme is here to sweeten your day.



        </Box>

      }




      {showLogin &&

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>


          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>


        </Box>

      }




      {showDash &&

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>



          Welcome to the dashboard page

        </Box>

      }

      {showRegister && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          This is the registration page
        </Box>
      )}
    </Box>
  );
}