 import React from 'react';
 
import './menu.css';

const menuItems = [
    {
        _id: "1",
        menu_name: "salad",
        menu_image: "./src/assets/food-img/1.jpg"
    },
    {
        _id: "2",
        menu_name: "Rolls",
        menu_image: "./src/assets/food-img/2.avif"
    },
    {
        _id: "3",
        menu_name: "Momos",
        menu_image: "./src/assets/food-img/3.jpg"
    },
    {
        _id: "4",
        menu_name: "Sandwich",
        menu_image: "./src/assets/food-img/4.jpg"
    },
    {
        _id: "5",
        menu_name: "Cake",
        menu_image: "./src/assets/food-img/5.jpg"
    },
    {
        _id: "6",
        menu_name: "Pure veg",
        menu_image: "./src/assets/food-img/6.png"
    },
    {
        _id: "7",
        menu_name: "pasta",
        menu_image: "./src/assets/food-img/7.webp"
    },
    {
        _id: "8",
        menu_name: "Noodles",
        menu_image: "./src/assets/food-img/8.png"
    },
    {
        _id: "9",
        menu_name: "Pizza",
        menu_image: "./src/assets/food-img/9.png"
    },
    {
        _id: "10",
        menu_name: "FrenchFries",
        menu_image: "./src/assets/food-img/11.png"
    },
    {
        _id: "11",
        menu_name: "Sricky Orange Chicken",
        menu_image: "./src/assets/food-img/21.jpg"
    },
    {
        _id: "12",
        menu_name: "Burgers",
        menu_image: "./src/assets/food-img/10.webp"
    }
]


const Menu = () => {
  return (
    <div className="menu" id="menu">
      <h1>Our Menu</h1>
      <div className="menu-list">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
