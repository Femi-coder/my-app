'use client';

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
  const [showManager, setShowManager] = useState(false);
  const [products, setProducts] = useState(null);
  const [weather, setWeatherData] = useState(null);
  const [username, setUsername] = useState('');

  // Check session on page load
  useEffect(() => {
    fetch('/api/getSession')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('No active session found');
        } else {
          setLoggedIn(true);
          setUsername(data.email);
          console.log('Session restored:', data);
        }
      })
      .catch((err) => console.error('Error checking session:', err));
  }, []);

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

  const runShowLogin = () => {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(false);
  };

  const runShowDash = () => {
    if (!loggedIn) {
      alert('Please log in to access the customer dashboard.');
      runShowLogin();
      return;
    }
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowRegister(false);
    setShowManager(false);
  };

  const runShowFirst = () => {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(false);
  };

  const runShowRegister = () => {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(true);
  };

  const runShowManager = () => {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(true);
  };

  const handleLogin = () => {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('/api/Login1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          fetch('/api/setSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          })
            .then(() => {
              alert('Login successful');
              setLoggedIn(true);
              setUsername(email);
              runShowDash();
            })
            .catch((err) => console.error('Error setting session:', err));
        }
      })
      .catch((err) => console.error('Error during login:', err));
  };

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
    })
      .then(() => {
        setLoggedIn(false);
        setUsername('');
        alert('Logged out successfully. See you next time!');
        runShowFirst();
      })
      .catch((err) => console.error('Error logging out:', err));
  };

  const handleRegister = () => {
    const name = document.querySelector('input[name="Full Name"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address, email, password, confirmPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Registration successful');
          runShowLogin();
        }
      })
      .catch((err) => console.error('Error registering user:', err));
  };

  const handleManagerLogin = () => {
    const email = document.querySelector('input[name="manager-email"]').value;
    const password = document.querySelector('input[name="manager-password"]').value;

    fetch('/api/managerLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Manager login successful');
          setLoggedIn(true);
          setUsername(email);
          setShowManager(false);
          runShowDash();
        }
      })
      .catch((err) => console.error('Error during manager login:', err));
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#2E3B4E', color: 'lightgreen', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'lightgreen' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme
          </Typography>
          <Button color="inherit" onClick={runShowFirst}>
            Index
          </Button>
          <Button color="inherit" onClick={runShowRegister}>
            Register
          </Button>
          {!loggedIn ? (
            <Button color="inherit" onClick={runShowLogin}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <Button color="inherit" onClick={runShowDash}>
            Customer
          </Button>
          <Button color="inherit" onClick={runShowManager}>
            Manager
          </Button>
        </Toolbar>
      </AppBar>

      {showFirstPage && (
        <Box component="section" sx={{ p: 3, border: '1px dark blue' }}>
          <h1>Welcome to Krispy Kreme</h1>
          <p>Indulge in the sweet world of Krispy Kreme...</p>
          <StandardImageList />
        </Box>
      )}

      {showLogin && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Login</h1>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="johndoe@email.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="password" />
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleLogin}>
            Login
          </Button>
        </Box>
      )}

      {showManager && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Manager Login</h1>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="manager-email" type="email" placeholder="manager@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="manager-password" type="password" placeholder="password" />
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleManagerLogin}>
            Login
          </Button>
        </Box>
      )}

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Dashboard</h1>
          {username ? (
            <Typography variant="h5">Welcome, {username}!</Typography>
          ) : (
            <Typography variant="h5">Welcome to the dashboard!</Typography>
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
                      marginRight: '16px',
                    }}
                  />
                  <Typography variant="h6">Product Name: {product.pname}</Typography>
                  <Typography variant="body1">Price: €{product.price}</Typography>
                  <Button onClick={() => putInCart(product)} variant="outlined">
                    Add to cart
                  </Button>
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
            <Input name="Full Name" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input name="address" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirm-password" type="password" />
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleRegister}>
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
}
