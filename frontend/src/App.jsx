import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowPage from 'routes/BorrowPage';
import LendPage from 'routes/LendPage';
import Login from 'routes/Login';

const App = () => {
  const [auth, setAuth] = useState(null); // { username: 'user' } when authenticated
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute auth={auth} component={<BorrowPage auth={auth} />} />} />
        <Route path="/borrow" element={<ProtectedRoute auth={auth} component={<BorrowPage auth={auth} />} />} />
        <Route path="/lend" element={<ProtectedRoute auth={auth} component={<LendPage auth={auth} />} />} />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
