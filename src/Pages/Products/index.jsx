import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react'
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
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import { FiEdit3 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import SearchBox from '../../Componenets/SearchBox';
import { MyContext } from '../../App';

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

const Products=()=> {
       //for filter in table
         const [categoryFilterValue, setcategoryFilterValue] =useState('');
         const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
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
    const context=useContext(MyContext);
  return (
    <>
       <div className='flex items-center justify-between px-2 py-0 mt-4'>
        <h2 className='text-[19px] font-[600] '>Products</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
                <Button className='btn-blue btn-sms !bg-green-500'>
                    <FaCloudUploadAlt className='text-white text-[18px] mr-2'/>Export</Button>
                <Button className='btn-blue btn-sms ml-auto' onClick={()=>{context.setisOpenFullScreenPanel({
                    open:true,
                    model:'Add Product'
                })}}>
            <IoMdAdd className='text-white text-[18px]'  /> Add Product
            </Button>
            </div>
      </div>
      
        {/* recent product <section> with material ui </section> */}
    <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
      
      {/* filter added category */}

        <div className="flex items-center w-full pl-5 justify-between ">
            <div className="col w-[20%] mb-4 mt-2">
                <h4 className="font-[600] text-[14px] mb-2">Category By</h4>
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
            {/* thsi is for the search bar */}
             <div className='col w-[20%] ml-auto'>
                <SearchBox/>
            </div>
            </div>
            <br/>
           
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
    </>
  )
}

export default Products;
