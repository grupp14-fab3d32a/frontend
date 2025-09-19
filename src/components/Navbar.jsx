import React, { useState, useEffect, useRef } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [showGyms, setShowGyms] = useState(false)
  const dropdownRef = useRef(null)

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
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

            <li><Link to="/PassList">Gruppträning</Link></li>
          </ul>

          <div className="navbar-login">
            <Link to="/signin">
              <FaUserCircle className="login-icon" />
            </Link>
          </div>
        </div>

        {/* Hamburger för mobil */}
        <button className="navbar-toggle">☰</button>
      </div>
    </nav>
  )
}

export default Navbar
