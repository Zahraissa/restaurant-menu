import React, { useState } from 'react';
import './Reservation.css';

function Reservation() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reservationDetails = {
      name,
      date,
      time,
      partySize,
    };

    console.log("Reservation made:", reservationDetails);

    // Simulate sending data to the admin (backend server)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationDetails),
      });

      if (response.ok) {
        alert("Reservation submitted successfully!");
        // Clear the form
        setName('');
        setDate('');
        setTime('');
        setPartySize(1);
      } else {
        alert("Failed to submit reservation. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="reservation-container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <label>
          Party Size:
          <input type="number" value={partySize} onChange={(e) => setPartySize(e.target.value)} required min="1" />
        </label>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default Reservation;
