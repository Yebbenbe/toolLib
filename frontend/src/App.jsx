import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BorrowPage from "routes/BorrowPage";
import LendPage from 'routes/LendPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BorrowPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
        <Route path="/lend" element={<LendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);