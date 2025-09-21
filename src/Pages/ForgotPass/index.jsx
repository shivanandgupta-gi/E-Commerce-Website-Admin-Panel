import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Button from '@mui/material/Button';


const ForgotPass=()=> {
   
  
  return (  
    <section className="!bg-white h-[100vh]  top-0 left-0 w-full">
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
                           Having trouble to sign in?<br />
                            <span >Reset your password</span>
                        </h1>

                       
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
                                
                                 {/* sign in button added */}
                                    <Button className='btn-blue btn-lg w-full'>Reset Password</Button>
                                    <br /><br/>
                                        <div className="text-center flex items-center justify-center gap-4">
                                        <span>Don't want to reset? </span>
                                        <Link
                                            to="/login"
                                            className="text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700"
                                        >
                                            Sign In?
                                        </Link>
                                        </div>


                        </form>
                    </div>
        </section>
  )
}

export default ForgotPass;