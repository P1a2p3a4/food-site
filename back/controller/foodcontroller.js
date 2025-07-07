

import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add Food Controller

const addFood = async (req, res) => {
  
    const image_filename = `${req.file.filename}`;



    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    try {
      await food.save();
      res.json({ success: true, message: "food added successfuly" })
    }
    catch (error) {
      console.error("Error adding food:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while adding food",
      });
    }
    }
  
  // Get All Foods
  
  const listFood = async (req, res) => {
    try {
      const foods = await foodModel.find();
      res.status(200).json({ success: true, data: foods });
    } catch (e) {
      console.log("Error in listFood:", e.message);
      res.status(500).json({ success: false, message: e });
    }
  };
  
  
  // delete Food items
  
  const removeFood = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
      if (!food) return res.status(404).json({ success: false, message: "Food not found" });
  
      // Delete image file
      
      if (food.image) {
        fs.unlink(`uploads/${food.image}`, (err) => {
          if (err) console.log("Failed to delete image:", err.message);
        });
      }
  
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food removed" });
    } catch (e) {
      console.log("Error in removeFood:", e.message);
      res.status(500).json({ success: false, message: e.message });
    }
  };
  
  export { addFood, listFood, removeFood }
