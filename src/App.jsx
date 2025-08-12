import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Componenets/Header";
import Sidebar from "./Componenets/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Products from "./Pages/Products";
//for product uploadin
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";

import Slide from '@mui/material/Slide';
import ProductAdd from "./Componenets/AddProduct";
import HomeBannerSliderUpload from "./Pages/HomeSliderBannerUpload";
import AddHomeSlideUploadUpload from "./Pages/HomeSliderBannerUpload/AddHomeSlideUpload";
import Category from "./Pages/Category";
import SubCategory from "./Pages/Category/SubCategory";
import AddCategorys from "./Pages/Category/AddSubCategory";
import AddCategory from "./Pages/Category/AddCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPass from "./Pages/ForgotPass";
import VerifyOTP from "./Pages/VerifyOTP";
import ChangePass from "./Pages/ChangePass";
//for product uploading page
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin]=useState(false);
  //this is for the product uploading to open full screen
  const [isOpenFullScreenPanel,setisOpenFullScreenPanel]=useState({
    open:false,
    model:''
  });
   const handleClose = () => {
    setisOpenFullScreenPanel({
      open:false
    });
  };


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
              <HomeBannerSliderUpload/>
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
  ]);

  const values = { isSidebarOpen, setIsSidebarOpen,
    isLogin, setIsLogin
    ,isOpenFullScreenPanel,setisOpenFullScreenPanel

   };

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      {/* for product uploadin material ui new page open  */}
        <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <IoMdClose className="text-gray-700"/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-700">{isOpenFullScreenPanel?.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>
        {/* working of add product */}
        {
          isOpenFullScreenPanel?.model ==="Add Product" && <ProductAdd/>
        }
        {/* for slide upload on home page */}
        {
          isOpenFullScreenPanel?.model ==="Add Home Slide" && <AddHomeSlideUploadUpload/>
        }
        {
          isOpenFullScreenPanel?.model ==="Add Category" &&    <AddCategory/>    }
         {
          isOpenFullScreenPanel?.model ==="Add New Sub Cat" && <AddCategorys/>
        }
      </Dialog>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
