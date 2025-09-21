import React, { useContext } from 'react'
//thsi page for the side bar in admin panel
import { Link } from 'react-router-dom'
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
import { SiBloglovin } from "react-icons/si";

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
      <div  className={`sidebar fixed z-[50] top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 ${
    context.isSidebarOpen ? "w-[18%]" : "w-[0%]"
  }`}>
        {/* for logo */}
        <div className="py-2 w-full">
          <Link to="/">
            <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg" className="w-[200px]" />
          </Link>
        </div>
        {/* for dashbord button */}
        <ul className="mt-4">
          {/* Dashboard */}
          <li>
            <Link to="/">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center  ">
              <RxDashboard className="text-[17px]" /> <span>Dashboard</span>
            </Button>
            </Link>
          </li>
          {/* Home slider addded */}
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
                  <Link to="/homeslider">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Banner List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Home Slide"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
           {/* category */}
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
                  <Link to="/category">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Category List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Category"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Category
                  </Button>
                </li>
                <li className="w-full">
                <Link to="/subcategory">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Sub Category List
                  </Button>
                  </Link>
                </li>
                <li className="w-full">
                  
                
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add New Sub Cat"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Sub Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* products */}
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

                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9"  onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Product"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product Upload
                  </Button>
                </li>
                 <li className="w-full">
                  <Link to={"/product/rams"}>
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" >
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product RAMS
                  </Button>
                  </Link>
                </li>
                 <li className="w-full">
                  <Link to={"/product/weight"}>
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product Weight
                  </Button>
                  </Link>
                </li>
                 <li className="w-full">
                  <Link to={"/product/size"}>
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Product Size
                  </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* user */}
          <li>
            <Link to="/users">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center">
              <LuUsers className="text-[17px]" /> <span>Users</span>
            </Button>
            </Link>
          </li>
          {/* order */}
          <li>
            <Link to="/orders">
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center">
              <IoBagCheckSharp className="text-[17px]" /> <span>Order</span>
            </Button></Link>
          </li>
           {/* Banner */}
          <li>
            
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center" onClick={()=>{isOpenSubMenu(4)}}>
              <FaProductHunt className="text-[20px]" /> <span>Banners</span>
               <span className='  ml-auto w-[30px] h-[30px] flex hover:!bg[#f1f1f1] items-center justify-center'> 
                {subMenuIdx.includes(4)?<FaAngleUp /> : <FaAngleDown /> }
               </span>
            </Button>
            
             {/* sub menu of the home slider */}
            <Collapse isOpened={subMenuIdx.includes(4) ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/bannerV1List">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Banner List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">

                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9"  onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add BannerV1"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner
                  </Button>
                </li>
                 <li className="w-full">
                  <Link to={"/product/rams"}>
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" >
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Banner List 2
                  </Button>
                  </Link>
                </li>
                 <li className="w-full">
                  <Link to={"/product/weight"}>
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner list 2
                  </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
           {/* Blog */}
          <li>
            <Button className="w-full !capitalize !justify-start flex hover:!bg[#f1f1f1] !py-2 gap-3 text-[14px] !text-[rgba(0,0,0,0.7)] !font-[500] items-center" onClick={()=>{isOpenSubMenu(5)}}>
              <SiBloglovin className="text-[17px]" /> <span>Blog</span>
               <span className='  ml-auto w-[30px] h-[30px] flex hover:!bg[#f1f1f1] items-center justify-center'> 
                {subMenuIdx.includes(5)?<FaAngleUp /> : <FaAngleDown /> }
               </span>
            </Button>
             {/* sub menu of the home slider */}
            <Collapse isOpened={subMenuIdx.includes(5) ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/blogList">
                  <Button className="!w-full flex items-center gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9">
                    {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Blog List
                  </Button>
                  </Link>

                </li>
                 <li className="w-full">
                  <Button className="!w-full gap-2 !text-[rgba(0,0,0,0.7)] !capitalize !justify-start !text-[13px] !font-[500] !pl-9" onClick={()=>{context.setisOpenFullScreenPanel({open:"true",model:"Add Blog"})}}>
                                        {/* Dot */}
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Blog
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* logout */}
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
