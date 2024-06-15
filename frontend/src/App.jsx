import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowPage from 'routes/BorrowPage';
import LendPage from 'routes/LendPage';
import Login from 'routes/Login';

const App = () => {
  const [auth, setAuth] = useState(null); // { username: 'user' } when authenticated

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute auth={auth} component={<BorrowPage />} />} />
        <Route path="/borrow" element={<ProtectedRoute auth={auth} component={<BorrowPage />} />} />
        <Route path="/lend" element={<ProtectedRoute auth={auth} component={<LendPage />} />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ auth, component }) => {
  return auth ? component : <Navigate to="/login" />;
};

export default App;
