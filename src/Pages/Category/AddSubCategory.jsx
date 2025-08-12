import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import UploadBox from '../../Componenets/UploadBox';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const AddCategorys=()=> {
 const [productCategory, setproductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');

  const handleChangeProductCat = (event) => {
    setproductCategory(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCategory(event.target.value);
  };


  return (
   <section className='p-5 bg-gray-50'>
        <form className='form py-3 p-8'>
            <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
              <div className='grid grid-cols-1 mb-3'>
         
            
            <div className='grid grid-cols-4 mb-3 gap-4'>
          <div className='col '>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full '
              value={productCategory}
              label="Category"
              onChange={handleChangeProductCat}
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
         
           <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
              />
            </div>
              </div>
            
            
        </div>
        <br/>
               
            </div>
            <div className='w-[250px]'>
          <Button type='button' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
            <IoMdCloudUpload className='text-[25px] text-white'/>Publish and View</Button>
            </div>
        </form>
    </section>
  )
}

export default  AddCategorys;
