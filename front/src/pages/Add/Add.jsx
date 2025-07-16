 
 
import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/food/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server error. Try again later");
    }
  };

  return (
    <div className="add-container">
      <form className="product-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Upload Image</label>
          <label htmlFor="image-upload" className="image-upload">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="Upload preview" 
              className="upload-preview"
            />
            <input
              id="image-upload"
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here"
            required
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Product Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="£20"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default Add;