import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { CiGift } from "react-icons/ci";
import { IoStatsChart } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { CiBank } from "react-icons/ci";
import { RiProductHuntLine } from "react-icons/ri";
import { MyContext } from '../../App';
//thsi page is for the dashboard graph making page small boxes like slae, profit, etc 

const DashboardBoxes=(props)=> {
  //backend

  return (
    <>
     <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true} 
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-[#cca3e8] hover:bg-[#ad5fe1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                <CiGift className="text-[40px] text-[#fff]" />
                <div className="info w-[70%]">
                <h3 className='text-[#fff]'>Total Users</h3>
                <b className='text-[#fff]'> {props.users}</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
            </SwiperSlide>
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-[#3872fa] hover:bg-[#0c46cd] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                <CiGift className="text-[40px] text-[#fff]" />
                <div className="info w-[70%]">
                <h3 className='text-[#fff]'>Total Orders</h3>
                <b className='text-[#fff]'>{props.orders}</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
            </SwiperSlide>
             <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-[#10b981] hover:bg-[#087b55] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                <AiOutlinePieChart className="text-[40px] text-[#fff]" />
                <div className="info w-[70%]">
                <h3 className='text-[#fff]'>Total Products</h3>
                <b className='text-[#fff]'>{props?.products}</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
            </SwiperSlide>
             <SwiperSlide>
            <div className="box p-5 bg-[#7928ca] cursor-pointer hover:bg-[#580ba6]  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
                <CiBank className="text-[40px] text-[#fff]" />
                <div className="info w-[70%]">
                <h3 className='text-[#fff]'>Revenue</h3>
                <b className='text-[#fff]'>₹ 10,56,623</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
            </SwiperSlide>
            
      </Swiper>
    </>
  )
}

export default DashboardBoxes;
