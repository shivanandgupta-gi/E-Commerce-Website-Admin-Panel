import React, { useEffect, useRef, useState } from "react";
//for product detail page
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import './index.css';
import { useParams } from "react-router-dom";
import { getData } from "../../../utils/api";
import { MdBrandingWatermark } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { MdFilterVintage } from "react-icons/md";
import { CgSize } from "react-icons/cg";
import { FaWeight } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';




const ProductDetail = () => {
    //for zoom image 
      const [slideIndex, setSlideIndex] = useState(0);
      const zoomSliderBig = useRef();
      const zoomSliderSml = useRef();

      const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSml.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
      };
      //backend
      const [product,setProduct]=useState({
        images:[],
        productRam:[],
        size:[],
        productWeight:[],
        reviews:[]
      });
      const {id}=useParams(); //param is used to take dynamic id in react
      useEffect(()=>{
        //to get all data from backed of that product
        getData(`/api/product/getSingleProduct/${id}`).then((res)=>{
            if(res?.error === false){
                setTimeout(() => {
                    setProduct(res?.product);
                }, 1500);
            }
        })
      },[]);
      console.log(product.images)

    return (
        <>
            <div className="flex items-center justify-between px-1.5 py-0 mt-3">
                <h1 className="text-[18px] font-[600]">
                    Porduct Details
                </h1>
            </div>
            <br/>
            {/* for loading icon shown */}
            {
                product._id !== "" && product._id !== null && product._id !== undefined ?
                <> 
                 <div className=" productDetails flex gap-8">
                {/* this for the image shown and zoom */}
                <div className="w-[40%] ">
                    {/* if image length 0 then no need to run */}
                    {
                        product.images.length !== 0 &&
                         <div className="flex gap-3">
                        <div className="slider w-[15%]">
                        <Swiper
                            // install Swiper modules
                            ref={zoomSliderSml}
                            direction={'vertical'}
                            modules={[Navigation]}
                            navigation={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            centeredSlides={false} // ✅ prevents centering
                            className={`zoomProductSlider h-[450px] overflow-hidden ${product?.images?.length >5 && 'space'}`}
                            >
                                {/* map on image for dynamic making */}
                            {
                                product.images.map((item,index)=>{
                                    return (
                                        <SwiperSlide key={index}> 
                                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`} onClick={()=>goto(index)}>
                                            <img src={item}
                                            className="w-full transition-all group-hover:scale-110"></img>
                                        </div>
                                    </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        </div>
                    
                    <div className="zoomContainer w-[85%] h-[450px] overflow-hidden">
                        <Swiper
                            // install Swiper modules
                            ref={zoomSliderBig}
                            navigation={false}
                            slidesPerView={1}
                            spaceBetween={0} // ✅ prevents centering
                            >
                            {/* map on image for dynamic making */}
                            {
                                 product.images.map((item,index)=>{
                                    return(
                                         <SwiperSlide key={index}>
                                            <InnerImageZoom
                                                zoomType="hover"
                                                zoomScale={1.5}
                                                src={item}
                                                />
                                            </SwiperSlide>
                                    )}
                                )
                            }
                    </Swiper>
                    </div>
                    </div>
                    }
                    
                </div>

                {/* for product detail */}
                  <div className="w-[60%]">
                    <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>
                    {/* brand name */}
                    <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <MdBrandingWatermark className="opacity-65" />
                        Brand :
                        </span>
                        <span>{product?.brand}</span>
                    </div>
                    {/* catrgory name */}
                     <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <TbCategoryFilled className="opacity-65" />
                        Category :
                        </span>
                        <span>{product?.catName}</span>
                    </div>
                    {/* ram name */}
                    {
                        product.productRam.length !== 0 &&
                        <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <MdFilterVintage className="opacity-65" />
                         RAM :
                        </span>
                        {/* due to multiple ram size */}
                        <div className="flex items-center gap-2">
                        {
                            product.productRam.map((item,index)=>(
                                 <span className="inline-block p-1 shadow-sm bg-[#fff] font-[500]" key={index}>{item}</span>
                            ))
                        }
                        </div>
                    </div>
                    }
                      {/* size  */}
                    {
                        product.size.length !== 0 &&
                        <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <CgSize className="opacity-65" />
                         Size :
                        </span>
                        {/* due to multiple  size */}
                        <div className="flex items-center gap-2">
                        {
                            product.size.map((item,index)=>(
                                 <span className="inline-block p-1 shadow-sm bg-[#fff] font-[500]" key={index}>{item}</span>
                            ))
                        }
                        </div>
                    </div>
                    }
                     {/* weight  */}
                    {
                        product.productWeight.length !== 0 &&
                        <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <FaWeight className="opacity-65" />
                         Weight :
                        </span>
                        {/* due to multiple weight  */}
                        <div className="flex items-center gap-2">
                        {
                            product.productWeight.map((item,index)=>(
                                 <span className="inline-block p-1 shadow-sm bg-[#fff] font-[500]" key={index}>{item}</span>
                            ))
                        }
                        </div>
                    </div>
                    }
                    {/* for review */}
                     <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <MdRateReview className="opacity-65" />
                        Review :
                        </span>
                        <span>({product?.reviews?.length || 0}) Review</span>
                    </div>
                    {/* for publish */}
                     <div className="flex items-center py-2 pl-10">
                        <span className="w-[20%] font-[500] flex items-center gap-2">
                        <BsPatchCheckFill className="opacity-65" />
                        Published :
                        </span>
                       <span>{new Date(product?.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                            })}</span>
                    </div>
                     <br/>
                    {/* product description */}
                    <h2 className="text-[19px] font-[500] mb-4">Product Description</h2>
                        {
                        product?.description && <p className="text-[15px]">{product?.description}</p>
                        }
                </div>  
            </div>
           
            <br/>
            <br/>
            {/* for review */}
            <h2 className="text-[21px] font-[600]">Customer Review</h2>
            <div className="reviewsWrap mt-3">
                <div className="reviews w-full h-auto mb-3 p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-8">
                    <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                        <img
                        src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        className="w-full h-full object-cover"
                        />
                    </div>
                    {/* date and review */}
                        <div className="info w-[80%]">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[16px] font-[500]">Naveen Kumar</h4>
                                <Rating read-only value={5} readOnly size="small" />
                            </div>
                            <span className="text-[13px]">2025-01-08</span>
                            <p className="text-[13px] mt-2">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                    </div>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </>
                :
                <div className="flex items-center justify-center h-96">
                    <CircularProgress color="inherit" />
                </div>
            }

            :

           
        </>
    )
};

export default ProductDetail;

