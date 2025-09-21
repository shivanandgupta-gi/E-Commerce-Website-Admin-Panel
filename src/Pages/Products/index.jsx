import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { FiEdit3 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import SearchBox from '../../Componenets/SearchBox';
import { MyContext } from '../../App';
import { deleteData, deleteMultipleProductData, getData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
//this page for product list 

//this page for dashborad making
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//material ui colums
const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'subcategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },
  {
    id: 'price',
    label: 'PRICE',
    minWidth: 100,
  },
  {
    id: 'sales',
    label: 'SALES',
    minWidth: 100,
  },
    {
    id: 'rating',
    label: 'RATING',
    minWidth: 100,
  },
  {
    id: 'stock',
    label: 'STOCK',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 100,
  },
];

const Products = () => {
  //for filter in table
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = useState([]); //to store all product data
  const [productCategory, setproductCategory] = useState('');
  const [productSubCategory, setproductSubCategory] = useState('');
   const [productThirdLevelSubCategory, setproductThirdLevelSubCategory] = useState('');
   const [sortedIds , setSortedIds]=useState([]);
   const [isLoading,setIsLoading]=useState(false);
  const handleChangeCatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   material ui table data
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //for prduct uploading
  const context = useContext(MyContext);
  //Backend start here 
  useEffect(() => { //it fetch all product from backend if panel close it hit teh get all product withour refersh the page
    getProducts();
  }, [context?.isOpenFullScreenPanel])
  //to store all product data
  const getProducts = async () => {
    setIsLoading(true);
    getData("/api/product/getAllProduct").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        //for selecting multiple product
            for (let i = 0; i < res?.products?.length; i++) {
              productArr[i] = res?.products[i];
              productArr[i].checked = false; //to check added in all product such that it identify to delete multiple at same time
            }
        // reverse order so latest added comes on top
        setTimeout(() => {
          setIsLoading(false);
          setProductData([...res.products].reverse());
        }, 700);
      } else {
        console.log(res.error);
      }
    })
  }

  //to remove all the product on click delete button
  const deleteProduct=(id)=>{
    deleteData(`/api/product/deleteProduct/${id}`).then((res)=>{
      getProducts();
      context.openAlertBox("success", "Product deleted successfully")
    })
  }

  //filter for product category
    //for category
  const handleChangeProductCat = (event) => {
    const selectedId = event.target.value;
    setproductSubCategory("");
    setproductThirdLevelSubCategory("") //due to at category choose all this blanck
    setIsLoading(true); //add same is subcategory and third level subcategory
    setproductCategory(selectedId);
    //get all product by thir category id such that we can fielter
    getData(`/api/product/getAllProductByCategory/${selectedId}`).then((res)=>{
      if(res?.error === false){
        setTimeout(() => {
          setIsLoading(false)
           setProductData(res?.products); //filter done
        }, 700);
       
      }
    })
  };
  //for subcategory
  const handleChangeProductSubCat = (event) => {
    const selectedId = event.target.value;
    setproductSubCategory(selectedId);
    //get all product by their sub category id such  we can filter a/c to sub category
    getData(`/api/product/getAllProductBySubCategoryId/${selectedId}`).then((res)=>{
      console.log(res);
    })
  };
  //for third level sub category
   const handleChangeProductThirdLevelSubCat = (event) => {
    setproductThirdLevelSubCategory(event.target.value);
     getData(`/api/product/getAllProductByThirdSubCategoryId/${event.target.value}`).then((res)=>{
      if(res?.error === false){
        setProductData(res?.products); //filter done
      }
    })
  };

  //it for delete multiple product at onec when checked more that one
  // Handler to toggle all checkboxes when click the top check box
