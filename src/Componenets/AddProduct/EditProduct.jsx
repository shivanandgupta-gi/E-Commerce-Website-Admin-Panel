import React, { useContext, useEffect, useState } from 'react'
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
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';//for loading
import { deleteImages, editData, getData, postData } from '../../../utils/api';
import UploadBoxProduct from '../UploadBoxProduct';
import { useNavigate, useParams } from 'react-router-dom';

// uploading product
//for multiple select like in ram etc
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const EditProduct = () => {
  const [productCategory, setproductCategory] = useState('');
  const [productSubCategory, setproductSubCategory] = useState('');
  const [productThirdLevelSubCategory, setproductThirdLevelSubCategory] = useState('');
  const [productFeatured, setproductFeatured] = useState('');
  const [productRam, setproductRam] = useState([]);
  const [productWeight, setproductWeight] = useState([]);
  const [productSize, setproductSize] = useState([]);
  const [previews, setPreviews] = useState([]) //image upload
  const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
  const [selectedRam, setSelectedRam] = useState([]);   // selected values
  const [selectedWeight, setSelectedWeight] = useState([]);   // selected values
  const [selectedSize, setSelectedSize] = useState([]);   // selected values
  const [bannerPreview,setBannerPreview] =useState([]); //this for the uploading the banner below popular product v2
    //for category
  //for category
  const handleChangeProductCat = (event) => {
    const selectedId = event.target.value;
    setproductCategory(selectedId);
    // set id in form field
    setFormFields(prev => ({
      ...prev,
      catId: selectedId,
      catName: context.categoryData.find(cat => cat._id === selectedId)?.name || '',
      category:selectedId
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
      subCat: subCatName
    }));
  };
  //save Subcat name in form field
  const selectSubCatByName = (catname) => {
    formFields.subCat = catname//set catName in form field of product from onclick on the product drop menu 
  }
  const handleChangeProductThirdLevelSubCat = (event) => {
    setproductThirdLevelSubCategory(event.target.value);
    formFields.thirdsubCatId = event.target.value;//set id in form field of third level sub categry product
  };
  //save third level Subcat name in form field
  const selectThirdLevelSubCatByName = (catname) => {
    formFields.thirdsubCat = catname//set catName in form field of product from onclick on the product drop menu 
  }
  //for featured product
  const handleChangeProductFeat = (event) => {
    setproductFeatured(event.target.value);
    formFields.isFeatured = event.target.value; //set featured in form field of product
  };
  //for ram product
  // const handleChangeProductRAM = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setproductRam(
  //     typeof value === 'string' ? value.split(',') : value
  //   );
  //   setFormFields(prev => ({
  //     ...prev,
  //     productRam: typeof value === "string" ? value.split(",") : value,
  //   })); //set ram in form field of product
  // };
const handleChangeProductRAM = (event) => {
  const { value } = event;
  setSelectedRam(typeof value === "string" ? value.split(",") : value);

  setFormFields((prev) => ({
    ...prev,
    productRam: typeof value === "string" ? value.split(",") : value, // store IDs
  }));
};

  //for weight product
  const handleChangeProductwei = (event) => {
    const {
      target: { value },
    } = event;
    setproductWeight(
      typeof value === 'string' ? value.split(',') : value
    );
    setFormFields(prev => ({
      ...prev,
      productWeight: typeof value === "string" ? value.split(",") : value,
    }));//set weight of multiple select in form field of product
  };
  //for size product
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setproductSize(
      typeof value === "string" ? value.split(',') : value,
    );
    setFormFields(prev => ({
      ...prev,
      size: typeof value === "string" ? value.split(",") : value,
    })); //set size of multiple select in form field of product
  };
  //to show the previous data in formfield
  useEffect(()=>{
    //this for special fecting data from stored in rams, weight, size
     getData("/api/product/getAllProductRAMS").then((res)=>{
          if(res.error === false){
            setproductRam(res.products)
          }
        })
        getData("/api/product/getAllProductWeight").then((res)=>{ //to fetch weight from sever dynamically
          if(res.error === false){
            setproductWeight(res.products)
          }
        })
         getData("/api/product/getAllProductSize").then((res)=>{ //to fetch size from sever dynamically
          if(res.error === false){
            setproductSize(res.products)
          }
        })
    getData(`/api/product/getSingleProduct/${context.isOpenFullScreenPanel.id}`).then((res)=>{
      const product = res?.product;
    if (product) {
      setFormFields({
        name: product.name,
        description: product.description,
        images: product.images,
        brand: product.brand,
        price: product.price,
        oldPrice: product.oldPrice,
        category: product.category,
        catName: product.catName,
        catId: product.catId,
        subCatId: product.subCatId,
        subCat: product.subCat,
        thirdsubCat: product.thirdsubCat,
        thirdsubCatId: product.thirdsubCatId,
        countInStock: product.countInStock,
        rating: product.rating,
        isFeatured: product.isFeatured,
        discount: product.discount,
        productRam: product.productRam,
        size: product.size,
        productWeight: product.productWeight,
        bannerimages:product.bannerimages,
        bannerTitlename:product.bannerTitlename
      });

      // ✅ normalize selected values into arrays
      setSelectedRam(Array.isArray(product.productRam) ? product.productRam : []);
      setSelectedWeight(Array.isArray(product.productWeight) ? product.productWeight : []);
      setSelectedSize(Array.isArray(product.size) ? product.size : []);


      // ✅ keep category states
      setproductCategory(product.catId);
      setproductSubCategory(product.subCatId);
      setproductThirdLevelSubCategory(product.thirdsubCatId);
      setproductFeatured(product.isFeatured);

      setPreviews(product.images || []);
      setBannerPreview(product.bannerimages || []);
    }
    })
  },[])
  //backend start here
  //form field to store all data 
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    category:"",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
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
  const context = useContext(MyContext);

  //for rating
  const onChangeRating = (event, newValue) => {
    setFormFields(prev => ({ //prev represents the previous value of formFields before this update.
      ...prev,
      rating: newValue
    }));
  };

  //for image shown in box
  const setPreviewsFun = (responseData) => {
    const newImages = Array.isArray(responseData) ? responseData : [responseData];
    setPreviews(prev => [...prev, ...newImages]);
    setFormFields(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages],
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
//for navigation
  const history=useNavigate();
  //form data submit
//  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
     //adding requirement field if any field is empty then it will show error
      if(formFields.name === ""){
        context.openAlertBox("error", "Please fill the product name")
        setIsLoading(false);
        return false;
      }
       if(formFields.description === ""){
        context.openAlertBox("error", "Please fill the description")
        setIsLoading(false);
        return false;
      }
       if(formFields.catName === ""){
        context.openAlertBox("error", "Please choose the category name")
        setIsLoading(false);
        return false;
      }
       if(formFields.subCat === ""){
        context.openAlertBox("error", "Please choose the Sub category name")
        setIsLoading(false);
        return false;
      }
       if(formFields.thirdsubCat === ""){
        context.openAlertBox("error", "Please choose the third level Sub category name")
        setIsLoading(false);
        return false;
      }
       if(formFields.price === ""){
        context.openAlertBox("error", "Please fill the price ")
        setIsLoading(false);
        return false;
      }
       if(formFields.oldPrice === ""){
        context.openAlertBox("error", "Please enter the old price")
        setIsLoading(false);
        return false;
      }
       if(formFields.countInStock === ""){
        context.openAlertBox("error", "Please fill the product in stock")
        setIsLoading(false);
        return false;
      }
       if(formFields.brand === ""){
        context.openAlertBox("error", "Please fill the brand name")
        setIsLoading(false);
        return false;
      }
       if(formFields.discount === ""){
        context.openAlertBox("error", "Please enter the discount")
        setIsLoading(false);
        return false;
      }
       if(formFields.rating === ""){
        context.openAlertBox("error", "Please give the rating")
        setIsLoading(false);
        return false;
      }
      //for image
       if(previews.length === 0){
        context.openAlertBox("error", "Please select the image")
        setIsLoading(false);
        return false;
      }
      //if all fields are filled then edit the product
    editData(`/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", "Product updated Successfully")
          context.setisOpenFullScreenPanel({
            open: false
          })
          history("/products");
        }, 1500);
      }
      else{
        setIsLoading(false);
        context.openAlertBox("error", res?.message)
      }
    })
  }
    //for image shown in box of banner
    const setBannerImagesFun = (responseData) => {
    const newImages = Array.isArray(responseData) ? responseData : [responseData];
    setBannerPreview(prev => [...prev, ...newImages]);
    setFormFields(prev => ({
      ...prev,
      bannerimages: [...(prev.images || []), ...newImages],
    }));
  };

    //imgage remove  for the banner before uploaing
    const removeImgBanner = (image, index) => {
      //to remove the index of array that remove
      deleteImages(`/api/product/deleteImages?img=${image}`).then((res) => {
        setBannerPreview(prev => prev.filter((_, i) => i !== index));
        setFormFields(prev => ({
          ...prev,
          bannerimages: prev.images.filter((_, i) => i !== index) //it create filter new array without deleting all element
        }));
      }).catch((err) => {
        console.error("Failed to delete image:", err);
      });
    }
  return (
    <section className='p-5 bg-gray-50'>
      <form className='form  p-8 overflow-y-scroll py-4 ' onSubmit={handleSubmit}>
        {/* product name */}
        <div className='grid grid-cols-1 mb-3'>
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Name</h3>
            <input
              name='name'
              value={formFields.name}
              onChange={onChangeInput}
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
              name='description'
              value={formFields.description}
              onChange={onChangeInput}
              type='text'
              className='w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>
        {/* product category */}
        <div className='grid grid-cols-4 mb-3 gap-4'>
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
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
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub Category</h3>
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
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Third Level Category</h3>
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
                              <MenuItem value={thirdcat?._id} key={index}
                                onClick={() => selectThirdLevelSubCatByName(thirdcat?.name)}
                              >{thirdcat?.name}</MenuItem>
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
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Price</h3>
            <input
              name='price'
              value={formFields.price}
              onChange={onChangeInput}
              type='number'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>

        <div className='grid grid-cols-4 mb-3 gap-4'>
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Old Price</h3>
            <input
              name='oldPrice'
              value={formFields.oldPrice}
              onChange={onChangeInput}
              type='number'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
          {/* Featured */}
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
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </div>
          {/* stock */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Stock
            </h3>
            <input
              name='countInStock'
              value={formFields.countInStock}
              onChange={onChangeInput}
              type='number'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
          {/* brand */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Brand

            </h3>
            <input
              name='brand'
              value={formFields.brand}
              onChange={onChangeInput}
              type='text'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
        </div>

        <div className='grid grid-cols-4 mb-3 gap-4'>
          {/* discount */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Discount
            </h3>
            <input
              name='discount'
              value={formFields.discount}
              onChange={onChangeInput}
              type='number'
              className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
            />
          </div>
          {/* Product RAMS */}

          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product RAMS</h3>
           {
              productRam.length !== 0 &&
              <Select
              multiple
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={selectedRam || []}
              label="Category"
              onChange={handleChangeProductRAM}
            >
              {
                productRam.map((item,index)=>(
                  <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                ))
              }
            </Select>
            }
          </div>
          {/* Product Weight */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Weight
            </h3>
            {
              productWeight.length !== 0 &&
                 <Select
              multiple
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={selectedWeight}
              label=" Sub Category"
              onChange={handleChangeProductwei}
            >
              {
                productWeight.map((item,index)=>(
                  <MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>
                ))
              }
            </Select>
            }
          </div>
          {/* Product Size */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Size</h3>
            {
              productSize.length !== 0 &&
               <Select
              multiple
              labelId="demo-simple-select-label"
              id="ProductCatDrop"
              size="small"
              className='w-full'
              value={selectedSize}
              label=" Sub Category"
              onChange={handleChangeProductSize}
            >
              {
                productSize.map((item,index)=>(
                  <MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>
                ))
              }
            </Select> 
            }
          </div>
          {/* product rating */}
          <div className='col'>
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Rating</h3>
            <Rating name="rating" value={formFields.rating} precision={0.5}
              onChange={onChangeRating} />
          </div>
        </div>

        {/* for uploading photo of product */}
        <div className='col w-full p-5 px-0'>
          <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
          {/* multiple used for multiple photo upload */}
          {/* when we add shown that image and we can remove it */}
          <div className='grid grid-cols-7 gap-4 mt-3'>
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
            <UploadBoxProduct multiple={true} name='images' url='/api/product/upload'
              setPreviewsFun={setPreviewsFun} />
          </div>
        </div>
        <br />
         {/* for uploading photo of banner  */}
        <div className='col w-full p-5 px-0'>
          {/* multiple used for multiple photo upload */}
          {/* when we add shown that image and we can remove it */}
          <div className='shadow-mg bg-white p-4 w-full'>
            <h3 className='font-[700] text-[18px] mb-3'>Banner Images</h3>
          <div className='grid grid-cols-7 gap-4 mt-3'>
            {
              bannerPreview.length !== 0 && bannerPreview.map((image, index) => (
                <div key={index} className='uploadBoxwrapper relative'>
                  {/* removImg is remove for the image */}
                  <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => removeImgBanner(image, index)}>
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
            <UploadBoxProduct multiple={true} name='bannerimages' url='/api/product/uploadBanner'
              setPreviewsFun={setBannerImagesFun} />
          </div>

          <h3 className="font-[700] text-[18px] mb-3">Banner Title</h3>
            <input
              type="text"
              className="w-[60%] h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
              name="bannerTitlename"
              value={formFields.bannerTitlename}
              onChange={onChangeInput}
            />
          </div>
        </div>
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
      </form>
    </section>
  )
}

export default EditProduct;
