import React, { useState } from 'react';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </label>
        <label>
          Comments:
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} required />
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
