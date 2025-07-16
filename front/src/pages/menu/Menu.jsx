 import React from 'react';
 
import './menu.css';

const menuItems = [
    {
        _id: "1",
        name: "salad",
        image: "./src/assets/food-img/1.jpg"
    },
    {
        _id: "2",
        name: "Rolls",
        image: "./src/assets/food-img/2.avif"
    },
    {
        _id: "3",
        name: "Momos",
        image: "./src/assets/food-img/3.jpg"
    },
    {
        _id: "4",
        name: "Sandwich",
        image: "./src/assets/food-img/4.jpg"
    },
    {
        _id: "5",
        name: "Cake",
        image: "./src/assets/food-img/5.jpg"
    },
    {
        _id: "6",
        name: "Pure veg",
        image: "./src/assets/food-img/6.png"
    },
    {
        _id: "7",
        name: "pasta",
        image: "./src/assets/food-img/7.webp"
    },
    {
        _id: "8",
        name: "Noodles",
        image: "./src/assets/food-img/8.png"
    },
    {
        _id: "9",
        name: "Pizza",
        image: "./src/assets/food-img/9.png"
    },
    {
        _id: "10",
        name: "FrenchFries",
        image: "./src/assets/food-img/11.png"
    },
    {
        _id: "11",
        name: "Sricky Orange Chicken",
        image: "./src/assets/food-img/21.jpg"
    },
    {
        _id: "12",
        name: "Burgers",
        image: "./src/assets/food-img/10.webp"
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














// import React from 'react';
// import './menu.css';

// const menuItems = [
//   { _id: "1", name: "Salad", image: "./src/assets/food-img/1.jpg", price: "₹150" },
//   { _id: "2", name: "Rolls", image: "./src/assets/food-img/2.avif", price: "₹100" },
//   { _id: "3", name: "Momos", image: "./src/assets/food-img/3.jpg", price: "₹120" },
//   { _id: "4",
//          name: "Sandwich",
//          image: "./src/assets/food-img/4.jpg"
//      },
   
// ];

// const Menu = () => {
//   return (
//     <div className="menu" id="menu">
//       <h1>Our Menu</h1>
//       <div className="menu-list">
//         {menuItems.map((item) => (
//           <div className="menu-item" key={item._id}>
//             <img src={item.image} alt={item.name} />
//             <h3>{item.name}</h3>
//             <p>{item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;
