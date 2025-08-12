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

const DashboardBoxes=()=> {
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
            <div className="box p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
                <CiGift className="text-[40px] text-[#3872fa]" />
                <div className="info w-[70%]">
                <h3>New Orders</h3>
                <b>1,390</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#3872fa]" />
            </div>
            </SwiperSlide>
             <SwiperSlide>
            <div className="box p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
                <AiOutlinePieChart className="text-[40px] text-[#10b981]" />
                <div className="info w-[70%]">
                <h3>Sales</h3>
                <b>₹ 10,56,623</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#10b981]" />
            </div>
            </SwiperSlide>
             <SwiperSlide>
            <div className="box p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
                <CiBank className="text-[40px] text-[#7928ca]" />
                <div className="info w-[70%]">
                <h3>Revenue</h3>
                <b>₹ 10,56,623</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#7928ca]" />
            </div>
            </SwiperSlide>
             <SwiperSlide>
            <div className="box p-5 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 bg-white">
                <RiProductHuntLine className="text-[40px] text-[#312be1d8]" />
                <div className="info w-[70%]">
                <h3>Total Products</h3>
                <b>1,390</b>
                </div>
                <IoStatsChart className="text-[50px] text-[#312be1d8]" />
            </div>
            </SwiperSlide>
            
      </Swiper>
    </>
  )
}

export default DashboardBoxes;
