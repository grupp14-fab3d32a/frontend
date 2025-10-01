import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../css/Home.css'

const Home = () => {

  const location = useLocation()
  const [logoutMessage, setLogoutMessage] = useState("")

  useEffect(() => {
    if (location.state?.logoutMessage) {
      setLogoutMessage(location.state.logoutMessage)
    }
  }, [location.state])

  return (
    <div className="home">
      <header className="hero">
        {logoutMessage && (
          <div className="logout-box">
            <span>{logoutMessage}</span>
            <button className="close-btn" onClick={() => setLogoutMessage("")}>×</button>
          </div>
        )}
        <div className="hero-overlay">
          <h1>Välkommen till Core Gym club</h1>
          <p>Din plats för styrka, hälsa och gemenskap</p>
        </div>
      </header>

      <section className="about">
        <div className="about-text">
          <h2>Om vårt gym</h2>
          <p>
            Vi erbjuder toppmodern utrustning, erfarna tränare och en inspirerande miljö
            för alla nivåer från nybörjare till elit. Här hittar du både styrketräning,
            gruppass och personlig träning anpassad efter dina mål.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1" alt="Gym" />
        </div>
      </section>
    </div>
  )
}

export default Home
