import React, { useState} from "react";
import "../css/Confirm.css";  
  import "../css/Create.css";

const CreateClass = () => {
  const [formData, setFormData] = useState({title:'', description:'' });

  const handleChange = (e) => {
    const {id, value } = e.target
    setFormData({...formData, [id]: value})

  }
  
  return (
    <div className="create-wrapper">
      <div className="create-card">
        <h6 className='form-title'>Skapa nytt pass</h6>
        <p>Fyll i informationen nedan för att skapa ett nytt pass:</p>

        <form className="create-form">
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

          <button type="submit" className='button button-secondary'>Skapa pass</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
