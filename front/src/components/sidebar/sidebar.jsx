 import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `sidebar-option ${isActive ? 'active' : ''}`
          }
        >
          <img src={assets.add_icon} alt="add-icon" />
          <p>Add items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebar-option ${isActive ? 'active' : ''}`
          }
        >
          <img src={assets.order_icon} alt="list-icon" />
          <p>List items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-option ${isActive ? 'active' : ''}`
          }
        >
          <img src={assets.order_icon} alt="orders-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;