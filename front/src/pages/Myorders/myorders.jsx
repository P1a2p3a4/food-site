//  import React, { useContext, useEffect, useState } from 'react';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';
// import './myorders.css';

// const MyOrders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [orders, setOrders] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.post(
//                 `${url}/api/order/userOrders`,
//                 {},
//                 { headers: { token } }
//             );
//             setOrders(response.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch orders:", error.message);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className='my-orders'>
//             <h2 className='my-orders__title'>My Orders</h2>
//             <div className='my-orders__container'>
//                 {orders.map((order, index) => (

//                     <div key={index} className='my-orders__order'>
//                         <img className='my-orders__icon' src={assets.parcel_icon} alt="Parcel Icon" />
//                         <p className='my-orders__items'>
//                             {order.items.map((item, idx) => (
//                                 <span key={idx}>
//                                     {item.name}x{item.quantity}
//                                     {idx !== order.items.length - 1 && ', '}
//                                 </span>
//                             ))}
//                         </p>
//                         <p className='my-orders__amount'>₹{order.amount}</p>
//                         <p className='my-orders__count'>Items: {order.items.length}</p>
//                         <p className='my-orders__status'>
//                             <span className='my-orders__status-dot'>&#x25cf;</span>
//                             <b>{order.status}</b>
//                         </p>
//                         <button className='my-orders__track-btn'>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;


import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
//import { assets } from '../../assets/assets';
import './myorders.css';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.post(url + '/api/order/userOrders', {}, { headers: { token } })
        setData(response.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p> {order.items.map((item, index) => { 
                                if(index === order.items.length - 1){
                                    return item,name + "X" + item.quantity
                                }
                                else{
                                    return item.name+ "X" + item.quantity+","
                                }
                            })} </p>
                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p> <span>&#x25cf;</span> </p>
                            <p><b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders;