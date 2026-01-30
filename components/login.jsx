import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Users,
  DollarSign,
  Truck,
  Briefcase,
  CreditCard,
  Building,
} from "lucide-react";
import "./login.css";
import slide1 from "../src/assets/slide1.jpg";
import logo from "../src/assets/SITBBS_logo.jpg";

const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const institutes = [
    "SiliconTech is a Unit of Silicon University",
    "Silicon Institute of Technology, Sambalpur",
    "Silicon Institute Trust",
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Demo credentials - registration numbers as usernames
    const demoCredentials = {
      "25BCSH71": "123456789",  // Akriti Agarwal
      "25MMCF67": "password"   // Abhipsa Panda
    };

    // Check if username is a valid registration number and password matches
    if (demoCredentials[username] && password === demoCredentials[username]) {
      // Store registration number in localStorage
      localStorage.setItem('userRegdNo', username);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to dashboard with registration number as query parameter
      navigate(`/dashboard?regdNo=${username}`);
    } else {
      alert('Invalid username or password. Use: 25BCSH71 or 25MMCF67 with password 123456789');
    }
  };

  return (
    <div className="login-container">
      <div className="login-navbar">
        <img src={logo} alt="Silicon University Logo" className="logo" />
        <p className="navbar-text">
          SiliconTech is a Unit of Silicon University
        </p>
      </div>
      <div className="login-body">
        <div className="login-box">
          <div className="login-form">
            <div className="login-header">
              <h2>Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">USER NAME</label>
                <input 
                  type="text" 
                  id="username" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Regd No."
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input 
                  type="password" 
                  id="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="institute">INSTITUTE</label>
                <select id="institute" className="input-field">
                  {institutes.map((inst, index) => (
                    <option key={index} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
          </div>
          <div className="login-image">
            <img
              src={slide1}
              alt="Campus View"
              className="social-parent-img"
            />
          </div>
        </div>
      </div>

      <div className="info-cards-container">
        <div className="info-card">
          <div className="info-card-icon">
            <Users size={48} />
          </div>
          <h3>HRMS</h3>
          <ul>
            <li>Employee Profile</li>
            <li>Attendance</li>
            <li>Leave</li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-icon">
            <BarChart size={48} />
          </div>
          <h3>BUDGET</h3>
          <ul>
            <li>Planning</li>
            <li>Workflow</li>
            <li>Utilization</li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-icon">
            <DollarSign size={48} />
          </div>
          <h3>EXPENSES</h3>
          <ul>
            <li>Advance</li>
            <li>Settlement</li>
            <li>Tracking</li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-icon">
            <Truck size={48} />
          </div>
          <h3>TRANSPORT</h3>
          <ul>
            <li>Vehicle</li>
            <li>Route</li>
            <li>Driver</li>
            <li>Tracking</li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-icon">
            <Briefcase size={48} />
          </div>
          <h3>FINANCE</h3>
          <ul>
            <li>Approvals</li>
            <li>Payment</li>
            <li>Collection</li>
            <li>Reports</li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-icon">
            <CreditCard size={48} />
          </div>
          <h3>PAYROLL</h3>
          <ul>
            <li>Calculation</li>
            <li>Payment</li>
          </ul>
        </div>
      </div>

      <footer className="login-footer">
        <p>Copyright © Edusols 2013-2024</p>
        <p>Product Version 2.0</p>
      </footer>
    </div>
  );
};

export default SignInPage;