import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowPage from 'routes/BorrowPage';
import LendPage from 'routes/LendPage';
import Login from 'routes/Login';
import Logout from 'routes/Logout';
import { AuthProvider, useAuth } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={<BorrowPage />} />} />
          <Route path="/borrow" element={<ProtectedRoute component={<BorrowPage />} />} />
          <Route path="/lend" element={<ProtectedRoute component={<LendPage />} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ component }) => {
  const { auth } = useAuth();
  return auth ? component : <Navigate to="/login" />;
};

export default App;
