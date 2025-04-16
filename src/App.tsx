import React,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Clinic from './components/Clinic';
import '../src/style.css'
import Staff from './components/Staff';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, []);
const handleLogin = (token:string) => {
  localStorage.setItem("token", token)
  setIsLoggedIn(true);
  navigate("/Staff");
};

const handleLogout =async () => {

  try{
    const response = await fetch("https://localhost:7098/api/Auth/Logout", {
      method: "GET",
    });
    if (response.ok) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      alert("Logout successful!");
      navigate("/Login");
    }
    else {
      alert("Error logging out.");
    } 
  }catch (error) {  
    console.error("Error:", error);
  }
}


  return (
    <div className="App">      
   <>
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clinic Staff Management System</h1>
      
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <ul className="navbar-nav">
        {isLoggedIn && (
          <>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Clinic</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff">Staff</Link>
          </li>
          <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
        </li>
          </>
        )}

        {!isLoggedIn && (
          <>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Register User</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          </>
        )}
        </ul>
      </nav>
       
      
      
      <Routes>
        <Route path="/users" element={<Clinic />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
        {/* <Route path="/logout" element={<LogOut/>} /> */}
    
      </Routes>
    </div>
    </>
    </div>
  );
}

export default App;
