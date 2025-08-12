import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";


// uploading product
const ProductAdd=()=> {
  const [productCategory, setproductCategory] = useState('');
  const [productSubCategory, setproductSubCategory] = useState('');
  const [productFeatured, setproductFeatured] = useState('');
  const [productRam, setproductRam] = useState('');
  const [productWeight, setproductWeight] = useState('');
  const [productSize, setproductSize] = useState('');
  const handleChangeProductCat = (event) => {
    setproductCategory(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setproductSubCategory(event.target.value);
  };
  const handleChangeProductFeat= (event) => {
    setproductFeatured(event.target.value);
  };
  const handleChangeProductRAM= (event) => {
    setproductRam(event.target.value);
  };
  const handleChangeProductwei= (event) => {
    setproductWeight(event.target.value);
  };
  const handleChangeProductSize= (event) => {
    setproductSize(event.target.value);
  };
  return (
    <section className='p-5 bg-gray-50'>
      <form className='form  p-8 overflow-y-scroll py-4 '>
        {/* product name */}
        <div className='grid grid-cols-1 mb-3'>
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Name</h3>
            <input
              type='text'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>
        {/* product description */}
        <div className='grid grid-cols-1 mb-3'>
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Description</h3>
            <textarea
              type='text'
              className='w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>
        {/* product category */}
        <div className='grid grid-cols-4 mb-3 gap-4'>
          <div className='col'>
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
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub Category</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={productSubCategory}
              label=" Sub Category"
              onChange={handleChangeProductSubCat}
            >
              <MenuItem value={
                ''
              }>None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
           <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Price</h3>
                <input
                  type='number'
                  className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                />
              </div>

              <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Old Price</h3>
                <input
                  type='number'
                  className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                />
              </div>
              </div>
              {/* Featured */}
              <div className='grid grid-cols-4 mb-3 gap-4'>
                <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Is Featured?</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={productFeatured}
              label=" Featured"
              onChange={handleChangeProductFeat}
            >
              <MenuItem value={
                ''
              }>None</MenuItem>
              <MenuItem value={20}>True</MenuItem>
              <MenuItem value={30}>False</MenuItem>
            </Select>
              </div>
              {/* stock */}
                  <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Stock
</h3>
                <input
                  type='number'
                  className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                />
              </div>
              {/* brand */}
               <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Brand

</h3>
                <input
                  type='text'
                  className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                />
              </div>
              {/* discount */}
               <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Discount
</h3>
                <input
                  type='number'
                  className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                />
              </div>
              </div>

             <div className='grid grid-cols-4 mb-3 gap-4'>
              {/* Product RAMS */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>
Product RAMS</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={productRam}
              label="Category"
              onChange={handleChangeProductRAM}
            >
              <MenuItem value={10}>4GB</MenuItem>
              <MenuItem value={20}>8GB</MenuItem>
              <MenuItem value={30}>12GB</MenuItem>
            </Select>
          </div>
          {/* Product Weight */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Weight
</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={productWeight}
              label=" Sub Category"
              onChange={handleChangeProductwei}
            >
              <MenuItem value={
                ''
              }>None</MenuItem>
              <MenuItem value={10}>2kg</MenuItem>
              <MenuItem value={20}>3kg</MenuItem>
              <MenuItem value={30}>4Kg</MenuItem>
            </Select>
          </div>
          {/* Product Size */}
              <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Size

</h3>
            <Select
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={productSize}
              label=" Sub Category"
              onChange={handleChangeProductSize}
            >
              <MenuItem value={
                ''
              }>None</MenuItem>
              <MenuItem value={10}>S</MenuItem>
              <MenuItem value={20}>M</MenuItem>
              <MenuItem value={30}>L</MenuItem>
            </Select>
          </div>
          {/* product rating */}
          <div className='col'>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Rating</h3>
                 <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              </div>
        </div> 

            {/* for uploading photo of product */}
        <div className='col w-full p-5 px-0'>
            <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
            <div className='grid grid-cols-7 gap-4 mt-3'>
              {/* multiple used for multiple photo upload */}
              {/* when we add shown that image and we can remove it */}
              <div className='uploadBoxwrapper relative'>
                  <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                    <IoMdClose className="text-white text-[17px]" />
                  </span>
              <div className="uploadBox relative p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200">

                     {/* uploaded imageg by lazyload */}
                     <div className="absolute inset-0">
                     <LazyLoadImage
                      className='w-full h-full object-cover '
                        alt={"image"}
                         effect="blur"
                            wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: {transitionDelay: "1s"},
                            }}
                        src={"https://m.media-amazon.com/images/I/418ZjpXSE7L._SX300_SY300_QL70_FMwebp_.jpg"} // use normal <img> attributes as props
                        />
                        </div>
              </div>
              </div>
              {/* for more upload image option         */}
              <UploadBox multiple={true}/>
            </div>
          </div>
                              <br/>
          <Button type='button' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
            <IoMdCloudUpload className='text-[25px] text-white'/>Publish and View</Button>
      </form>
    </section>
  )
}

export default ProductAdd;
