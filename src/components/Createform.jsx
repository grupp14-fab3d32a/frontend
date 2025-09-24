import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Confirm.css";  
import "../css/Createform.css";

const CreateClass = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    date: '', 
    time: '', 
    trainer: ''
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
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Titel får vara max 50 tecken';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Beskrivning är obligatorisk';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Beskrivning måste vara minst 10 tecken';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Beskrivning får vara max 500 tecken';
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

    try { //lägg in API url sen
      const res = await fetch("", {
        method:'POST', 
        headers: {
          'Content-type' : 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('Pass har skapats!');
        setFormData({title: '', description: '', date: '', time: '', trainer: ''});
        if (onClose) {
          onClose();
        }
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (error) {
      alert('Kunde inte ansluta till servern.');
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
              id="time" 
              value={formData.time}
              onChange={handleChange}
              placeholder="Tid" 
            />
          </div>

          <div className="form-group">
            <input 
              type="text" 
              id="trainer" 
              value={formData.trainer}
              onChange={handleChange}
              placeholder="Tränare" 
            />
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

export default CreateClass;