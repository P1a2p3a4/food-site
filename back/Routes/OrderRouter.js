import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { placeOrder, userOrders } from '../controller/orderController.js'

const orderRoter = express.Router()

orderRoter.post('/placeOrder', authMiddleware, placeOrder)

orderRoter.post('/userOrders', authMiddleware, userOrders)

export default orderRoter