import React, { useState} from "react";
import "../css/Confirm.css";  
import "../css/Createform.css";

const CreateClass = ({ onClose }) => {
  const [formData, setFormData] = useState({title:'', description:'' });
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    
    // Here you can proceed with form submission
    console.log('Form is valid', formData);

   /* const res = await fetch('', {
      method:'post', 
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify(formData)
    })*/
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }
  
  return (
    <div className="container">
      <div className='auth-frontpage'>
        <form className="form" onSubmit={handleSubmit} noValidate>

          <h6 className='form-title'>Skapa nytt pass</h6>
          <p>Fyll i informationen nedan för att skapa ett nytt pass:</p>
   
          <button className="close-button" onClick={handleClose} type="button"> × </button>

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

          {/* 
          <div className="form-group">
            <input type="date" id="date" placeholder="Datum" />
          </div>

          <div className="form-group">
            <input type="time" id="time" placeholder="Tid" />
          </div>

          <div className="form-group">
            <input type="text" id="trainer" placeholder="Tränare" />
          </div>
          */}

          <button type="submit" className='button button-secondary'>Skapa pass</button>
          
        </form>
      </div>
    </div>
  );
};

export default CreateClass;