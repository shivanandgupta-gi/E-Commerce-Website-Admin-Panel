import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from "react";
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGraphDown } from "react-icons/bs";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { getData } from "../../../utils/api";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProductAdd from "../AddProduct";
import AddHomeSlideUploadUpload from "../../Pages/HomeSliderBannerUpload/AddHomeSlideUpload";
import AddCategory from "../../Pages/Category/AddCategory";
import AddCategorys from "../../Pages/Category/AddSubCategory";
import AddAddress from "../../Pages/Address/addAddress";
import EditCategory from "../../Pages/Category/EditCategory";
//for product uploadin
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import Slide from '@mui/material/Slide';
import EditProduct from "../AddProduct/EditProduct";
import AddBannerV1 from "../../Pages/Banner/AddBannerV1";
import EditBannerV1 from "../../Pages/Banner/EditBannerV1";
import AddBlog from "../../Pages/Blog/AddBlog";
import EditBlog from "../../Pages/Blog/EditBlog";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

//for product uploading page
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = () => {
  
  
  //backend
  const context=useContext(MyContext); //context used
  const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const history = useNavigate();

// myACC mens my account open and close click on it and it open small widwo
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };


   //logout page api
      const logout=()=>{
        setAnchorMyAcc(null);
          setAnchorEl(null); //menu null means not shown
          getData(`/api/user/logout?token=${localStorage.getItem('accesstoken')}`,{withCredentials:true}).then((res)=>{
              console.log(res);
              if(res?.success === true){
                  context.setIsLogin(false);
                  localStorage.removeItem('accesstoken');
                  localStorage.removeItem('refreshtoken');
                  history("/");
              }  
          })
      }

      
  return (
    <>
    <header className={`w-full py-2 h-[50px] pr-7 ${context.isSidebarOpen === true ? "pl-75":"pl-5"} bg-[#fff]   flex items-center 
    shadow-md justify-between transition-all fixed top-0 left-0 z-[50]`}>
      {/* Left-side Buttons: Menu + Search */}
      <div className="flex gap-3 items-center part1">
        {/* Menu Button */}
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]" onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
>
          <RiMenu2Line className="text-[18px]" />
        </Button>

        {/* Search Button */}
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]">
          <FiSearch className="text-[18px]" />
        </Button>
      </div>
      {/* notification icon settin icon and profilt at right */}
       <div className="relative">
        <div className="flex gap-5 items-center part2">
        {/* bell icon */}
        <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                    <FaRegBell className="text-[18px]" />
                </StyledBadge>
        </IconButton> 
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]">
          <IoIosSettings className="text-[18px]" />
        </Button>
        {/* my account  */}
        {
          context.isLogin===true ?
            <div className="relative">
        <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" onClick={handleClickMyAcc}>
            <img src="https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" className="w-full h-full object-cover"/>
        </div>
        
          <Menu
        anchorEl={anchorMyAcc}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAcc}
        onClick={handleCloseMyAcc}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* CREATING THE MENU ON ACCOUNT CLICKING SMMAL WINDOW OPEN */}
        <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
           <div className="flex items-center gap-3">
                <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                    <img
                    src="https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                    className="w-full h-full object-cover"
                    />
                </div>
                 <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">{context?.userData?.name}</h3>
                    <p className="text-[12px] font-[400] opacity-70">{context?.userData?.email}</p>
                    </div>
            </div>
        </MenuItem>
        <Divider />
        <Link to="/profile">
        <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3">
            <FaRegUser className="text-[18px]" /> <span className="text-[14px]">Profile</span>
        </MenuItem>
        </Link>
        <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3">
            <IoSettingsOutline className="text-[18px]" /> <span className="text-[14px]">Account Setting</span>
        </MenuItem>
        <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3">
            <BsGraphDown className="text-[18px]" /> <span className="text-[14px]">Activity Log</span>
        </MenuItem>
        <Divider/>
         <MenuItem
             onClick={() => { 
              handleCloseMyAcc;
                handleClose(); 
                logout(); 
              }} 
            className="flex items-center gap-3">
            <IoMdLogOut className="text-[18px]"/> <span className="text-[14px]">Sign Out</span>
        </MenuItem>
       
      </Menu>
      </div>
      :
      <Link to="/login">
      <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
      </Link>
        }
       
      </div>
       </div>
    </header>

         {/* for product uploading material ui new page open  */}
        <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
       onClose={() => context?.setisOpenFullScreenPanel({ open: false })}
        slots={{
          transition: Transition,
        }}
        
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
             onClick={() => context?.setisOpenFullScreenPanel({ open: false })}
              aria-label="close"
            >
              <IoMdClose className="text-gray-700"/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-700">{context?.isOpenFullScreenPanel?.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>
        {/* working of add product */}
        {
          context.isOpenFullScreenPanel?.model ==="Add Product" && <ProductAdd/>
        }
        {/* for slide upload on home page */}
        {
          context.isOpenFullScreenPanel?.model ==="Add Home Slide" && <AddHomeSlideUploadUpload/>
        }
        {
          context.isOpenFullScreenPanel?.model ==="Add Category" &&    <AddCategory/>    }
         {
          context.isOpenFullScreenPanel?.model ==="Add New Sub Cat" && <AddCategorys/>
        }
        {/* for the user address added */}
        {
          context.isOpenFullScreenPanel?.model === "address added"&& <AddAddress/> 
        }
        {/* for edit category */}
        {
          context.isOpenFullScreenPanel?.model === "Edit Category"&& <EditCategory/>
        }
        {/* for edit product */}
        {
          context.isOpenFullScreenPanel?.model === "Edit product"&& <EditProduct/>
        }
        {/* for adding the banner version1 like small banner */}
        {
          context.isOpenFullScreenPanel?.model === "Add BannerV1"&& <AddBannerV1/>
        }
        {/* for edit the banner version1 like small banner */}
        {
          context.isOpenFullScreenPanel?.model === "Edit BannerV1"&& <EditBannerV1/>
        }
        {/* for adding the blog */}
        {
          context.isOpenFullScreenPanel?.model === "Add Blog"&& <AddBlog/>
        }
        {/* for edit the blog */}
        {
          context.isOpenFullScreenPanel?.model === "Edit Blog"&& <EditBlog/>
        }
        
      </Dialog>

</>
  );
};

export default Header;



