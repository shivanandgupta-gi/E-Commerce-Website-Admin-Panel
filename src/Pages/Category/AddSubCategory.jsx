import React, { useContext, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import UploadBox from '../../Componenets/UploadBox';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';//for loading
import { getData, postData } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

//category have no parent id but subcategory have parent id

const AddCategorys = () => {
  const [productCategory, setproductCategory] = useState('');
  const [productCategory2, setproductCategory2] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');

  const handleChangeProductCat = (event) => {
    // setproductCategory(event.target.value);
    // formFields.parentId=event.target.value;//this enter the id in parent id 
     const selectedId = event.target.value;
      setproductCategory(selectedId);
      const selectedCat = context.categoryData.find(cat => cat._id === selectedId);
      setFormFields(prev => ({
        ...prev,
        parentId: selectedId,
        parentCatName: selectedCat?.name || null
      }));
  };

  //for third level category
  const handleChangeProductCat2 = (event) => {
    const selectedId = event.target.value;
    setproductCategory2(selectedId);

    // find inside parent/children
    let selectedCat = null;
    context.categoryData.forEach(cat => {
      if (cat.children) {
        const found = cat.children.find(child => child._id === selectedId);
        if (found) selectedCat = found;
      }
  });

  setFormFields2(prev => ({
    ...prev, // ✅ keep old fields like "name"
    parentId: selectedId,
    parentCatName: selectedCat?.name || null
  }));
};


  const handleChangeProductSubCat = (event) => {
    setProductSubCategory(event.target.value);
  };

  //backend part
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
   const [isLoading2, setIsLoading2] = useState(false); //this for loading (loader circular movve)
  const [formFields, setFormFields] = useState({ //form fields to fill data inside category 
    name: '',
    parentCatName: null,
    parentId: null
  })
  const [formFields2, setFormFields2] = useState({ //form fields to fill data inside third category sub level category 
    name: '',
    parentCatName: null,
    parentId: null
  })
  //for tracking the data in input and put in formfiles
  const onchangeInput = (e) => {
    setFormFields(() => {
      return {
        ...formFields,
        [e.target.name]: e.target.value
      }
    })
  }
  //for tracking the data in input and put in formfiles of third level category
  const onchangeInput2 = (e) => {
    setFormFields2(() => {
      return {
        ...formFields2,
        [e.target.name]: e.target.value
      }
    })
  }
  //fill the category name in formfield
  const selectCategory=(name)=>{
    formFields.parentCatName=name;//this enter the id in parent id 
  }
  //FOR navigation on the uploading the subcategory it open subcategory page
  const history=useNavigate();
  //submit the form sub category
  const handelsubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    //toster
    if (formFields.name === "") {
      context.openAlertBox("error", "please enter Category Name")
      setIsLoading(false)
      return false;
    }
    if (productCategory === "") {
      context.openAlertBox("error", "please select parent category")
      setIsLoading(false)
      return false;
    }
    //post the data permanently
    const payload = {
      name: formFields.name,
      parentCatName: formFields.parentCatName || null,
      parentId: formFields.parentId || null,
    };
    postData("/api/category/create", payload).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.openAlertBox("success", "Sub Category Created Successfully")
       // context.setCategoryData(prev => [...prev, res.category]);
         // ✅ fetch latest categories from server
        getData("/api/category/getcategory").then(newData => {
          context.setcategoryData(newData.categories);
        });                                                          
        context.setisOpenFullScreenPanel({
          open: false
        })
        history("/subcategory")
      }, 1000);

    })
  }
  //submit the form third level sub category
  const handelsubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    //toster
    if (formFields2.name === "") {
      context.openAlertBox("error", "please enter Sub Category Name")
      setIsLoading2(false)
      return false;
    }
    if (productCategory2 === "") {
      context.openAlertBox("error", "please select Sub category")
      setIsLoading2(false)
      return false;
    }
    //post the data permanently
    const payload = {
      name: formFields2.name,
      parentCatName: formFields2.parentCatName || null,
      parentId: formFields2.parentId || null,
    };
    postData("/api/category/create", payload).then((res) => {
      setTimeout(() => {
        setIsLoading2(false);
        context.openAlertBox("success", "Third Level Sub Category Created Successfully")
        getData("/api/category/getcategory").then((newData) => {
        context.setcategoryData(newData.categories);
          });
        context.setisOpenFullScreenPanel({
          open: false
        })
        console.log(res)
         history("/subcategory")
      }, 1000);

    })
  }
 
  return (
    <section className='p-5 bg-gray-50 grid grid-cols-2 gap-10'>
      {/* this for the sub category added  like men , women */}
      <form className='form py-3 p-8 ' onSubmit={handelsubmit}>
        <h4 className='font-[600]'>Add Sub Category</h4>
        <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
          
            <div className='grid grid-cols-2 mb-3 gap-4'>
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
                  {
                    //for showing category name in drop down
                    context?.categoryData?.length !== 0 && context?.categoryData?.map((item, index) => {
                      return <MenuItem key={index} value={item._id}>{item?.name}</MenuItem>
                    })
                  }
                </Select>
              </div>

              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
                <input
                  name="name"
                  value={formFields.name}
                  onChange={onchangeInput}
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                />
              </div>
            </div>


          </div>
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


      {/* this for the third sub category added like shirt , jeans */}
      <form className='form py-3 p-8' onSubmit={handelsubmit2}>
        <h4 className='font-[600]'>Add Third Level Sub Category</h4>
        <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
            <div className='grid grid-cols-2 mb-3 gap-4'>
              <div className='col '>
                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="ProductCatDrop"
                  size="small"
                  className='w-full '
                  value={productCategory2}
                  label="Category"
                  onChange={handleChangeProductCat2}
                >
                 {
                  //for showing the category name in the drop down
                    context?.categoryData?.length !== 0 &&
                    context?.categoryData?.map((item, index) => ( //this for sub category
                      item?.children?.length !== 0 &&
                      item?.children?.map((item2, idx) => (//this for third level sub category)
                        <MenuItem key={item2._id} value={item2._id}>
                          {item2?.name}
                        </MenuItem>
                      ))
                    ))
                  }

                </Select>
              </div>

              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
                <input
                  name="name"
                  value={formFields2.name}
                  onChange={onchangeInput2}
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                />
              </div>
            </div>


          </div>
          <br />

        <div className='w-[250px]'>
          <Button type='submit' className='btn-blue btn-lg w-full flex items-center justify-center gap-3'>
            {
              isLoading2 === true ? ( //for loading (loder)
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

export default AddCategorys;
