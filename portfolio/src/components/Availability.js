import React from 'react';
import './Availability.css';

const Availability = () => {
  // Vous pouvez changer cette valeur selon votre disponibilité actuelle
  const isAvailable = true;
  const availabilityDate = "20 avril 2023"; // Date de disponibilité si non disponible actuellement
  
  return (
    <div className="availability-indicator">
      <div className={`status-dot ${isAvailable ? 'available' : 'busy'}`}></div>
      <div className="availability-text">
        {isAvailable ? (
          <span className="availability-status">Disponible maintenant</span>
        ) : (
          <>
            <span className="availability-status">Disponible à partir du</span>
            <span className="availability-details">{availabilityDate}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Availability;