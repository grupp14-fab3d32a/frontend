import React from 'react'
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">CORE GYM CLUB</h1>

        <ul className="navbar-links">
          <li><a href="#">Hitta gym</a></li>
          <li><a href="#">Gruppträning</a></li>

        </ul>

        <button className="navbar-toggle">☰</button>
      </div>
    </nav>
  )
}

export default Navbar

