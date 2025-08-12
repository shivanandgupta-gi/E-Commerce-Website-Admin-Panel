import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import UploadBox from '../../Componenets/UploadBox';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";


const AddCategory=()=> {
  return (
   <section className='p-5 bg-gray-50'>
        <form className='form py-3 p-8'>
            <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
              <div className='grid grid-cols-1 mb-3'>
          <div className='col w-[25%]'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Categegory Name
</h3>
            <input
              type='text'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>
        <br/>
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
                                 <br/>
            <div className='w-[250px]'>
          <Button type='button' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
            <IoMdCloudUpload className='text-[25px] text-white'/>Publish and View</Button>
            </div>
        </form>
    </section>
  )
}

export default  AddCategory;
