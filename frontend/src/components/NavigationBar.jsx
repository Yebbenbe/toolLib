import React, { useEffect } from 'react';
import '../styles/NavigationBar.scss';
import OptionList from './OptionList';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const Navigation = ({ onClickOption }) => {
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
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">ToolsLib</span>
      {auth && auth.username ? (
        <span className="top-nav-bar__username">Welcome, {auth.username}</span>
      ) : (
        <span className="top-nav-bar__username">Welcome, Guest</span>
      )}
      <OptionList onClickOption={onClickOption} />
    </div>
  );
};

export default Navigation;
