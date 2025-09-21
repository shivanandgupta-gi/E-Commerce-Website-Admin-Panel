import React, { useContext, useEffect, useState } from 'react'
import DashboardBoxes from '../../Componenets/DashboardBoxes';
import { IoMdAdd } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from '../../Componenets/Badge';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Progress from '../../Componenets/ProgressBar';
import { FiEdit3 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from '../../Componenets/SearchBox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from '../../App';
import { getData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';



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

const Dashboard=()=> {
  
  const context =useContext(MyContext);

   const [isOpenOrderProduct, setisOpenOrderProduct]=useState(null);
      const isShowOrderProduct=(idx)=>{
          if(isOpenOrderProduct===idx){
              setisOpenOrderProduct(null);
          }else
          setisOpenOrderProduct(idx);
      }
    //   material ui table data
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //for filter in table
   const [categoryFilterValue, setcategoryFilterValue] =useState('');

  const handleChangeCatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };

  //chart data

const [chart1Data, setChart1Data] = useState(
    [
  {
    name: 'JAN',
    TotalUsers: 4000,
    TotalSales: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    TotalUsers: 3000,
    TotalSales: 1398,
    amt: 2210,
  },
  {
    name: 'MAR',
    TotalUsers: 2000,
    TotalSales: 9800,
    amt: 2290,
  },
  {
    name: 'APRIL',
    TotalUsers: 2780,
    TotalSales: 3908,
    amt: 2000,
  },
  {
    name: 'MAY',
    TotalUsers: 1890,
    TotalSales: 4800,
    amt: 2181,
  },
  {
    name: 'JUNE',
    TotalUsers: 2390,
    TotalSales: 3800,
    amt: 2500,
  },
  {
    name: 'JULY',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'AUG',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'SEP',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
   {
    name: 'OCT',
    TotalUsers: 3490,
    TotalSales: 6000,
    amt: 2100,
  },
   {
    name: 'NOV',
    TotalUsers: 3490,
    TotalSales: 5400,
    amt: 2100,
  },
   {
    name: 'DEC',
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
]
);
  //backend fo table of reacent product
  const [productCategory, setproductCategory] = useState('');
  const [productSubCategory, setproductSubCategory] = useState('');
   const [productThirdLevelSubCategory, setproductThirdLevelSubCategory] = useState('');
     const [productData, setProductData] = useState([]); //to store all product data
     const [isLoading,setIsLoading]=useState(false);
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
  return (
    <>
      <div className="w-full p-5 py-2 px-5 bg-[#f1faff]  border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">Good Morning,<br/> Shivanand </h1>
          <p>Here's what happening on your store today. See the statistics at once.</p>
          <br/>
          <Button className="btn-blue !capitalize" onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Product"})}}><IoMdAdd/> Add Product</Button>
        </div>
      <img src="https://ecommerce-admin-view.netlify.app/shop-illustration.webp" className="w-[250px]"/>
      </div>
    <DashboardBoxes/>

    {/* table added for recent product */}

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
                        <Rating name="half-rating-read" size='small' defaultValue={product.rating} precision={0.5}
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

{/* thsi is for the chart  */}
      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
       <div className='flex items-center justify-between px-5 py-4'>
        <h2 className='text-[19px] font-[600] mt-2'>Total Users & Total Sales</h2>
      </div>
        <div className="flex items-center gap-5 px-5 py-5 pt-1">
            <span className="flex items-center gap-1 text-[15px]">
                <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
                Total Users
            </span>
            <span className="flex items-center gap-1 text-[15px]">
                <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span>
                Total Sales
            </span>
            </div>
        <LineChart
        width={1000}
        height={500}
        data={chart1Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke='none' />
        <XAxis dataKey="name"  tick={{fontSize:12}}/>
        <YAxis tick={{fontSize:12}} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3}  />
      </LineChart>
      </div>
    </>
  )
}

export default Dashboard;
