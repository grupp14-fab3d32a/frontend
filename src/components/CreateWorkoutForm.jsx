import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Confirm.css";  
import "../css/CreateWorkoutForm.css";
import { createWorkout } from "../services/scheduleApi";

const CreateWorkout = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    date: '', 
    startTime: '', 
    instructor: '',
    location: '',
    totalSpots: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {id, value } = e.target
    setFormData({...formData, [id]: value})
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({...errors, [id]: ''})
    }
  }

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Titel är obligatorisk';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Titel måste vara minst 3 tecken';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Titel får vara max 100 tecken';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Beskrivning är obligatorisk';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Beskrivning måste vara minst 10 tecken';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Beskrivning får vara max 2000 tecken';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Plats är obligatorisk';
    }
    else if (formData.location.trim().length < 3) {
      newErrors.location = 'Plats måste vara minst 3 tecken';
    } else if (formData.location.trim().length > 100) {
      newErrors.location = 'Plats får vara max 100 tecken';
    }

    // Instructor validation
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instruktör är obligatorisk';
    }
    else if (formData.instructor.trim().length < 3) {
      newErrors.instructor = 'Instruktör måste vara minst 3 tecken';
    } else if (formData.instructor.trim().length > 100) {
      newErrors.instructor = 'Instruktör får vara max 100 tecken';
    }
    // Total spots validation
     if (!formData.totalSpots) {
    newErrors.totalSpots = 'Antal platser är obligatoriskt';
  } else if (formData.totalSpots < 1) {
    newErrors.totalSpots = 'Minst 1 plats krävs';
  } else if (formData.totalSpots > 50) {
    newErrors.totalSpots = 'Max 50 platser tillåtet';
  }

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try { 
      await createWorkout(formData);

        alert('Pass har skapats!');
        setFormData({title: '', description: '', date: '', startTime: '', instructor: '', totalSpots: '',});
        if (onClose) {
          onClose();
      }
      
    } catch (error) {
        console.error('API error:', error);
        alert(error.message || 'Något gick fel. Försök igen.');
      }
  }

  const handleCancel = (e) => {
    e.preventDefault(); 
    navigate("/");
  }
  
  return (
    <div className="container">
      <div className='auth-frontpage'>
        <form className="form" onSubmit={handleSubmit} noValidate>

          <h6 className='form-title'>Skapa nytt pass</h6>
          

          <div className="form-group">
            <input 
              type="text" 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Titel"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <textarea 
              id="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Beskrivning"
              className={errors.description ? 'error' : ''}
              rows="4"
            ></textarea>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <input 
              type="date" 
              id="date" 
              value={formData.date}
              onChange={handleChange}
              placeholder="Datum" 
            />
          </div>

          <div className="form-group">
            <input 
              type="time" 
              id="startTime" 
              value={formData.startTime}
              onChange={handleChange}
              placeholder="Tid" 
            />
          </div>

          <div className="form-group">
            <input 
              type="text" 
              id="instructor" 
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Instruktör" 
            />
          </div>

          <div className="form-group">
            <input 
              type="text" 
              id="location" 
              value={formData.location}
              onChange={handleChange}
              placeholder="Plats" 
            />
          </div>
          
        <div className="form-group">
               <input 
               type="number" 
               id="totalSpots" 
               value={formData.totalSpots} 
               onChange={handleChange} 
               placeholder="Totalt antal platser"
               min="1"
               max="100"
               className={errors.totalSpots ? 'error' : ''} />
                {errors.totalSpots && <span className="error-message">{errors.totalSpots}</span>}
        </div>


          <div className="button-group">
            <button type="submit" className='button button-secondary'>
              Skapa pass
            </button>
            
            <button 
              type="button" 
              className='button button-delete' 
              onClick={handleCancel}>
              Avbryt
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateWorkout;