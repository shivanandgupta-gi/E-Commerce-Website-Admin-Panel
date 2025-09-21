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
export default function AddBannerV1() {
  const [productCategory, setproductCategory] = useState('');
  const [previews, setPreviews] = useState([]) //image upload store
  const [productSubCategory, setproductSubCategory] = useState('');
  const [productThirdLevelSubCategory, setproductThirdLevelSubCategory] = useState('');
  const [productFeatured, setproductFeatured] = useState('');
  const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
  const [align,setAlign]=useState('')//this for the data shown in left or right in ads 
  //backend start here
  const context = useContext(MyContext);
  //form field to store all data 
  const [formFields, setFormFields] = useState({
    catId: "",
    subCatId: "",
    title: "",
    thirdsubCatId: "",
    Price: "",
    images: [],
    alignInfo:""
  })

  //onchange method to fill value in the formfields
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  //for category
  const handleChangeProductCat = (event) => {
    const selectedId = event.target.value;
    setproductCategory(selectedId);
    // set id in form field
    setFormFields(prev => ({
      ...prev,
      catId: selectedId,
      category: selectedId
    }));
  };

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


  //for subcategory
  const handleChangeProductSubCat = (event) => {
    const selectedId = event.target.value;
    setproductSubCategory(selectedId);
    // set id in form field
    let subCatName = '';
    context.categoryData?.forEach(cat => {
      cat.children?.forEach(subcat => {
        if (subcat._id === selectedId) subCatName = subcat.name;
      });
    });

    setFormFields(prev => ({
      ...prev,
      subCatId: selectedId,
    }));
  };

  const handleChangeProductThirdLevelSubCat = (event) => {
    setproductThirdLevelSubCategory(event.target.value);
    formFields.thirdsubCatId = event.target.value;//set id in form field of third level sub categry product
  };

  //for  align item data store
  const handleChangeAlignInfo = (event) => {
    setAlign(event.target.value);
    formFields.alignInfo = event.target.value; //set featured in form field of product
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
    postData("/api/banner/create", formFields).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", "banner Uploaded Successfully")
          context.setisOpenFullScreenPanel({
            open: false                   
          })
          history("/bannerV1List");
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
          <div className='grid grid-cols-5 mb-3 gap-5'>
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Banner Title</h3>
              <input
                type='text'
                onChange={onChangeInput}
                name='title'
                value={formFields.title}
                placeholder='enter category name'
                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
              />
            </div>
            {/* product category */}
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Category</h3>
              {
                //if length of category array is not equal to zero then only show the drop down
                context?.categoryData?.length !== 0 &&
                <Select
                  labelId="demo-simple-select-label"
                  id="ProductCatDrop"
                  size="small"
                  className='w-full '
                  value={productCategory}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {
                    //it help to map the category array and show the drop down of category name
                    context?.categoryData?.map((cat, index) => (
                      <MenuItem value={cat?._id} key={index}
                      >{cat?.name}</MenuItem>
                    ))
                  }
                </Select>
              }

            </div>
            {/* sub category */}
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Sub Category</h3>
              {
                //if length of sub category array is not equal to zero then only show the drop down
                context?.categoryData?.length !== 0 &&
                <Select
                  labelId="demo-simple-select-label"
                  id="ProductCatDrop"
                  size="small"
                  className='w-full '
                  value={productSubCategory}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  {
                    //it help to map the sub category array and show the drop down of category name
                    context?.categoryData?.map((cat, index) => {
                      return (
                        cat?.children?.length !== 0 && cat?.children?.map((subcat, index) =>
                        (
                          <MenuItem value={subcat?._id} key={index}
                          >{subcat?.name}</MenuItem>)
                        )
                      )
                    })
                  }
                </Select>
              }
            </div>
            {/* third level sub category */}
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Third Level Category</h3>
              {
                //if length of third level sub category array is not equal to zero then only show the drop down
                context?.categoryData?.length !== 0 &&
                <Select
                  labelId="demo-simple-select-label"
                  id="ProductCatDrop"
                  size="small"
                  className='w-full '
                  value={productThirdLevelSubCategory}
                  label="Sub Category"
                  onChange={handleChangeProductThirdLevelSubCat}
                >
                  {
                    //it help to map the third level sub category array and show the drop down of category name
                    context?.categoryData?.map((cat, index) => {
                      return (
                        cat?.children?.length !== 0 && cat?.children?.map((subcat, index) => {
                          return (
                            subcat?.children?.length !== 0 && subcat?.children?.map((thirdcat, index) => {
                              return (
                                <MenuItem value={thirdcat?._id}>
                                  {thirdcat?.name}</MenuItem>
                              )
                            }))
                        })
                      )
                    })
                  }
                </Select>
              }
            </div>
            {/* product price */}
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Price</h3>
              <input
                name='Price'
                value={formFields.Price}
                onChange={onChangeInput}
                type='number'
                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
              />
            </div>
          </div>
          {/* Featured */}
          <div className='grid grid-cols-5 mb-3 gap-5'>
            <div className='col'>
              <h3 className='text-[16px] font-[500] mb-1 text-black'>Align Info</h3>
              <Select
                labelId="demo-simple-select-label"
                id="ProductCatDrop"
                size="small"
                className='w-full'
                value={align}
                label=" Featured"
                onChange={handleChangeAlignInfo}
              >
                <MenuItem value={'left'}>Left</MenuItem>
                <MenuItem value={'right'}>Right</MenuItem>
              </Select>
            </div>
          </div>
          <br />
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
            <UploadBox multiple={true} name='images' url='/api/banner/imageuploads'
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
