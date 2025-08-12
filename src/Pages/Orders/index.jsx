import Button from '@mui/material/Button';
import React, { useState } from 'react'

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from '../../Componenets/Badge';
import SearchBox from '../../Componenets/SearchBox';
//thsi page for recent orders
const Orders=() =>{
    const [isOpenOrderProduct, setisOpenOrderProduct]=useState(null);
          const isShowOrderProduct=(idx)=>{
              if(isOpenOrderProduct===idx){
                  setisOpenOrderProduct(null);
              }else
              setisOpenOrderProduct(idx);
          }
  return (
    <div className='card my-3 shadow-md sm:rounded-lg bg-white'>
      <div className='flex items-center justify-between px-5 py-4'>
        <h2 className='text-[19px] font-[600] mt-2'>Recent Orders</h2>
        <div className='w-[40%] '>
            <SearchBox/>
        </div>
      </div>
      <div>
         
         <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md mt-5">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3">
                            &nbsp;
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Products</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">PinCode</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">User Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]"><Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] " onClick={()=>{isShowOrderProduct(0)}}>
                                {
                                    isOpenOrderProduct===0? 
                                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                    :
                                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                }
                            </Button></td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>pay_PTMoqESsdl562
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">Android 15</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">Shivanand Gupta</td>
                            <td className="px-6 py-4 font-[500]">6394176235</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className="block w-[400px]">
                                    Hi No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046
                                </span>
                                </td>
                            <td className="px-6 py-4 font-[500]">272172</td>
                            <td className="px-6 py-4  font-bold">76,852</td>
                            <td className="px-6 py-4 font-[500]">shivanandgupta316@gmail.com</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500] "><Badge status="confirm"/></td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-08-06</td>
                        </tr> 
                        {
                            isOpenOrderProduct ===0 &&
                                <tr>
                            <td  colSpan="6" className="px-6 ">
                            <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md ">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>iPhone 16e 128 GB: Built for Apple Intelligence
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <img src='https://m.media-amazon.com/images/I/61FMZ9rSZUL._SX679_.jpg'
                                className='w-[40px] h-[40px] object-cover rounded-md'/>
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">5</td>
                            <td className="px-6 py-4 font-bold">69,599</td>
                            <td className="px-6 py-4 font-bold">
                                79,999
                                </td>
                           
                        </tr> 

                        
                    </tbody>
                </table>
                </div>
                </td>
                        </tr>
                        }
                        
                    </tbody>

                    {/* second row */}
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]"><Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] " onClick={()=>{isShowOrderProduct(1)}}>
                                {
                                    isOpenOrderProduct===1? 
                                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                    :
                                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                }
                            </Button></td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>pay_PTMoqESsdl562
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">Android 15</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">Shivanand Gupta</td>
                            <td className="px-6 py-4 font-[500]">6394176235</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className="block w-[400px]">
                                    Hi No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046
                                </span>
                                </td>
                            <td className="px-6 py-4 font-[500]">272172</td>
                            <td className="px-6 py-4  font-bold">76,852</td>
                            <td className="px-6 py-4 font-[500]">shivanandgupta316@gmail.com</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500] "><Badge status="confirm"/></td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-08-06</td>
                        </tr> 
                        {
                            isOpenOrderProduct ===1 &&
                                <tr>
                            <td  colSpan="6" className="px-6 ">
                            <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md ">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>iPhone 16e 128 GB: Built for Apple Intelligence
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <img src='https://m.media-amazon.com/images/I/61FMZ9rSZUL._SX679_.jpg'
                                className='w-[40px] h-[40px] object-cover rounded-md'/>
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">5</td>
                            <td className="px-6 py-4 font-bold">69,599</td>
                            <td className="px-6 py-4 font-bold">
                                79,999
                                </td>
                           
                        </tr> 

                        
                    </tbody>
                </table>
                </div>
                </td>
                        </tr>
                        }
                        
                    </tbody>
                </table>
                </div>
        


        </div>
    </div>
  )
}


export default Orders;