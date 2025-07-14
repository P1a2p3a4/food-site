import React, { useEffect, useState } from 'react'

import "./list.css"
import axios from 'axios'

import { toast } from 'react-toastify'
import { food_list } from '../../assets/assets'


const List = ({ urlprop }) => {

  const url = "http://localhost:5000"

  const [list, setList] = useState([])


  const fetchList = async () => {
    try {
      const response = await axios.get(`${urlprop}/api/food/list`)
      //console.log(response.data);

      if (response.data.success) {
        setList(response.data.data)

      } else {
        toast.error("Error")
      }
    } catch (error) {
      console.error('Failed to fetch food list:', error);
      alert('Failed to fetch food list. Please make sure the backend server is running.');
    }
  }


  const removeFood = async (foodId) => {


    try {
      const response = axios.post(`${url}/api/food/del`, { id: foodId })

      await fetchList()
      console.log((await response).data.success);

      if (response.data.success) {
        toast.success((await response).data.message)
      }
      else {
        toast.error('Error')
      }


    } catch (error) {

    }




  }


  useEffect(() => {
    fetchList()
  })

  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${urlprop}/images/` + item.image} alt="item images" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>

                <p onClick={() => removeFood(item._id)} className='cursor'>x</p>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List


 