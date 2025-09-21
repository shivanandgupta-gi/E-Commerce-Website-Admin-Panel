import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { MyContext } from '../../App';
import { deleteData, editData, getData, postData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

//this for adding rams
const AddRAM = () => {
    const [name,setName]=useState("");
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [editId,setEditId]=useState(''); //for editing the data
    const context=useContext(MyContext);
    //backend
    //it used to fetch all data from backend of rams
    useEffect(()=>{
       getRAMS();
    },[])
    //form submit of rams
    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        if(name === ""){
            context.openAlertBox("error","Please Enter Product RAM")
            setIsLoading(false)
            return false;
        }
        //for edit the data if editmode is true
        if(editId === ''){
            //data post 
            postData("/api/product/productRAMS/create",{name:name}).then((res)=>{
                if (res.error === false) {
                    context.openAlertBox("success",res.message)
                    setTimeout(() => { //loader run for 300ms
                        setIsLoading(false);
                        getRAMS();
                        setName("");
                    }, 300);
                } else {
                    context.openAlertBox("error",res.message)
                }
            })
        }
        if(editId !== ''){ //means edit the data
            editData(`/api/product/updateRAMS/${editId}`,{name:name}).then((res)=>{
                if (res.error === false) {
                    context.openAlertBox("success",res.message)
                    setTimeout(() => { //loader run for 300ms
                        setIsLoading(false);
                        getRAMS();
                        setName("");
                    }, 300);
                } else {
                    context.openAlertBox("error",res.message)
                }
            })
        }
        
    }   
    //fetching the rams from server
    const getRAMS=()=>{
         getData("/api/product/getAllProductRAMS").then((res)=>{
            if(res.error === false){ //set all rams in data state
                const sorted = res.products.sort(  //sort such that new data come on top
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setData(sorted);
            }
            else{
                console.log(res);
            }
        })
    }
    //delete the rams
    const deleterams=(id)=>{
        deleteData(`/api/product/productRamsDelete/${id}`).then((res)=>{
            getRAMS();
            context.openAlertBox("success","RAMS deleted successfully");
        })
    }
    //edit the ram
    const editItem=(id)=>{
       //first find the id of rams at that id
       getData(`/api/product/productRAMSById/${id}`).then((res)=>{
         setName(res?.product.name)//it set the value in formfield
        setEditId(res?.product._id);
       })
    }
    return (
        <>
            <div className="flex items-center justify-between px-2 py-2 mt-3">
                <h3 className="text-[20px] font-[600]">Add Product RAMS</h3>
            </div>

            <div className="card px-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%] mt-5 mb-5">
                <form className='form py-3 p-6' onSubmit={handleSubmit}>
                    <div className="col mb-4">
                        <h3 className=" text-[14px] font-[600] mb-2 px-2 text-black">PRODUCT RAMS</h3>
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] px-2 focus:border-[rgba(0,0,0,0.4)] rounded-sm text-[14px]"
                        />
                    </div>
                    <Button type='submit' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
                        {
                            isLoading === true ? ( //for loading (loder)
                            <CircularProgress color="inherit" />
                            ) :
                            <>
                             <FaCloudUploadAlt className='text-[25px] text-white' />Publish and View
                            </>
                        }
                    </Button>
                </form>
            </div>

            {/* table shown data of ram */}
            {
                data.length !== 0 && 
                <div className="card px-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%] mt-5 mb-5">
                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-800 mt-4">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-900 mt-5">
                            <tr>
                                <th scope="col" className="px-28 py-3 whitespace-nowrap" width="60%">
                                    Product Rams
                                </th>
                                <th scope="col" className="px-5 py-3 whitespace-nowrap" width="30%">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* map will be executed here for adding data in rams table */}
                            {
                                data.map((item,index)=>(
                                      <tr className="bg-white even:bg-gray-100 border-b border-gray-200" key={index}>
                                        <td className="px-28 py-2">{item.name}</td>
                                        <td className="px-5 py-2">
                                            <div className="flex items-center gap-5">
                                                <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                                                onClick={()=>editItem(item._id)}
                                                >
                                                    <FiEdit3 className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                                </Button>
                                                
                                                <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                                                onClick={()=>deleterams(item._id)}
                                                >
                                                    <MdDeleteOutline className="text-[rgba(0,0,0,0.7)] text-[22px]" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>                           
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            }
            

        </>
    )
}

export default AddRAM