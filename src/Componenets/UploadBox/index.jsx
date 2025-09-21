//for uploading the product images 

import React, { useContext, useState } from 'react'
import { IoImagesOutline } from "react-icons/io5";
import { uploadImageCategory } from '../../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';//for loading


const UploadBox=(props)=> {
      const [uploading, setUploading] = useState(false) //for tracking image address how many stroed
      //this is image upload
      const context=useContext(MyContext)
      const onchangeFile = async (e, api) => {
  try {
    const files = e.target.files;
    setUploading(true); // loading start

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      ) {
        const formdata = new FormData();  // ✅ new FormData per file
        formdata.append(props?.name, file);

      uploadImageCategory(api, formdata).then((res) => {
         if (res?.images) {
          // send string, not array
          props.setPreviewsFun(res?.images);
        }
      });
      } else {
        context.openAlertBox("error", "Please select a valid JPG, PNG, or WEBP file.");
        setUploading(false);
        return;
      }
    }

    setUploading(false);
  } catch (error) {
    console.log(error);
    setUploading(false);
  }
};

  return (
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        {
            uploading === true ? <>
             <CircularProgress color="inherit" />
             <h4 className="text-center">Uploading...</h4>
            </>: 
            <>
             <IoImagesOutline className="text-[40px] opacity-35 pointer-events-none" />
            <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
            <input
                type="file"
                accept='image/*'
                multiple={props.multiple !== undefined ? props.multiple : false}
                className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
                onChange={(e) => onchangeFile(e, props?.url)}
                name={props?.name}
            />
            </>
        }
       
        </div>
  )
}

export default UploadBox;
