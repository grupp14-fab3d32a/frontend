
import React, { useState } from "react";
import "../css/Confirm.css";    
import { useLocation , useNavigate } from "react-router-dom";

const Confirm = () => {

  const { state } = useLocation();
   const navigate = useNavigate();

  return (
     <div className="confirm-wrapper">
      <div className="confirm-card">
        <div className="confirm-icon">✅</div>
        <h1>Bokning bekräftad!</h1>
        <p>Tack för din bokning. Här är dina uppgifter:</p>

        <div className="confirm-details">
          <p><span>Pass:</span>{state.title}</p>
          <p><span>Datum:</span>{state.dateOnly}</p>
          <p><span>Tid:</span>{state.timeOnly}</p>
          <p><span>Plats:</span>{state.location}</p>
        </div>

                <button 
          className="btn-primary" 
          onClick={() => navigate('/workoutlist')}
        >
          Tillbaka till passlistan
        </button>

      </div>
    </div>
  );
};

export default Confirm;

