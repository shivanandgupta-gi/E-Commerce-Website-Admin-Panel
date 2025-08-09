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



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));



const Header = () => {

  const context=useContext(MyContext); //context used

// myACC mens my account open and close click on it and it open small widwo
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  return (
    <header className={`w-full py-2 h-[50px] pr-7 ${context.isSidebarOpen === true ? "pl-75":"pl-5"} bg-[#fff]   flex items-center 
    shadow-md justify-between transition-all`}>
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
                    <h3 className="text-[15px] font-[500] leading-5">Shivnaand Gupta</h3>
                    <p className="text-[12px] font-[400] opacity-70">admin-01@ecme.com</p>
                    </div>
            </div>
        </MenuItem>
        <Divider />
        
        <MenuItem
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3">
            <FaRegUser className="text-[18px]" /> <span className="text-[14px]">Profile</span>
        </MenuItem>
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
            onClick={handleCloseMyAcc}
            className="flex items-center gap-3">
            <IoMdLogOut className="text-[18px]"/> <span className="text-[14px]">Sign Out</span>
        </MenuItem>
       
      </Menu>
      </div>
      :
      <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
        }
       
      </div>
       </div>

        
    </header>
  );
};

export default Header;



