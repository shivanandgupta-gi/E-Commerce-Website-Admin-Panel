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
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";

//this page for product list 

//this page for dashborad making
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const users = [
  {
    id: 1,
    name: "Shivanand Gupta",
    image: "https://th.bing.com/th/id/OIP._TDBcYPsjrIY0siNExBBwwHaEo?w=296&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    email: "john@example.com",
    phone: "+1 555 123 456",
    created: "2025-08-10",
  },
  {
    id: 2,
    name: "Ram",
    image: "https://th.bing.com/th/id/OIP.oi5s1hlNpqBHxLI_iZq3SAHaFj?w=60&h=60&c=1&rs=1&qlt=70&r=0&o=7&dpr=1.3&pid=InlineBlock&rm=3",
    email: "jane@example.com",
    phone: "+1 555 987 654",
    created: "2025-08-09",
  },
];

//material ui colums
const columns = [
  { id: 'user', label: 'USER', minWidth: 150 },
  { id: 'userPhonenumber', label: 'USER PHONE NO', minWidth: 100 },
  
  {
    id: 'created',
    label: 'CREATED',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 100,
  },
];

const Users=()=> {
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
      
      
        {/* recent product <section> with material ui </section> */}
    <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
      
      {/* filter added category */}

        <div className="flex items-center w-full pl-6 justify-between ">
            <div className="col w-[40%] mb-4 mt-5">
                 <h2 className='text-[19px] font-[600] '>Users List</h2>
                </div>
                 {/* thsi is for the search bar */}
             <div className='col w-[40%] ml-auto mt-2'>
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
  {users
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user, index) => (
      <TableRow hover key={user.id || index}>
        
        {/* Checkbox */}
        <TableCell>
          <Checkbox {...label} size="small" />
        </TableCell>

        {/* USER column */}
        <TableCell>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-[40px] h-[40px] rounded-md overflow-hidden flex items-center justify-center bg-gray-200 text-lg font-bold text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.charAt(0)
              )}
            </div>

            {/* Name + Email */}
            <div>
              <h3 className="font-[500] text-[14px]">{user.name}</h3>
              <p className="flex items-center gap-1 text-gray-600 text-[12px]">
                <MdEmail className="text-gray-500" size={14} />
                *********
              </p>
            </div>
          </div>
        </TableCell>

        {/* USER PHONE NO column */}
        <TableCell>
          <p className="flex items-center gap-1 text-gray-600 text-[14px]">
            <FiPhoneCall size={14} />
            *********
          </p>
        </TableCell>

        {/* CREATED column */}
        <TableCell>
          <p className="flex items-center gap-1 text-gray-600 text-[14px]">
            <MdOutlineCalendarMonth size={14} />
            {user.created}
          </p>
        </TableCell>

        {/* ACTION column */}
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(user.id)}
          >
            DELETE
          </Button>
        </TableCell>
      </TableRow>
    ))}
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

export default Users;
