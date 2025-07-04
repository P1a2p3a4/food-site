import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";


// const placeOrder = async (req, res) => {
//     const frontendUrl = "http://localhost:5173"
//     try {

//         const newOrder = new OrderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address

//         })


//         await newOrder.save()

//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })


//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100 ,
//             },
//             quantity: item.quantity,
//         }))

//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 2000,
//             },
//             quantity: 1,
//         })

//         const session = await stripe.checkout.session.create({
//             line_items: line_items,
//             mode: "payment",
//             success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
//         })
//         res.json({ success: true, session_url: session.url })

//     } catch (error) {
//         console.error("Stripe Checkout Error:", error.message);
//         res.status(500).json({success:false,message:error.message})


//     }


// }



const placeOrder = async (req, res) => {

    console.log('PlaceOrder function is working');

    const { userId, items, amount, address, email } = req.body;

    const newOrder = new OrderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address
    })
    await newOrder.save()

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });




    // const product = await stripe.products.create({
    //     name: "Product1"
    // })

    // if (product) {
    //     const price = await stripe.prices.create({
    //         product: `${product.id}`,
    //         unit_amount: 100 * 1000,
    //         currency: "inr"
    //     })
    // }
    // if (price.id) {




    const line_items = req.body.items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100 * 80
        },
        quantity: item.quantity
    }))


    line_items.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery Charges"
            },
            unit_amount: 2 * 100 * 80
        },
        quantity: 1
    })



    const session = await
        stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
            customer_email: email
        })
    res.json({ success: true, session_url: session.url })
}



const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await OrderModel.find({ userId })
        res.json({ success: true, data: orders })
    } catch (e) {
        console.log(error);
        res.json({ success: false, message: error })

    }
}

export { placeOrder, userOrders }