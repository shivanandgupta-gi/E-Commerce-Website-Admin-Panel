import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import UploadBox from '../../Componenets/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';//for loading
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import { deleteImages, postData } from '../../../utils/api';

//this for the shown two banner like  half of 50% in home page is two ads 
//mini ads box
export default function AddAdsBanner() {
  const [previews, setPreviews] = useState([]) //image upload store
  const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
  //backend start here
  const context = useContext(MyContext);
  //form field to store all data 
  const [formFields, setFormFields] = useState({
    images: []
  })
  //imgage remove
  const removeImg = (image, index) => {
    //to remove the index of array that remove
    deleteImages(`/api/category/delete-image?img=${image}`).then((res) => {
      setPreviews(prev => prev.filter((_, i) => i !== index));
      setFormFields(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index) //it create filter new array without deleting all element
      }));
    }).catch((err) => {
      console.error("Failed to delete image:", err);
    });
  }

  //for image shown in box
  const setPreviewsFun = (newImages) => {
    const imagesArray = Array.isArray(newImages) ? newImages : [newImages];
    setPreviews(prev => [...prev, ...imagesArray]);   // ✅ append, not replace
    setFormFields(prev => ({
      ...prev,
      images: [...prev.images, ...imagesArray],
    }));
  };
  //for navigation
  const history = useNavigate();

  //form data submit
  //  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    //adding requirement field if any field is empty then it will show error
    if (formFields.title === "") {
      context.openAlertBox("error", "Please fill the Banner Title")
      setIsLoading(false);
      return false;
    }
    if (formFields.Price === "") {
      context.openAlertBox("error", "Please Enter Price")
      setIsLoading(false);
      return false;
    }
    //if all fields are filled then submit the product
    postData("/api/ads/create", formFields).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", "Ads banner Uploaded Successfully")
          context.setisOpenFullScreenPanel({
            open: false                   
          })
          history("/adBanner-List");
        }, 1500);
      }
      else {
        setIsLoading(false);
        context.openAlertBox("error", res?.message)
      }
    })
  }

  return (
    //this for adding banner
    <section className='p-5 bg-gray-50'>
      <form className='form py-3 p-8' onSubmit={handleSubmit} >
        <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
          <h3 className='text-[16px] font-[500] m-1 text-black'>Image</h3>
          {/* multiple used for multiple photo upload */}
          {/* when we add shown that image and we can remove it before uploading*/}
          <div className='grid grid-cols-7 gap-4 mt-3 mb-8'>
            {
              previews.length !== 0 && previews.map((image, index) => (

                <div key={index} className='uploadBoxwrapper relative'>
                  {/* removImg is remove for the image */}
                  <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => removeImg(image, index)}>
                    <IoMdClose className="text-white text-[17px]" />
                  </span>
                  {/* this for that image upload using upload box it return the props of setpreviews that shown in the box of lazyload */}
                  <div className="uploadBox relative p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200">

                    {/* uploaded imageg by lazyload */}
                    <div className="absolute inset-0">
                      <LazyLoadImage
                        className='w-full h-full object-cover '
                        alt={"image"}
                        effect="blur"
                        wrapperProps={{
                          // If you need to, you can tweak the effect transition using the wrapper style.
                          style: { transitionDelay: "1s" },
                        }}
                        src={image} // use normal <img> attributes as props
                      />
                    </div>
                  </div>
                </div>
              ))
            }
            {/* for more upload image option  with image url and image name as props        */}
            <UploadBox multiple={true} name='images' url='/api/ads/imageuploads'
              setPreviewsFun={setPreviewsFun} />
          </div>
        </div>
        <Button type='submit' className='btn-blue btn-lg w-[20%] flex items-center justify-center gap-3'>
          {
            isLoading === true ? ( //for loading (loder)
              <CircularProgress color="inherit" />
            ) :
              <>
                <IoMdCloudUpload className='text-[25px] text-white' />Publish and View
              </>
          }
        </Button>
      </form>
    </section>
  )
}

