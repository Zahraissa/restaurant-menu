import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ quantity: {}, address: '' });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/menu/get');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleQuantityChange = (id, value) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      quantity: {
        ...prevDetails.quantity,
        [id]: value,
      }
    }));
  };

  const handleAddressChange = (e) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      address: e.target.value,
    }));
  };

  const addToOrder = (item) => {
    const quantity = orderDetails.quantity[item.id] || 1; // Default to 1 if not specified

    const newOrder = {
      id: item.id,
      name: item.name,
      quantity: parseInt(quantity),
      price: item.price,
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      quantity: {
        ...prevDetails.quantity,
        [item.id]: '', // Reset quantity for the item
      }
    }));
  };

  const handleSubmitOrder = () => {
    const address = orderDetails.address;

    if (!address) {
      alert("Please enter your address before submitting the order.");
      return;
    }

    if (orders.length === 0) {
      alert("Please add at least one item to your order.");
      return;
    }

    console.log("Order submitted:", {
      address,
      orders,
    });

    // Here you would send the order to the server/admin
    // e.g., axios.post('/api/orders', { address, orders });

    // Reset the order details after submission
    setOrderDetails({ quantity: {}, address: '' });
    setOrders([]);
  };

  return (
    <div>
      <h2>Our Menu</h2>
      <div className="menu">
        {menuItems.map(item => (
          <div className="menu-item" key={item.id}>
            <img src={item.img} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                placeholder="Quantity"
                value={orderDetails.quantity[item.id] || ''}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                min="1"
                className="quantity-input"
              />
              <button onClick={() => addToOrder(item)} className="add-to-order-button">Add to Order</button>
            </div>
          </div>
        ))}
      </div>
      <div className="order-section">
        <h2>Your Details</h2>
        <input
          type="text"
          placeholder="Enter your address"
          value={orderDetails.address}
          onChange={handleAddressChange}
          className="address-input"
        />
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                {order.quantity} x {order.name} (${order.price * order.quantity})
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in order.</p>
        )}
        <button onClick={handleSubmitOrder} className="submit-order-button">Submit Order</button>
      </div>
    </div>
  );
}

export default Menu;
