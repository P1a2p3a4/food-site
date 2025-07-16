import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Fooditems from '../fooditems/Fooditems.jsx'
//import { food_list } from '../../assets/assets'
import './fooddisplay.css'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            <h2> Top Dishes near you</h2>
            <hr className='hrline' />
            <div className="food-display-list">

                {food_list.map((item, index) => {


                    {
                        if (category === 'Everything' || category === item.category) {

                            return <Fooditems
                                key={index}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                description={item.description} />




                        }
                    }


                })}
            </div>
        </div>
    );
}

export default FoodDisplay



