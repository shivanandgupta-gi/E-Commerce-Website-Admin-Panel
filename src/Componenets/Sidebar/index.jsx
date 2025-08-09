import React, { useContext } from 'react'
//thsi page for the side bar in admin panel
import Link from '@mui/material/Link';
import { RxDashboard } from "react-icons/rx";
import Button from '@mui/material/Button';
import { FaRegImage } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaProductHunt } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';
import { useState } from 'react';
import { FaAngleUp } from "react-icons/fa";
import { MyContext } from '../../App';

const Sidebar=()=> {

  const [subMenuIdx, setSubMenuIdx] = useState([]);

const isOpenSubMenu = (idx) => {
  if (subMenuIdx.includes(idx)) {
    setSubMenuIdx(subMenuIdx.filter((item) => item !== idx));
  } else {
    setSubMenuIdx([...subMenuIdx, idx]);
  }
};
const context=useContext(MyContext);
  return (

    
    <>

      <div  className={`sidebar fixed top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 ${
    context.isSidebarOpen ? "w-[18%]" : "w-[0%]"
  }`}>
        {/* for logo */}
        <div className="py-2 w-full">
          <Link to="/">
            <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" className="w-[120px]" />
          </Link>
        </div>
        {/* for dashbord button */}
        <ul className="mt-4">
          <li>
            <Link to="/">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center  ">
              <RxDashboard className="text-[17px]" /> <span>Dashboard</span>
            </Button>
            </Link>
          </li>
          <li>
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center" onClick={()=>{isOpenSubMenu(1)}}>
              <FaRegImage className="text-[17px]" /> <span>Home Sliders</span>
              <span className='  ml-auto w-[30px] h-[30px] flex hover:!bg[#f1f1f1] items-center justify-center' >
                 {subMenuIdx.includes(1)?<FaAngleUp /> : <FaAngleDown /> }</span>
            </Button>

          {/* sub menu of the home slider */}
            <Collapse isOpened={subMenuIdx.includes(1) ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Banner List
                  </Button>

                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center">
              <LuUsers className="text-[17px]" /> <span>Users</span>
            </Button>
            </Link>
          </li>
          <li>
            
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center" onClick={()=>{isOpenSubMenu(2)}}>
              <FaProductHunt className="text-[20px]" /> <span>Products</span>
               <span className='  ml-auto w-[30px] h-[30px] flex hover:!bg[#f1f1f1] items-center justify-center'> 
                {subMenuIdx.includes(2)?<FaAngleUp /> : <FaAngleDown /> }
               </span>
            </Button>
            
             {/* sub menu of the home slider */}
            <Collapse isOpened={subMenuIdx.includes(2) ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">
                  <Link to="/product/upload">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product Upload
                  </Button>
                  </Link>
                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product RAMS
                  </Button>
                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product Weight
                  </Button>
                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product Size
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center" onClick={()=>{isOpenSubMenu(3)}}>
              <TbCategory className="text-[17px]" /> <span>Category</span>
               <span className='  ml-auto w-[30px] h-[30px] flex hover:!bg[#f1f1f1] items-center justify-center'> 
                {subMenuIdx.includes(3)?<FaAngleUp /> : <FaAngleDown /> }
               </span>
            </Button>
             {/* sub menu of the home slider */}
            <Collapse isOpened={subMenuIdx.includes(3) ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/categories">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Category List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">
                  <Link to="/categories/add">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Category
                  </Button>
                  </Link>
                </li>
                <li className="w-full">
                <Link to="/categories/subCat">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Sub Category List
                  </Button>
                  </Link>
                </li>
                <li className="w-full">
                  
                <Link to="/categories/subCatAdd">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Sub Category
                  </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center">
              <IoBagCheckSharp className="text-[17px]" /> <span>Order</span>
            </Button></Link>
          </li>
          <li>
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center">
              <IoIosLogOut className="text-[20px]" /> <span>LogOut</span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar;
