import React, { useEffect } from 'react';
import '../styles/NavigationBar.scss';
import OptionList from './OptionList';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  const { auth, setAuth } = useAuth(); // Use the useAuth hook to get auth state

  useEffect(() => {
    if (auth && auth.userId && !auth.username) {
      // Fetch user details only if user is authenticated and username is not yet fetched
      fetch('http://localhost:3005/users/details', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setAuth(prevAuth => ({
              ...prevAuth,
              username: data.user.Name
            }));
          }
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [auth, setAuth]);
  return (
    <Navbar bg="light" variant="light" className="justify-content-between top-nav-bar fixed-top">
      <Navbar.Brand className="top-nav-bar__logo">ToolsLib</Navbar.Brand>
      <span className="top-nav-bar__username">{auth && auth.username ? `Welcome, ${auth.username}` : 'Welcome, Guest'}</span>
      <OptionList />
    </Navbar>
  );
};

export default Navigation;
