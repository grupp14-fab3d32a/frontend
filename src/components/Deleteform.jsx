import React, { useState} from "react";
import "../css/Confirm.css";  
  import "../css/Deleteform.css";

const CreateClass = () => {
  const [formData, setFormData] = useState({title:'', description:'' });

  const handleChange = (e) => {
    const {id, value } = e.target
    setFormData({...formData, [id]: value})
  }

   const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }
  
  return (
    
        
        <form className="form">

        <h6 className='form-title'>Ta bort pass</h6>
 
        <button className="close-button" onClick={handleClose} type="button"> × </button>

          <div className="form-group">
            <input type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Titel" />
          </div>

          <div className="form-group">
            <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Beskrivning"></textarea>
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

          <button type="submit" className='button button-delete'>Ta bort pass</button>
          
        </form>
      
    
  );
};

export default CreateClass;