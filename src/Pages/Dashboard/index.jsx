import React, { useContext, useState } from 'react'
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from '../../App';

//this page for dashborad making
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//material ui table material
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

    <div className='card my-3 shadow-md sm:rounded-lg bg-white'>
      <div className='flex items-center justify-between px-5 py-4'>
        <h2 className='text-[19px] font-[600] mt-2'>Recent Orders</h2>
      </div>
      <div>
         
         <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md mt-5">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3">
                            &nbsp;
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Products</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">PinCode</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">User Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]"><Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] " onClick={()=>{isShowOrderProduct(0)}}>
                                {
                                    isOpenOrderProduct===0? 
                                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                    :
                                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                }
                            </Button></td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>pay_PTMoqESsdl562
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">Android 15</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">Shivanand Gupta</td>
                            <td className="px-6 py-4 font-[500]">6394176235</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className="block w-[400px]">
                                    Hi No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046
                                </span>
                                </td>
                            <td className="px-6 py-4 font-[500]">272172</td>
                            <td className="px-6 py-4  font-bold">76,852</td>
                            <td className="px-6 py-4 font-[500]">shivanandgupta316@gmail.com</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500] "><Badge status="confirm"/></td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-08-06</td>
                        </tr> 
                        {
                            isOpenOrderProduct ===0 &&
                                <tr>
                            <td  colSpan="6" className="px-6 ">
                            <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md ">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>iPhone 16e 128 GB: Built for Apple Intelligence
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <img src='https://m.media-amazon.com/images/I/61FMZ9rSZUL._SX679_.jpg'
                                className='w-[40px] h-[40px] object-cover rounded-md'/>
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">5</td>
                            <td className="px-6 py-4 font-bold">69,599</td>
                            <td className="px-6 py-4 font-bold">
                                79,999
                                </td>
                           
                        </tr> 

                        
                    </tbody>
                </table>
                </div>
                </td>
                        </tr>
                        }
                        
                    </tbody>

                    {/* second row */}
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]"><Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] " onClick={()=>{isShowOrderProduct(1)}}>
                                {
                                    isOpenOrderProduct===1? 
                                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                    :
                                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]"  />
                                }
                            </Button></td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa] font-[600]'>pay_PTMoqESsdl562
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">Android 15</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">Shivanand Gupta</td>
                            <td className="px-6 py-4 font-[500]">6394176235</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className="block w-[400px]">
                                    Hi No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046
                                </span>
                                </td>
                            <td className="px-6 py-4 font-[500]">272172</td>
                            <td className="px-6 py-4  font-bold">76,852</td>
                            <td className="px-6 py-4 font-[500]">shivanandgupta316@gmail.com</td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-[#3872fa]'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500] "><Badge status="confirm"/></td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-08-06</td>
                        </tr> 
                        {
                            isOpenOrderProduct ===1 &&
                                <tr>
                            <td  colSpan="6" className="px-6 ">
                            <div className="relative overflow-x-auto shadow-md w-full py-5 px-8 rounded-md ">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Id</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700   bg-white">
                        
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>635585s588df445e5setd5255sa
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>iPhone 16e 128 GB: Built for Apple Intelligence
                                </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                                <img src='https://m.media-amazon.com/images/I/61FMZ9rSZUL._SX679_.jpg'
                                className='w-[40px] h-[40px] object-cover rounded-md'/>
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">5</td>
                            <td className="px-6 py-4 font-bold">69,599</td>
                            <td className="px-6 py-4 font-bold">
                                79,999
                                </td>
                           
                        </tr> 

                        
                    </tbody>
                </table>
                </div>
                </td>
                        </tr>
                        }
                        
                    </tbody>
                </table>
                </div>
        


        </div>
    </div>



 {/* recent product <section> with material ui </section> */}
    <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
      <div className='flex items-center justify-between px-5 py-4'>
        <h2 className='text-[19px] font-[600] mt-2'>Products</h2>
      </div>
      {/* filter added category */}

        <div className="flex items-center w-full pl-5 justify-between ">
            <div className="col w-[20%] mb-4">
                <h4 className="font-[600] text-[13px] mb-2">Category</h4>
                <Select
                className='w-full'
                size='small'
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={categoryFilterValue}
          onChange={handleChangeCatFilter}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
            </div>
            <div className="col w-[25%] ml-auto flex items-center gap-3">
                <Button className='btn-blue btn-sm !bg-green-500'>Export</Button>
                <Button className='btn-blue btn-sm ' onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Product"})}}>Add Product</Button>
            </div>
            </div>
            {/* table added */}
         <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
                <TableCell >
                    <Checkbox {...label} defaultChecked size='small'/>
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
            <TableRow>
                
                <TableCell style={{minWidth: columns.minWidth}}>
                        <Checkbox {...label} defaultChecked size='small'/>
                </TableCell>
                {/* product detail */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        <div className="flex items-center gap-4">
                               <div className="flex items-center gap-4 w-[350px]">
                                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                        <Link to="/product/12456" className="!text-gray-900 !no-underline hover:!text-[#3872fa]">
                                        <img
                                        src="https://serviceapi.spicezgold.com/download/1753721820703_flexfive-total-hair-wellness-shampoo-strengthen-and-restore-damaged-hair-deep-repair-and-long-lasting-smoothness-suitable-for-all-hair-types-300-ml-pack-of-2-product-images-orvfvqsttsj-p611363019-0-202504281.jpg"
                                        className="w-full group-hover:scale-110 transition-all"
                                        />
                                        </Link>
                                    </div>
        

                                    <div className="info w-[75%]">
                                    <h3 className="font-[600] text-[12px] leading-4 ">
                                        <Link to="/product/12456" className="!text-gray-900 !no-underline hover:!text-[#3872fa]">
                                        FLEXFIVE Total Hair Wellness Shampoo
                                        </Link>
                                        
                                    </h3>
                                    <span className='text-[12px]'>wellness</span>
                                    </div> 
                                    </div>
                            </div>
                </TableCell>
                {/* category */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        Wellness
                </TableCell>
                {/* subcategory */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        Hair Care
                </TableCell>
                {/* price */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        <div className="flex gap-1 flex-col">
                                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                                    ₹1199.00
                                    </span>
                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                    ₹799.00
                                    </span>
                                </div>
                </TableCell>
                {/* sales */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        <p className='text-[14px] w-[80px]'>
                                    <span className='font-[600]'>45</span> sales
                                </p>
                </TableCell>
                {/* stock */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        <p className='text-[14px] w-[80px]'>
                                    <span className='font-[600]'>15</span>
                                </p>
                </TableCell>
                {/* action */}
                <TableCell style={{minWidth: columns.minWidth}}>
                        <div className="flex items-center gap-1">
                                    <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{minWidth: '35px'}}>
                                        <FiEdit3 className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                    </Button>
                                     <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{minWidth: '35px'}}>
                                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                    </Button>
                                     <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{minWidth: '35px'}}>
                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.7)] text-[22px]" />
                                    </Button>
                                 </div>
                </TableCell>
            </TableRow>

            {/* second row */}
            

          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
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
