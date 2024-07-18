import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', img: '' });

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

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddMenuItem = async () => {
    try {
      await axios.post('http://localhost:8080/menu/add', newMenuItem);
      fetchMenuItems();
      setNewMenuItem({ name: '', description: '', price: '', img: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/menu/delete/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleChangeNewMenuItem = (e) => {
    const { name, value } = e.target;
    setNewMenuItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setNewMenuItem(prevState => ({
          ...prevState,
          img: upload.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      
      <div className="menu-management">
        <h3>Manage Menu Items</h3>
        <div className="add-menu-item">
          <input
            type="text"
            name="name"
            value={newMenuItem.name}
            onChange={handleChangeNewMenuItem}
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={newMenuItem.description}
            onChange={handleChangeNewMenuItem}
            placeholder="Description"
          />
          <input
            type="number"
            name="price"
            value={newMenuItem.price}
            onChange={handleChangeNewMenuItem}
            placeholder="Price"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button onClick={handleAddMenuItem}>Add Item</button>
        </div>
        <div className="menu-items-list">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.img} alt={item.name} className="menu-item-image" />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="reservations-management">
        <h3>View Reservations</h3>
        {/* Add reservation management code here */}
      </div>
    </div>
  );
}

export default AdminDashboard;
