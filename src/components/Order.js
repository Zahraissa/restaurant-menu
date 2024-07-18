import React, { useState } from 'react';

function Order() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order logic
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Delivery:
          <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Order;
