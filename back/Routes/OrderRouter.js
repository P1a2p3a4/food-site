import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { placeOrder, userOrders } from '../controller/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/placeOrder', authMiddleware, placeOrder)

orderRouter.post('/userOrders', authMiddleware, userOrders)

export default orderRouter