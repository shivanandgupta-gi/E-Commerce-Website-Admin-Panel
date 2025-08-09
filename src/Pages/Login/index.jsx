import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import LoadingButton from '@mui/lab/LoadingButton';
import { FaFacebook } from "react-icons/fa6";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Login=()=> {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFb, setLoadingFb] = useState(false);
    const [isPasswordShow,setIsPasswordShow]=useState(false);

     function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  function handleClickFb() {
    setLoadingFb(true);
  }
  return (
    <section className="!bg-white w-full   top-0 left-0">
        <header className="w-full fixed  top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
            {/* logo */}
            <Link to="/">
            <img
                src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                className="w-[200px]"
            />
            </Link>
            {/* login and sign up button */}
            <div className="flex items-center gap-0">
                <NavLink to="/login" exact={true} activeClassName="isActive">
                    <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
                    <MdLogin className="text-[18px]" /> Login
                    </Button>
                </NavLink>
                <NavLink to="/signup" exact={true} activeClassName="isActive">
                <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
                    <FaRegUser className="text-[15px]" /> Sign Up
                </Button>
                </NavLink>
                </div>
        </header>
                {/* for background image */}
                <img src="patern.webp" className="w-full fixed top-0 left-0 opacity-5" />

                {/* icon and login page */}
                    <div className="loginBox card w-[600px] pb-52 h-auto mx-auto pt-20 relative z-50">
                        <div className="text-center">
                            <img  src="/_next/static/media/logo-primary.f9d5d4f7.svg"/>
                        </div>
                        <h1 className="text-center text-[35px] font-[800] mt-4">
                            Welcome Back!<br />
                            <span >Sign in with your credentials.</span>
                        </h1>

                        {/* google and facebook button added */}
                            <div className="flex items-center justify-center w-full mt-5 gap-4">
                                <LoadingButton
                                    size="small"
                                    onClick={handleClickGoogle}
                                    endIcon={<FcGoogle />}
                                    loading={loadingGoogle}
                                    loadingPosition="end"
                                    variant="outlined"
                                    className="!bg-none !py-2  !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
                                >
                                    Signin with Google
                                </LoadingButton>
                                <LoadingButton
                                    size="small"
                                    onClick={handleClickFb}
                                    endIcon={<FaFacebook />}
                                    loading={loadingFb}
                                    loadingPosition="end"
                                    variant="outlined"
                                    className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
                                >
                                    Signin with Facebook
                                </LoadingButton>
                            </div>
                            
                        <br/>
                        {/* option added like login email */}
                        <div className="flex items-center justify-center gap-2 w-full mt-5">
                            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]" />
                            <span className="text-[14px] font-[500]">Or, Sign in with your email</span>
                            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]" />
                        </div>
                            <br/>
                        {/* name password input fields for login */}
                        <form className="w-full px-8 mt-3">
                            <div className="form-group mb-4 w-full">
                                <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                                <input
                                 placeholder="Enter your email"
                                type="email"
                                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                                />
                            </div>
                             <div className="form-group mb-4 w-full">
                               <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                                <div className="relative w-full">
                                <input
                                placeholder="Enter your password"
                                    type={isPasswordShow ? 'text' : 'password'} 
                                    className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                                />
                                <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"  onClick={()=>{setIsPasswordShow(!isPasswordShow)}}>
                                    
                                    {
                                        isPasswordShow === true ?
                                        <FaEye className="text-[18px]" />
                                        :
                                        <FaEyeSlash className="text-[18px]" />
                                    }
                                </Button>
                                </div>
                            </div>
                                {/* checkbox added and forgot password */}
                                <div className="form-group mb-4 w-full flex items-center justify-between">
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Remember Me"
                                    />
                                    <Link
                                        to="/forgot-password"
                                        className="text-[#3872fa]  font-[700] text-[15px] hover:underline hover:text-gray-700"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>
                                 {/* sign in button added */}
                                    <Button className='btn-blue btn-lg w-full'>Sign In</Button>

                        </form>
                    </div>
        </section>
  )
}

export default Login;