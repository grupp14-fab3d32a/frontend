import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import "../css/UpdateWorkout.css"
import { updateWorkout, deleteWorkout } from '../services/scheduleApi'

const UpdateWorkout = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
  title: '',
  date: '',
  startTime: '',
  instructor: '',
  location: '',
  totalSpots: ''
  
});

  const handleDelete = async () => {
  const confirmDelete = window.confirm("Är du säker på att du vill ta bort detta pass?");
  if (!confirmDelete) return;

  try {
    await deleteWorkout(id);
    alert("Passet har tagits bort.");
    navigate("/");
  } catch (error) {
    alert("Fel vid borttagning: " + error.message);
  }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updatedWorkout = { ...formData, Id: id };

      await updateWorkout(id, updatedWorkout);
      alert('Passet har uppdaterats!');
      navigate("/")
    } catch (error) {
      alert('Fel vid uppdatering: ' + error.message);
    }
  };

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>Uppdatera pass #{id}</h2>

        <form onSubmit={handleSubmit} className="update-form">
          <label>
            Titel
            <input type="text" placeholder="Ex. Yoga Flow" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </label>
          <label>
            Datum
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </label>
          <label>
            Tid
            <input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
          </label>
          <label>
            Instruktör
            <input type="text" placeholder="Ex. Anna" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} />
          </label>
          <label>
            Plats
            <input type="text" placeholder="Ex. Core Gym Göteborg" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </label>
          <label>
            Antal platser
            <input type="number" placeholder="Ex. 20" value={formData.totalSpots} onChange={(e) => setFormData({ ...formData, totalSpots: e.target.value })} />
          </label>

          <div className="update-buttons">
            <button type="submit" className="save-btn">
              Spara
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              Avbryt
            </button>
            <button type="button" className="delete-btn" onClick={handleDelete}>
            Radera pass
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default UpdateWorkout;
