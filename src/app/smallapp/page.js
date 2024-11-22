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
  const [showCheckout, setShowCheckout] = useState(false);
  const [products, setProducts] = useState(null);
  const [weather, setWeatherData] = useState(null);
  const [username, setUsername] = useState('');
  const [managerLoggedIn, setManagerLoggedIn] = useState(false);
  const [orders, setOrders] = useState(null);
  const [cart, setCart] = useState([]); // Cart state for checkout

  // Check session on page load
  useEffect(() => {
    fetch('/api/getData')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('No active session found');
        } else if (data.role === 'manager') {
          setManagerLoggedIn(true);
          setUsername(data.email);
        } else if (data.role === 'customer') {
          setLoggedIn(true);
          setUsername(data.email);
        }
      })
      .catch((err) => console.error('Error checking session:', err));
  }, []);
  useEffect(() => {
    fetch('http://localhost:3000/api/getWeather')

      .then((res) => res.json())

      .then((weather) => {

        setWeatherData(weather)

      })
  }, [])

  useEffect(() => {
    if (showDash) {
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => setProducts(data))
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
    setShowCheckout(false);
  };

  const runShowDash = () => {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowRegister(false);
    setShowManager(false);
    setShowCheckout(false);
  };




  const runShowFirst = () => {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(false);
    setShowCheckout(false);
  };

  const runShowRegister = () => {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(true);
    setShowCheckout(false);
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
          setManagerLoggedIn(true);
          runShowManager(); // Navigate to the manager dashboard
        }
      })
      .catch((err) => console.error('Error during manager login:', err));
  };

  const runShowManager = () => {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowManager(true);
    setShowCheckout(false);
    setOrders(null);

    fetch('/api/managerViewOrders')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching orders:', data.error);
          alert('Failed to fetch orders. Please try again.');
        } else {
          setOrders(data);
        }
      })
      .catch((err) => console.error('Error fetching orders:', err));
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
          setLoggedIn(true);
          setUsername(email);
          setShowLogin(false);
          setShowDash(true);
        }
      })
      .catch((err) => console.error('Error during login:', err));
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

  const putInCart = (product) => {
    if (!loggedIn || !username) {
      alert('Please log in to add items to the cart.');
      return;
    }

    setCart((prevCart) => [...prevCart, product]); // Add product to the cart
    setShowCheckout(true); // Navigate to checkout
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Include the username of the customer
          items: cart, // Pass the cart items
          total: cart.reduce((sum, item) => sum + item.price, 0), // Calculate total price
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Checkout successful!');
        setCart([]); // Clear the cart
        runShowDash(); // Navigate back to the dashboard
      } else {
        alert(`Error: ${result.error || 'Could not complete checkout'}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout.');
    }
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
            <Button color="inherit" onClick={() => setLoggedIn(false)}>
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
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography variant="h4">Welcome to Krispy Kreme</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Indulge in the sweet world of Krispy Kreme...
          </Typography>
          <StandardImageList />
        </Box>
      )}

      {/* Login Page */}
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

      {showRegister && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Register</h1>
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


      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Dashboard</h1>
          <Typography variant="h5">Welcome, {username}!</Typography>
          {products && (
            <Box>
              {products.map((product, index) => (
                <Box key={index} sx={{ p: 2, border: '1px solid white', mb: 2 }}>
                  <Typography variant="h6">{product.pname}</Typography>
                  <img src={product.imageUrl}
                    alt={product.pname}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <Typography variant="body1">Price: €{product.price}</Typography>
                  <Button onClick={() => putInCart(product)} variant="outlined">
                    Add to cart
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}

      {showManager && !managerLoggedIn && (
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


      {showManager && managerLoggedIn && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Manager Dashboard</h1>
          {orders && orders.length > 0 ? (
            <Box>
              {orders.map((order, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    border: '1px solid lightgreen',
                    borderRadius: '8px',
                    mb: 2,
                    backgroundColor: '#2E3B4E',
                  }}
                >
                  <Typography variant="h6">Order ID: {order._id}</Typography>
                  <Typography variant="body1">Customer: {order.username}</Typography>
                  <Typography variant="body1">Total: €{order.total}</Typography>
                  <Typography variant="body2">
                    Items: {order.items.map((item) => item.pname).join(', ')}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No orders found.</Typography>
          )}
        </Box>
      )}


      {showCheckout && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1>Checkout</h1>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Box key={index} sx={{ p: 2, border: '1px solid lightgreen', mb: 2 }}>
                <Typography>Product Name: {item.pname}</Typography>
                <Typography>Price: €{item.price}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No items in cart</Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Confirm Purchase
          </Button>
        </Box>
      )}
    </Box>
  );
}
