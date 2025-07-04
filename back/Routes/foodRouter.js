import express from 'express';
import { addFood, listFood, removeFood } from '../controller/foodcontroller.js';
import multer from 'multer';



const foodRouter = express.Router();


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


const upload = multer({ storage: storage });


// foodRouter.get('/list', async (req, res) => {
//     res.json([
//         { id: 1, name: "pizza" },
//         { id: 2, name: "Burger" }
//     ])
// })




foodRouter.post('/add', upload.single('image'), addFood);
 
foodRouter.get('/list', listFood);
foodRouter.post('/del', removeFood);


// foodRouter.get('/food/list', (req, res) => {
    
//     res.json(food_list)
// })


export default foodRouter;
