import React, { useEffect, useState } from 'react'
import "./add.css"
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({urlprop}) => {
    const url = "http://localhost:5000"

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",

        description: "",

        price: "",

        category: "Salad"
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;

        const value = event.target.value;
        
        setData(data => ({ ...data, [name]: value }))
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0])
    }



    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('category', data.category)
        formData.append('image', image)

        try {
            const response = await axios.post(`${url}/api/food/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })



            if (response.data.success) {
                console.log('data added successfullt');

                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false)
                toast.success(response.data.message)

            } else {
                console.log('food not got added to db');

                toast.error(response.data.message);


            }
        } catch (error) {
            toast.error("server error.Try again later")
            console.log(error);

        }

    }

    useEffect(() => {
        console.log(data);

    }, [data])



    const [item, setItem] = useState(null);


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch('/api/some-data');
                const data = await res.json();
                setItem(data);
            } catch (error) {
                console.error('failes to fetch item:', error);
            }
        };
        fetchItem();
    }, []);

    if (!item) return <p>Loading...</p>;





    return (


        <div className='add'>

            {/* {item && <div>{item.name}</div>} */}
            <form className='flex-col' action="" onSubmit={onSubmitHandler}>

                <div className='add-image-uploadflex-col'>
                    <p>Upload Image</p>

                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
                    </label>

                    <input
                        type="file"
                        id='image'
                        hidden
                        required
                        name='image'
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>


                <div className='add-product-nameflex-col'>

                    <p>Product Name</p>

                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />

                </div>

                <div className='add-product-descriptionflex-col'>
                    <p>Product Description</p>

                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        id="" rows='6'
                        placeholder='Write Content here'
                        required>

                    </textarea>
                </div>

                <div className='add-category-price'>
                    <div className='add-categoryflex-col'>
                        <p>Product Category</p>


                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category" id="">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwitch">Sandwitch</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>


                    </div>
                    <div className='add-price flex-col'>
                        <p>product price</p>

                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="Number"
                            name='price'
                            required
                            placeholder="₹20" />

                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add


