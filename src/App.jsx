import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Componenets/Header";
import Sidebar from "./Componenets/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Products from "./Pages/Products";
import Slide from '@mui/material/Slide';
import HomeBannerSliderUpload from "./Pages/HomeSliderBannerUpload";
import Category from "./Pages/Category";
import SubCategory from "./Pages/Category/SubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPass from "./Pages/ForgotPass";
import VerifyOTP from "./Pages/VerifyOTP";
import ChangePass from "./Pages/ChangePass";
import toast, { Toaster } from 'react-hot-toast';
import { getData } from "../utils/api";
import { useEffect } from "react";
import Profile from "./Pages/Profile";
import ProductDetail from "./Pages/Products/ProductDetail";
import AddRAM from "./Pages/Products/AddRAM";
import AddWeight from "./Pages/Products/AddWeight";
import AddSize from "./Pages/Products/AddSize";
import HomeBannerSlider from "./Pages/HomeSliderBannerUpload";
import BannerV1List from "./Pages/Banner/BannerV1List";
import BlogList from "./Pages/Blog";
//for product uploading page

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin]=useState(false);
  //this is for the product uploading to open full screen
  const [userData,setUserData]=useState(null);//for user name and password shown on profile
  const [isOpenFullScreenPanel,setisOpenFullScreenPanel]=useState({
    open:false,
    model:'',
    id:''
  });
   const handleClose = () => {
      console.log("Close triggered");   // ✅ check if it runs
      setisOpenFullScreenPanel(prev => ({
    ...prev,
    open: false
  }));
  };
  const [categoryData, setcategoryData] = useState([]); //it store the data from backend of category from addcategory component
  //this is for the navigation
  //const history=useNavigate();
   //toster function
  const openAlertBox=(status,msg)=>{
    if(status==="success"){
      toast.success(msg);
    }
    else if(status==="error"){
      toast.error(msg);
    }
  }
  const router = createBrowserRouter([
    //dashboard route
    {
      path: "/",
      element: (
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Dashboard />
            </div>
          </div>
        </section>
      ),
    },
    //login page route
    {
      path: "/login",
      element: (
       <Login/>
      ),
    },
    //signup page route
    {
      path: "/signup",
      element: (
       <SignUp/>
      ),
    },
    //product page roujte
    {
      path: "/products",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Products/>
            </div>
          </div>
        </section>
      ),
    },
    //homeslide banner page rote
    {
      path: "/homeslider",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <HomeBannerSlider/>
            </div>
          </div>
        </section>
      ),
    },
    //category banner
    {
      path: "/category",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Category/>
            </div>
          </div>
        </section>
      ),
    },
    //subcategory
     {
      path: "/subcategory",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <SubCategory/>
            </div>
          </div>
        </section>
      ),
    },
    //users router
     {
      path: "/users",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Users/>
            </div>
          </div>
        </section>
      ),
    },
    //orders
     {
      path: "/orders",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Orders/>
            </div>
          </div>
        </section>
      ),
    },
    //forgotpassword route
    {
      path: "/forgot-password",
      element: (
       <ForgotPass/>
      ),
    },
    //for forgot password otp sent and then login 
     {
      path: "/verify",
      element: (
       <VerifyOTP/>
      ),
    },
    //change password
     {
      path: "/change-password",
      element: (
       <ChangePass/>
      ),
    },
    //for user profile
     {
      path: "/profile",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <Profile/>
            </div>
          </div>
        </section>
      ),
    },
    //for user detail
     {
      path: "/product/:id",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <ProductDetail/>
            </div>
          </div>
        </section>
      ),
    },
    //for add rams
    {
      path: "/product/rams",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <AddRAM/>
            </div>
          </div>
        </section>
      ),
    },
    //for add weight
     {
      path: "/product/weight",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <AddWeight/>
            </div>
          </div>
        </section>
      ),
    },
    //for add size
     {
      path: "/product/size",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <AddSize/>
            </div>
          </div>
        </section>
      ),
    },
     //BannerV1 banner page rote mini ads
    {
      path: "/bannerV1List",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <BannerV1List/>
            </div>
          </div>
        </section>
      ),
    },
    //adding for blog
    {
      path: "/blogList",
      element: (
        <section className="min">
          <Header />
          <div className="contentMain flex">
            <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen===true ? "w-[18%]" : "w-[0px] opacity-0"} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5  ${isSidebarOpen===true ? "w-[82%]" : "w-[100%]"} transition-all`}>
              <BlogList/>
            </div>
          </div>
        </section>
      ),
    },
  ]);


    //for login user show logo or user profile or not 
     useEffect(()=>{
       const token=localStorage.getItem('accesstoken');
       if(token !== undefined && token!==null && token !== ''){
         setIsLogin(true);
         getData('/api/user/user-details').then((res)=>{
           setUserData(res.data);
           //this for if user logged out for long time the login open and logout
           if (res?.response?.data?.message === "You have not login") {
              localStorage.removeItem("accesstoken");
              localStorage.removeItem("refreshtoken");
              alertBox("error", "Your session is closed please login again");
              setIsLogin(false);
              window.location.href = "/login";
            //  //history("/login"); // Navigate without reload
            }
         })
       }
       else{
         setIsLogin(false);
       }
     },[isLogin]
     )
     useEffect(() => {
         getData("/api/category/getcategory").then((res) => {
           setcategoryData(res?.categories);//fetch data from categories
         })
       },[]) //if we not add [] then it will run the useEffect function and it will fetch the data from backend and it will store in the categoryData state variable infinite time
       const [addressData,setAddressData]=useState([]);//to store the address data from backend
       const setAddressDatas=()=>{
        getData(`/api/address/get?userId=${userData?._id}`).then((res)=>{
          if(res?.error === false){
              setAddressData(res?.data)  
              console.log("set data is ", addressData)
          }
      })
       }; //dummy function to avoid error in add address page

       // 🟢 Fetch addresses whenever userData is available or changes
useEffect(() => {
  if (userData?._id) {
    setAddressDatas();
  }
}, [userData?._id]); 

  const values = { isSidebarOpen, setIsSidebarOpen,
    isLogin, setIsLogin
    ,isOpenFullScreenPanel,setisOpenFullScreenPanel,
    openAlertBox,
    userData,setUserData,
    setcategoryData,categoryData,
    addressData,setAddressData,
    setAddressDatas
   };
   
   
  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
       {/* this is for notification like done */}
      <Toaster />
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
