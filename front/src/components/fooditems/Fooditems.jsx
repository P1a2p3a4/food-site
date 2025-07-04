import React, { useContext, useState } from 'react'
import './fooditem.css'
import { StoreContext } from '../../context/StoreContext'
import { food_list } from '../../assets/assets'

const Fooditems = ({ id, name, image, price, description }) => {

    const { cartItems, addToCart,  removeFromCart } = useContext(StoreContext)

    // const [itemcount, setitemCount] = useState(0)
    //   function func1 (v){
    //     console.log(v.target.value);
    //     let var1 = parseInt(v.target.value)
    //     setitemCount(var1)
    //   }
    return (
        <div className='food-item'>



            <div className='food-item-image-container'>
                <img src={image} alt={name} />
            </div>
            <div className='food-item-info'>

                <div className='food-item-name-reting'>
                    <h3>{name}</h3>
                    <img src='./Src/assets/food-list/rating.png' alt="rating" />
                </div>

                {

                    !cartItems[id] ? <button className='add' onClick={() => addToCart(id)}>ADD</button> :
                        <div className='food-item-counter'>
                            <img onClick={() =>  removeFromCart(id)} src="./Src/assets/food-list/remove.png" alt="remove icon" />
                            <p>{cartItems[id]}</p>

                             {/* <input type="text" onChange={func1} />   */}

                            <img onClick={() => addToCart(id)} src="./Src/assets/food-list/add.png" alt="" />
                        </div>

                }

                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'><img src="./Src/assets/food-list/rupee.png" alt="" />{price}</p>
            </div>


        </div>







    )
}

export default Fooditems
