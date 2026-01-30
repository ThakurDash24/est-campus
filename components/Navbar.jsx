import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../src/assets/SITBBS_logo.jpg";
import akritiProfile from "../src/assets/Akriti.jpeg";
import abhipsaProfile from "../src/assets/Abhipsa Panda.jpeg";
import defaultProfile from "../src/assets/animesh.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBell, FaGraduationCap, FaChevronDown, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ onToggleSidebar, sidebarOpen, studentName, studentRegdNo }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  // Get profile image based on registration number
  const getProfileImage = () => {
    if (studentRegdNo === "25BCSH71") {
      return akritiProfile;
    } else if (studentRegdNo === "25MMCF67") {
      return abhipsaProfile;
    } else {
      return defaultProfile;
    }
  };

  // Get full name for dropdown
  const getFullName = () => {
    if (studentRegdNo === "25BCSH71") {
      return "Akriti Agarwal";
    } else if (studentRegdNo === "25MMCF67") {
      return "Abhipsa Panda";
    } else {
      return studentName || "Student";
    }
  };

  // Format student name to show only first name if full name is long
  const getDisplayName = () => {
    const fullName = getFullName();
    if (!fullName) return "Student";
    
    const names = fullName.split(' ');
    return names[0]; // Show only first name
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userRegdNo');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <RxHamburgerMenu 
          className="hamburger-icon" 
          onClick={onToggleSidebar}
        />
        <h3>SiliconTech is a Unit of Silicon University</h3>
      </div>
      <div className="navbar-right">
        <FaBell className="notification-icon" />
        <div className="grievance">
          <FaGraduationCap />
          <span>Grievance</span>
        </div>
        <div className="profile-container" ref={profileRef}>
          <div className="profile" onClick={toggleProfileDropdown}>
            <img 
              src={getProfileImage()} 
              alt="User" 
              className="profile-pic" 
            />
            <span className="profile-name">{getDisplayName()} (Student)</span>
            <FaChevronDown className={`dropdown-arrow ${profileDropdownOpen ? 'rotated' : ''}`} />
          </div>
          
          {profileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="profile-img"
                />
                <h3 className="profile-fullname">{getFullName()}</h3>
                <p className="profile-role">Student ID: {studentRegdNo || "N/A"}</p>
              </div>

              <div className="profile-options">
                <div className="dropdown-item">
                  <FaUser />
                  <span>Student Profile</span>
                </div>
                <div className="dropdown-item">
                  <FaUser />
                  <span>Parent Dashboard</span>
                </div>
                <div className="dropdown-item">
                  <FaCog />
                  <span>Account Settings</span>
                </div>
                <div className="dropdown-item logout" onClick={handleSignOut}>
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;