const handleSelectAll = (e) => {
  const isChecked = e.target.checked;
    // Update all items' checked status
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);
    // Update the sorted IDs state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      console.log(ids);
      setSortedIds(ids);
    }
      else{
        setSortedIds([]);
      }
  };
 //for storing  all the product that checked id 
  // Handler to toggle individual checkboxes
  const handleCheckBoxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);
    // Update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);

    console.log(selectedIds);
  };
  //now delete all checkd product
  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context.openAlertBox('error', 'Please select items to delete.');
      return;
    }
    try {
      deleteMultipleProductData('/api/product/deletemultiple', {
         id: sortedIds ,
      }).then((res) => {
        getProducts();
        context.openAlertBox('success', 'Product deleted');
      });
    } catch (error) {
      context.openAlertBox('error', 'Error deleting items.');
    }
  };


  return (
    <>
      <div className='flex items-center justify-between px-2 py-0 mt-4'>
        <h2 className='text-[19px] font-[600] '>Products</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          {sortedIds.length != 0 && (
            <Button
              variant="contained"
              className="btn-sms"
              size="small"
              color="error"
              onClick={deleteMultipleProduct}
            >
              Delete
            </Button>
          )}
          <Button className='btn-blue btn-sms !bg-green-500'>
            <FaCloudUploadAlt className='text-white text-[18px] mr-2' />Export</Button>
          <Button className='btn-blue btn-sms ml-auto' onClick={() => {
            context.setisOpenFullScreenPanel({
              open: true,
              model: 'Add Product'
            })
          }}>
            <IoMdAdd className='text-white text-[18px]' /> Add Product
          </Button>
        </div>
      </div>

      {/* recent product <section> with material ui </section> */}
      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>

        {/* filter added category */}

        <div className="flex items-center w-full pl-5 justify-between gap-5">
          <div className="col w-[18%] mb-4 mt-2">
            <h4 className="font-[600] text-[14px] mb-2">Category By</h4>
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
          {/* filter for sub category */}
             <div className="col w-[18%] mb-4 mt-2">
            <h4 className="font-[600] text-[14px] mb-2">Sub Category By</h4>
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
          {/* filter for third level category */}
           <div className="col w-[18%] mb-4 mt-2">
            <h4 className="font-[600] text-[14px] mb-2">Third Level Category By</h4>
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
                  context?.categoryData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 && cat?.children?.map((subcat) => {
                        return (
                          subcat?.children?.length !== 0 && subcat?.children?.map((thirdcat, index) => {
                            return (
                              <MenuItem value={thirdcat?._id}
                                onClick={() => selectThirdLevelSubCatByName(thirdcat?.name)} key={index}
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
          {/* thsi is for the search bar */}
          <div className='col w-[20%] ml-auto'>
            <SearchBox />
          </div>
        </div>
        <br />

        {/* table added */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                <TableCell >
                  <Checkbox {...label} defaultChecked size='small'
                  onChange={handleSelectAll}
                  //it checked that all the data are checked or not
                  checked={productData.length >0 ? productData.every((item)=>item.checked):false}
                   />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* for loading the loader */}
              {
               isLoading ===false?(
                productData?.length !== 0 && productData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) =>
                (
                  <TableRow key={index}>
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <Checkbox {...label} defaultChecked size='small'
                      checked={product.checked === true ? true : false}
                      //to check the checkbox for delete the id with index
                      onChange={(e)=>handleCheckBoxChange(e,product._id,index)}
                      />
                    </TableCell>
                    {/* product detail */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 w-[350px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to={`/product/${product?.id}`}  className="!text-gray-900 !no-underline hover:!text-[#3872fa]">
                              <img
                               src={product?.images[0]}
                                className="w-full group-hover:scale-110 transition-all"
                              />
                            </Link>
                          </div>
                          <div className="info w-[75%]">
                            <h3 className="font-[600] text-[12px] leading-4 ">
                              <Link to={`/product/${product?.id}`} className="!text-gray-900 !no-underline hover:!text-[#3872fa]">
                                {product?.name}
                              </Link>

                            </h3>
                            <span className='text-[12px]'>{product?.brand}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    {/* category */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      {product?.catName}
                    </TableCell>
                    {/* subcategory */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      {product?.subCat}
                    </TableCell>
                    {/* price */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <div className="flex gap-1 flex-col">
                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                          &#x20b9;{product?.oldPrice}
                        </span>
                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                           &#x20b9;{product?.price}
                        </span>
                      </div>
                    </TableCell>
                    {/* sales */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <p className='text-[14px] w-[80px]'>
                        <span className='font-[600]'>{product?.sale}</span> sales
                      </p>
                    </TableCell>
                    {/* rating */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <p className='text-[13px] w-[80px]'>
                        <Rating name="half-rating-read" size='small' defaultValue={product.rating} precision={0.5} readOnly
                         />
                      </p>
                    </TableCell>
                    {/* stock */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <p className='text-[14px] w-[80px]'>
                        <span className='font-[600]'>{product?.countInStock}</span>
                      </p>
                    </TableCell>
                    {/* action */}
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <div className="flex items-center gap-1">
                        <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                        onClick={()=>context.setisOpenFullScreenPanel({
                          open:true,
                          model:'Edit product',
                          id:product._id
                        })}
                        >
                          <FiEdit3 className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                        <Link to={`/product/${product?._id}`}>
                        <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                        >
                          <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                        </Link>
                        <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                        onClick={()=>deleteProduct(product._id)}
                        >
                          <MdDeleteOutline className="text-[rgba(0,0,0,0.7)] text-[22px]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
                )
              )
              :
               <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center justify-center w-full min-h-[400px]">
                  <CircularProgress color="inherit" />
                </div>
              </TableCell>
            </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length} // total row according to data
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  )
}

export default Products;
