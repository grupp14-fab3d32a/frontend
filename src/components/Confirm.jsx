
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
          <p><span>Datum:</span> 2023-10-01</p>
          <p><span>Tid:</span> 10:00</p>
          <p><span>Plats:</span> Stockholm</p>
        </div>

                <button 
          className="btn-primary" 
          onClick={() => navigate('/PassList')}
        >
          Tillbaka till passlistan
        </button>

      </div>
    </div>
  );
};

export default Confirm;

