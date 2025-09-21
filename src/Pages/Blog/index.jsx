//thsi page same as product upload the banner in main page
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
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import { FiEdit3 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import SearchBox from '../../Componenets/SearchBox';
import { MyContext } from '../../App';
import { deleteData, getData } from '../../../utils/api';

//this page for dashborad making
//same copy from bannerv1
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//material ui colums
const columns = [
  { id: 'Image', label: 'IMAGE', minWidth: 250 },
  { id: 'title', label: 'TITLE', minWidth: 200 },
  { id: 'description', label: 'DESCRIPTION', minWidth: 300 },
  { id: 'Action', label: 'Action', minWidth: 100 },
];

const BlogList = () => {
  //for filter in table
  const [categoryFilterValue, setcategoryFilterValue] = useState('');
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
  const context = useContext(MyContext);

  //backend start here
  const [BlogData, setBlogData] = useState([]);
  //useeffect after uploading the image it shown in homeslider list it run after image upload
  useEffect(() => {
    getSlide(); //it function to get item
  }, [context.isOpenFullScreenPanel]) //if after adding panel down then fetch the data
  const getSlide = () => {
    getData("/api/blog/getBlog").then((res) => {
      if (res.error === false) {
        setBlogData(res.blogs);
      }
    })
  }
  //to remove all the slide on click delete button
  const deleteSlide = (id) => {
    deleteData(`/api/blog/${id}`).then((res) => {
      getSlide();
      context.openAlertBox("success", "Blog deleted successfully")
    })
  }
  return (
    <>
      <div className='flex items-center justify-between px-2 py-0 mt-4'>
        <h2 className='text-[19px] font-[600] '>Banners List</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm ml-auto' onClick={() => {
            context.setisOpenFullScreenPanel({
              open: true,
              model: 'Add Blog'
            })
          }}>
            <IoMdAdd className='text-white text-[18px]' /> Add Blog
          </Button>
        </div>
      </div>

      {/* recent product <section> with material ui </section> */}
      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        {/* table added */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} defaultChecked size='small' />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                //this for shown all the slide on homeslider page 
                BlogData.length > 0 && BlogData.map((item, index) => (
                  <TableRow >
                    <TableCell key={index}  >
                      <Checkbox {...label} defaultChecked size='small' />
                    </TableCell>
                    {/* Home Slider Banner with image detail */}
                    <TableCell width={250} >
                      <div className="flex items-center">
                        <div className="flex items-center  w-[350px]">
                          <div className="img w-full  rounded-md overflow-hidden group">
                            <img
                              src={item.images[0]}
                              className="w-full group-hover:scale-110 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    {/* title */}
                    <TableCell width={200} >
                      <span className='text-[15px] font-[500]'>{item.title}</span>
                    </TableCell>
                    {/* description */}
                    <TableCell width={300}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: (item?.description || "").substring(0, 300) + "......."
                        }}
                      />
                    </TableCell>
                    {/* action */}
                    <TableCell width={100} >
                      <div className="flex items-center gap-5">
                        <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                          onClick={() => {
                            // open the edit category click on edit buttom
                            context.setisOpenFullScreenPanel({
                              open: true,
                              model: 'Edit Blog',
                              id: item?._id,
                            })
                          }}
                        >
                          <FiEdit3 className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                        <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                          onClick={() => deleteSlide(item._id)}
                        >
                          <MdDeleteOutline className="text-[rgba(0,0,0,0.7)] text-[22px]" />
                        </Button>
                      </div>
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
          count={BlogData?.length} // total row according to data
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </> 
  ) 
}

export default BlogList;

