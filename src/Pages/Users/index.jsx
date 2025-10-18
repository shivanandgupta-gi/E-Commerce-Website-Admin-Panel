import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import SearchBox from '../../Componenets/SearchBox';
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useEffect } from 'react';
import { deleteData, getData } from '../../../utils/api';
import EmailVerifyBadge from '../../Componenets/Badge/EmailVerify';
import CircularProgress from '@mui/material/CircularProgress';

//this page for product list 

//this page for dashborad making
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//material ui colums
const columns = [
  { id: 'user', label: 'USER IMAGE', minWidth: 100 },
   { id: 'user', label: 'USER NAME', minWidth: 100 },
   { id: 'user', label: 'EMAIL', minWidth: 150 },
   { id: 'emailVerify', label: 'EMAIL VERIFY', minWidth: 50 },
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
         const [rowsPerPage, setRowsPerPage] = React.useState(50);
         const [userData, setUserData]=useState([]);
         const [userTotalData, setUserTotalData]=useState([]);
         const [isLoading,setIsLoading]=useState(false);
         const [searchQuery,setSearchQuery]=useState("");
        const handleChangeCatFilter = (event) => {
          setcategoryFilterValue(event.target.value);
        };
        const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   //   material ui table data
       const [page, setPage] =useState(0);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    //for prduct uploading
    const context=useContext(MyContext);

    //backend start here
    useEffect(()=>{
      getusers();
    },[])
    const getusers=()=>{
      setIsLoading(true);
      getData(`/api/user/get-all-users`).then((res)=>{
        if(res?.error === false){
          setTimeout(() => {
             setUserData(res?.data);
            setUserTotalData(res?.data)
            setIsLoading(false);
          }, 400);
        }
      })
    }
    //for searching
    useEffect(()=>{
      // Filter orders based on search query
      if (searchQuery !== "") {
          const filteredOrders = userTotalData?.filter((user) =>
              user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user?.mobile?.includes(searchQuery)
          );
          setUserData(filteredOrders);
      } else {
          getData(`/api/user/get-all-users`).then((res) => {
              if (res?.error === false) {
                  setUserData(res?.data);
                  setIsLoading(false)
              }
          });
      }
    },[searchQuery])
    //delte user data
    const deleteUser = (id) => { //delete the cart item function
            deleteData(`/api/user/delete/${id}`).then((res) => { //delete the item from cart
              if(res.error === false){
                context.openAlertBox("success","User Delte Successfully");
                 getusers();
              }
            });
        }
  return (
    <>
        {/* recent product <section> with material ui </section> */}
    <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className="flex items-center w-full pl-6 justify-between ">
            <div className="col w-[40%] mb-4 mt-5">
                 <h2 className='text-[19px] font-[600] '>Users List</h2>
                </div>
                 {/* thsi is for the search bar */}
             <div className='col w-[40%] ml-auto mt-2'>
                <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                />
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
                  <span className='whitespace-nowrap'>{column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              userData.length!==0 && isLoading===false &&userData.slice(
                page*rowsPerPage, page*rowsPerPage+rowsPerPage
              )?.reverse()?.map((user,index)=>(
                <TableRow >
            {/* Checkbox */}
            <TableCell>
              <Checkbox {...label} size="small" />
            </TableCell>

            {/* USER column */}
            <TableCell>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                  <img
                    src={user.avatar ? user.avatar : "https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?w=190&h=190&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3"}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                </div>
              </div>
            </TableCell>
            {/* name */}
             <TableCell>
              <span className='flex items-center gap-2'>
                    {user.name}
              </span>
            </TableCell>
             {/* Email */}
            <TableCell>
              <span className='flex items-center gap-2'>
                  <MdEmail className="text-gray-500" size={14} />
                    {user.email}
              </span>
            </TableCell>
            <TableCell>
              {
                <EmailVerifyBadge status={user.verify_email}/>
              }
            </TableCell>
            {/* USER PHONE NO column */}
            <TableCell>
              <p className="flex items-center gap-1 text-gray-600 text-[14px]">
                 <FiPhoneCall size={14} />
                {user.mobile ? user.mobile : "NONE"}
              </p>
            </TableCell>

            {/* CREATED column */}
            <TableCell>
              <span className="flex items-center gap-2">
                <MdOutlineCalendarMonth />  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short", // or "long" for full name
                    year: "numeric",
                  })}
              </span>
            </TableCell>

            {/* ACTION column */}
            <TableCell>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => deleteUser(user._id)}
              >
                DELETE
              </Button>
            </TableCell>
          </TableRow>
                  ))
                }
</TableBody>
        </Table>
      </TableContainer>
       <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
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
