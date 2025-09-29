import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import "../css/UpdateWorkout.css"

const UpdateWorkout = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated workout:", id)
    navigate("/") 
  }

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>Uppdatera pass #{id}</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <label>
            Titel
            <input type="text" placeholder="Ex. Yoga Flow" />
          </label>

          <label>
            Datum
            <input type="date" />
          </label>

          <label>
            Tid
            <input type="time" />
          </label>

          <label>
            Instruktör
            <input type="text" placeholder="Ex. Anna" />
          </label>

          <label>
            Plats
            <input type="text" placeholder="Ex. Core Gym Göteborg" />
          </label>

          <div className="update-buttons">
            <button type="submit" className="save-btn">Spara</button>
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateWorkout;
