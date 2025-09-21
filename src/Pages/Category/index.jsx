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
import { deleteCategory, getData } from '../../../utils/api';

//this page for dashborad making
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//material ui colums
const columns = [
  { id: 'Image', label: 'IMAGE', minWidth: 100 },
  { id: 'name', label: "CATEGORY NAME", minWidth: 100 },
  { id: 'Action', label: 'Action', minWidth: 100 },
];

const Category = () => {
  const context = useContext(MyContext);
  //for filter in table
  const [categoryFilterValue, setcategoryFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //backend data of category to useeffect only
  useEffect(() => { //this for the data uploaded donnt need to reload the page
    getData("/api/category/getcategory").then((res) => {
      context.setcategoryData(res?.categories);//fetch data from categories
    })
  }, [context?.isOpenFullScreenPanel])

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


  //deleting the category item
  const deleteCategoryController = (id) => {
    deleteCategory(`/api/category/${id}`).then((res) => {
      context.openAlertBox("success", "Category Deleted Successfully")
      //after deleting the category we need to fetch the data again from backend no need to reload the page
      getData("/api/category/getcategory").then((res) => {
        context.setcategoryData(res?.categories);//fetch data from categories
      })
    })
  }
  return (
    <>
      <div className='flex items-center justify-between px-2 py-0 mt-4'>
        <h2 className='text-[19px] font-[600] '>Category List
        </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className='btn-blue btn-sm ml-auto' onClick={() => {
            context.setisOpenFullScreenPanel({
              open: true,
              model: 'Add Category'
            })
          }}>
            <IoMdAdd className='text-white text-[18px]' /> Add Category
          </Button>
        </div>
      </div>

      {/* recent product <section> with material ui </section> */}
      <div className='card my-4 shadow-md sm:rounded-lg !bg-white'>

        {/* table added */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                
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
              {/* print the category data in table */}
              {
                context.categoryData.length !== 0 && context.categoryData?.map((item, index) => {
                  return (
                    <TableRow>
                     
                      {/* Home Slider Banner with image detail */}
                      <TableCell width={100} >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-4 w-[80px]">
                            <div className="img w-full  rounded-md overflow-hidden group">
                              <Link to="/product/12456" className="!text-gray-900 !no-underline hover:!text-[#3872fa] ml-10">
                                <img
                                  src={Array.isArray(item.images) ? item.images[0] : item.images}
                                  className="w-full group-hover:scale-110 transition-all"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      {/* CATEGORY NAME */}
                      <TableCell width={100}>
                        <h3>{item.name}</h3>
                      </TableCell>

                      {/* action */}
                      <TableCell width={100} >
                        <div className="flex items-center gap-1">
                          <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                            onClick={() => {
                              // open the edit category click on edit buttom
                              context.setisOpenFullScreenPanel({
                                open: true,
                                model: 'Edit Category',
                                id: item?._id,
                              })
                            }}
                          >
                            <FiEdit3 className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>
                          <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}>
                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>
                          <Button className="w-[35px] h-[35px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]" style={{ minWidth: '35px' }}
                            onClick={() => {
                              //for deleting the category
                              deleteCategoryController(item._id)
                            }}
                          >
                            <MdDeleteOutline className="text-[rgba(0,0,0,0.7)] text-[22px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }


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

export default Category;
