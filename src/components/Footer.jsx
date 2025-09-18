import React from 'react'
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Öppettider</h4>
          <ul>
            <li>Måndag – Fredag: 06:00 – 22:00</li>
            <li>Lördag: 08:00 – 20:00</li>
            <li>Söndag: 08:00 – 18:00</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Adress</h4>
          <p>Gymmet AB</p>
          <p>Storgatan 12</p>
          <p>123 45 Stockholm</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Gymmet AB. Alla rättigheter förbehållna.</p>
      </div>
    </footer>
  )
}

export default Footer
