import express from 'express';

import cors from 'cors'
import { connectDB } from './config/db.js';
import { EventEmitter } from 'events';
import foodRouter from './Routes/foodRouter.js';
import userRouter from './Routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/OrderRouter.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express()
const port = process.env.PORT || 5000


EventEmitter.defaultMaxListeners = 20;

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

app.use(express.json())
app.use(cors())


app.use("/api/food", foodRouter)

app.use('/api/user', userRouter)

app.use('/api/cart', cartRouter)

app.use('/api/order', orderRouter)

app.use("/images", express.static(path.join(_dirname, 'uploads')))



//app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send("Api working")
})

// app.get('/example', (req, res) => {
//   const someCondition = true
//   if (someCondition) {
//     return res.status(200).json({ msg: 'First response' });
//   }
//   return res.status(400).json({ msg: 'Second response' });
// });

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: 'Internal Server Error' })

})

connectDB()

app.listen(port, () => {
  console.log(`server start :${port}`);

})
