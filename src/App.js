import React from 'react';
import Display from './pages/display/display';
import Login from './pages/login/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const authCode = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <Router>
      <Routes>
        {authCode ? (
          <Route path="/" element={<Display authCode={authCode} />
        } />
        ) : (
          <Route path="/" element={<Login />} />
          
        )}
      </Routes>
    </Router>
  );
}

export default App;
