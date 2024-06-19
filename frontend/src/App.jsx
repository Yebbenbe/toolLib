import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowPage from 'routes/BorrowPage';
import LendPage from 'routes/LendPage';
import Login from 'routes/Login';

const App = () => {
  const [auth, setAuth] = useState(null); // { userId: 'user_id' } when authenticated

  useEffect(() => {
    // Fetch current authentication state from the server
    fetch('http://localhost:3005/api/authenticate', {
      method: 'GET',
      credentials: 'include' // Include cookies in the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          setAuth({ userId: data.userId });
        }
      })
      .catch(error => console.error('Error fetching authentication state:', error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BorrowPage auth={auth} />} />
        <Route path="/borrow" element={<BorrowPage auth={auth} />} />
        <Route path="/lend" element={<LendPage auth={auth} />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
      </Routes>
    </BrowserRouter>
  );

  function handleOptionClick(option) {
    console.log('Option clicked:', option);
  }
};

const ProtectedRoute = ({ auth, component }) => {
  return auth ? component : <Navigate to="/login" />;
};

export default App;
