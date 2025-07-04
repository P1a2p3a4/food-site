import React from "react";
import "./sidebar.css"
import { assets } from "../../assets/assets"
import { NavLink } from "react-router-dom";

const sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <div className="sidebar-option">
                    <NavLink to='/add' className='sidebar-option'>
                        <img src={assets.add_icon} alt="add-icon" />
                        <p>Add items</p>
                    </NavLink>
                </div>

                <div className="sidebar-option">
                    <NavLink to='/list' className='sidebar-option'>
                        <img src={assets.order_icon} alt="order-icon" />
                        <p>List items</p>
                    </NavLink>
                </div>


                <div className="sidebar-option">
                    <NavLink to='/orders' className='sidebar-option'>  
                    <img src={assets.order_icon} alt="order-icon" />
                    Orders
                    </NavLink>
                </div>
            </div>
        </div>
    )
}


export default sidebar