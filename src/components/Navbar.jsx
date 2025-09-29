import React, { useState, useEffect, useRef } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import '../css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'



const Navbar = () => {
  const [showGyms, setShowGyms] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const userDropdownRef = useRef(null)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const gyms = [
    "CORE Gym Stockholm",
    "CORE Gym Göteborg",
    "CORE Gym Malmö",
    "CORE Gym Uppsala"
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGyms(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setShowUserDropdown(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo-link">
          <h1 className="navbar-logo">
            <span className="logo-highlight">CORE</span> GYM CLUB
          </h1>
        </Link>

        {/* Links + Login */}
        <div className="navbar-right">
          <ul className="navbar-links">
            <li className="dropdown" ref={dropdownRef}>
              <button
                className="link-button"
                onClick={() => setShowGyms(!showGyms)}
              >
                Hitta gym ▾
              </button>

              {showGyms && (
                <ul className="dropdown-menu">
                  {gyms.map((gym, index) => (
                    <li key={index}><a href="#">{gym}</a></li>
                  ))}
                </ul>
              )}
            </li>

            <li><Link to="/workoutlist">Gruppträning</Link></li>
          </ul>

          <div className="navbar-login" ref={userDropdownRef}>
            {user ? (
              <>
                <button className="link-button" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  <FaUserCircle className="login-icon" />
                </button>
                {showUserDropdown && (
                  <ul className="dropdown-menu user-dropdown">
                    <li><Link to="/profile">Profil</Link></li>
                    <li><Link to="/workouthistory">Träningshistorik</Link></li>
                    <li><button onClick={handleLogout}>Logga ut</button></li>
                  </ul>
                )}
              </>
            ) : (
              <Link to="/signin">
                <FaUserCircle className="login-icon" />
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger för mobil */}
        <button className="navbar-toggle">☰</button>
      </div>
    </nav>
  )
}

export default Navbar
