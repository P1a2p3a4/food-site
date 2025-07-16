import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
const Header = () => {


    const navigate = useNavigate();


    const handleMenuClick = () => {
        try {
            navigate('/menu')
        } catch (error) {
            console.error('Navigation failed:', error);

        }
    }
    return (

        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favorite food here </h2>
                <p>Choose from a diverse menu <br /> with group
                    of Dishes,Snacks, <br />Dinner items,tiffins,
                    NoN-veg,vge</p>

                <button onClick={handleMenuClick} aria-label="View our full menu">View menu</button>
            </div>
        </div>

    )
}

export default Header
