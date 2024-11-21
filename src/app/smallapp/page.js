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

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [showDash, setShowDash] = useState(false);

  const [showFirstPage, setShowFirstPage] = useState(true);

  const [showRegister, setShowRegister] = useState(false);

  const [products, setProducts] = useState(null);

  const [showManager, setShowManager] = useState(false);

  const [weather, setWeatherData] = useState(null);

  const [username, setUsername] = useState('');



  function runShowLogin() {



    setShowFirstPage(false);

    setShowLogin(true);

    setShowDash(false);

    setShowRegister(false);

    setShowManager(false);

  }


  function runShowDash() {

    if (!loggedIn) {
      alert("Please register or login to access the customer dashboard.");
      runShowLogin(); // Redirects to Login
      return;

    }
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowRegister(false);
    setShowManager(false);
  }


  function runShowFirst() {

    setShowFirstPage(true);

    setShowLogin(false);

    setShowDash(false);

    setShowRegister(false);

    setShowManager(false);

  }

  function runShowRegister() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(true);
  }

  function runShowManager() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(true);
  }

  function handleLogin() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
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
          alert(data.error);
        } else {
          alert('Registration successful');
        }
      })
      .catch((error) => console.error('Error:', error));

  }
  function putInCart(product) {
    if (!username) {
      alert("Please log in to add items to the cart.");
      return;
    }

    if (!product.pname) {
      alert("Product name is missing.");
      return;
    }

    fetch('/api/putInCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pname: product.pname,
        username: username, // Send the logged-in username
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Product added to cart!");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("An error occurred while adding the product to the cart.");
      });
  }

  function handleLogin() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Sends login credentials to the backend
    fetch('/api/Login1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Login successful');
          setLoggedIn(true);
          setUsername(data.username);
          runShowDash(); // Redirects to the dashboard after successful login
        }
      })
      .catch((error) => console.error('Error during login:', error));
  }

  useEffect(() => {
    if (showDash) {
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching products:', error));

      fetch('/api/getWeather')
        .then((res) => res.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error('Error fetching weather:', error));
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

          <Button color="inherit" onClick={runShowManager}>Manager</Button>


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
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleLogin} // Call the login handler on button click
          >
            Login
          </Button>

        </Box>

      }




      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Dashboard</h1>
          {username ? (
            <Typography variant="h5">
              Welcome, {username}!
            </Typography>
          ) : (
            <Typography variant="h5">
              Welcome to the dashboard!
            </Typography>
          )}
          {weather && (
            <Typography variant="h5">
              Today's Temperature: {weather.temp}°C | {weather.condition}
            </Typography>
          )}
          {products ? (
            <Box>
              {products.map((product, index) => (
                <Box key={index} sx={{ p: 2, border: '1px solid white', borderRadius: '8px', mb: 2 }}>
                  <img
                    src={product.imageUrl}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginRight: '16px'

                    }}
                  />
                  <Typography variant="h6">Product Name: {product.pname}</Typography>
                  <Typography variant="body1">Price: €{product.price}</Typography>
                  <Typography variant="body2">Product ID: {product._id}</Typography>
                  <Button onClick={() => putInCart(product)} variant="outlined"> Add to cart </Button>
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
