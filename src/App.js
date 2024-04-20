import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import DashBoard from './components/Main_dash';
import { useState } from 'react';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user, password) => {
    if (user === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const onLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Routes>
        <Route path="/"
          element={isLoggedIn === true ? (<Navigate to="/Dashboard" />)
            : (<Login onLogin={handleLogin} />)}></Route>
        <Route path="/Dashboard/*" element={<DashBoard onLogout={onLogout} />}></Route>
      </Routes>
    </>
  )
}

export default App;
