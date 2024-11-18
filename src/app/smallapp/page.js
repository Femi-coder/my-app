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

import StandardImageList from './projectimages';



import { useState, useEffect } from 'react';


export default function MyApp() {


  const [showLogin, setShowLogin] = useState(false);

  const [showDash, setShowDash] = useState(false);

  const [showFirstPage, setShowFirstPage] = useState(true);

  const [showRegister, setShowRegister] = useState(false);

  const [products, setProducts] = useState(null);



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
  function handleRegister() {
    const name = document.querySelector('input[name="Full Name"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-passoword"]').value;

    // Send the data to the backend
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address, email, password, confirmPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error); // Show error messages
        } else {
          alert('Registration successful');
        }
      })
      .catch((error) => console.error('Error:', error));
  }
  function putInCart(pname) {


    console.log("putting in cart: " + pname)


    fetch("http://localhost:3000/api/putInCart?pname=" + pname);



  }

  useEffect(() => {
    if (showDash) {
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [showDash]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#2E3B4E', color: 'lightgreen', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'lightgreen' }}>

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

          <Button color="inherit" onClick={runShowFirst}>Index</Button>

          <Button color="inherit" onClick={runShowRegister}>Register</Button>

          <Button color="inherit" onClick={runShowLogin}>Login</Button>

          <Button color="inherit" onClick={runShowDash}>Customer</Button>

        </Toolbar>

      </AppBar>



      {showFirstPage &&

        <Box component="section" sx={{ p: 3, border: '1px dark blue' }}>
          <h1 color='red'>Welcome to Krispy Kreme</h1>
          <br></br>
          Indulge in the sweet world of Krispy Kreme, where every doughnut is crafted to perfection. Our app is designed to make it easier
          than ever for you to browse our delicious range, from classic Original Glazed to seasonal specials. Whether you're craving a quick treat or planning a celebration
          , Krispy Kreme is here to sweeten your day.
          <StandardImageList />


        </Box>

      }




      {showLogin &&

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

          <h1>Login</h1>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
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




      {showDash && (

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Dashboard</h1>
          {products ? (
            <Box>
              {products.map((product, index) => (
                <Box key={index} sx={{ p: 2, border: '1px solid white', borderRadius: '8px', mb: 2 }}>
                  <Typography variant="h6">Product Name: {product.pname}</Typography>
                  <Typography variant="body1">Price: €{product.price}</Typography>
                  <Typography variant="body2">Product ID: {product._id}</Typography>
                  <Button onClick={() => putInCart(product.pname)} variant="outlined"> Add to cart </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <p>Loading products...</p>
          )}
        </Box>
      )}

      {showRegister && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Get Started</h1>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="Full Name"
              type="text"

            />
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                type="text"
              />
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="emaiil"
                />


              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                />
              </FormControl>
              <FormControl>
                <FormLabel> Confirm Password</FormLabel>
                <Input
                  name="confirm-passoword"
                  type="password"
                />
              </FormControl>
            </FormControl>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
}
