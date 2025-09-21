import React, { useContext, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import UploadBox from '../../Componenets/UploadBox';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import { MyContext } from '../../App';
import { deleteImages, getData, postData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';//for loading

const AddHomeSlideUploadUpload = () => {
  //backend start here (copy from add category same)
  //for stroring the data in formfields for the input
  const [previews, setPreviews] = useState([]) //image upload
  const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
  const [formFields, setFormFields] = useState({
    images: []
  })
  const context = useContext(MyContext);
  //for image shown in box
  const setPreviewsFun = (newImages) => {
    const imagesArray = Array.isArray(newImages) ? newImages : [newImages];
    setPreviews(prev => [...prev, ...imagesArray]);   // ✅ append, not replace
    setFormFields(prev => ({
      ...prev,
      images: [...prev.images, ...imagesArray],
    }));
  };
  //imgage remove
  const removeImg = (image, index) => {
    //to remove the index of array that remove
    deleteImages(`/api/slide/delete-image?img=${image}`).then((res) => {
      // imageArr.splice(index,1);//splice used to modify the array after deleting , modifying the array
      // setPreviews([]);
      // setTimeout(() => {//due to after deletion some time taken
      //   setPreviews(imageArr)
      // }, 100);
      setPreviews(prev => prev.filter((_, i) => i !== index));
      setFormFields(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index) //it create filter new array without deleting all element
      }));
    }).catch((err) => {
      console.error("Failed to delete image:", err);
    });
  }
  //submit the form
  const handelsubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    //toster
    if (previews.length === 0) {
      context.openAlertBox("error", "please enter images")
      setIsLoading(false)
      return false;
    }
    //post the data permanently
    const payload = {
      parentId: formFields.parentId || null,
      images: previews
    };
    postData("/api/slide/create", payload).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.openAlertBox("success", "HomeSlider Image uploaded Successfully")
        context.setisOpenFullScreenPanel({
          open: false
        })

      }, 2500);

    })
  }
  return (
    <section className='p-5 bg-gray-50'>
      <form className='form py-3 p-8'  onSubmit={handelsubmit}>
        <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
          {/* when we add shown that image and we can remove it before uploading */}
          <div className='grid grid-cols-7 gap-4 mt-3'>
            {
              previews.length !== 0 && previews.map((image, index) => (

                <div key={index} className='uploadBoxwrapper relative'>
                  {/* removImg is remove for the image during upload cross buttom come*/}
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
            <UploadBox multiple={false} name='images' url='/api/slide/imageupload'
              setPreviewsFun={setPreviewsFun} />
          </div>
        </div>
        <br />
        <br />
        <div className='w-[250px]'>
          <Button type='submit' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
            {
              isLoading === true ? ( //for loading (loder)
                <CircularProgress color="inherit" />
              ) :
                <>
                  <IoMdCloudUpload className='text-[25px] text-white' />Publish and View
                </>
            }
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AddHomeSlideUploadUpload;
