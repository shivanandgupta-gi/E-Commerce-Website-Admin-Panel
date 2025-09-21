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
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../utils/api';


const ChangePass=()=> {
    
    const [isPasswordShow,setIsPasswordShow]=useState(false);
    const [isNewPasswordShow,setIsNewPasswordShow]=useState(false);
   
     //backend
    const[isLoading,setIsLoading]=useState(false);
     const[formFields,setFormFields]=useState({//form filed pick
        email:localStorage.getItem("userEmail"),
        newPassword:'',
        cPassword:'',
    })
    const context=useContext(MyContext); //context used
    const history=useNavigate(); //navigate used
    const onChangeInput=(e)=>{ //this for input change in input area
    setFormFields({...formFields,[e.target.name]:e.target.value})
    }
    //if any field empty disabeld button it check the field
        const validValue=Object.values(formFields).every(el=>el);
    
         const handleSubmit=(e)=>{
              e.preventDefault();
              setIsLoading(true);
              //toster
               if(formFields.newPassword === ""){
                context.openAlertBox("error","please enter your new Password")
                return false; 
              }
               if(formFields.cPassword === ""){
                context.openAlertBox("error","please enter your Confirm Password")
                return false; 
              }
              if(formFields.newPassword !== formFields.cPassword){ //if both password not match
                context.openAlertBox("error","password and confirm password not match")
                return false; 
              }
    
              //api called
              postData("/api/user/reset-password",formFields).then((res)=>{
                console.log(res);
    
                if(res?.error !== true){
                     localStorage.removeItem("userEmail");
                    localStorage.removeItem("actionType")
                  context.openAlertBox("success",res?.message)
                   setIsLoading(false);
                    setFormFields({
                        email:'',
                      newPassword:'',
                      cPassword:'',
                    })
        
                    //this for shown on main page that user login menas user profile shown
                    context.setIsLogin(true);
                    history("/login"); //login again
                }
                else{
                  context.openAlertBox("error",res?.message)
                  setIsLoading(false);
                }
            })  
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
                            re-enter your password to continue
                        </h1>

                       
                            <br/>
                        {/* name password input fields for login */}
                        <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
                            
                             <div className="form-group mb-4 w-full">
                               <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
                                <div className="relative w-full">
                                <input
                                 onChange={onChangeInput}
                                  name='newPassword'
                                value={formFields.newPassword}
                                placeholder="Enter your new password"
                                    type={isNewPasswordShow ? 'text' : 'password'} 
                                    className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                                />
                                <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"  onClick={()=>{setIsNewPasswordShow(!isNewPasswordShow)}}>
                                    
                                    {
                                        isNewPasswordShow === true ?
                                        <FaEye className="text-[18px]" />
                                        :
                                        <FaEyeSlash className="text-[18px]" />
                                    }
                                </Button>
                                </div>
                            </div>
                             <div className="form-group mb-4 w-full">
                               <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
                                <div className="relative w-full">
                                <input
                                 onChange={onChangeInput}
                                name='cPassword'
                                value={formFields.cPassword}
                                placeholder="re-enter your password"
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
                               
                                 {/* sign in button added */}
                                    <Button type='submit' disabled={!validValue } className='btn-blue btn-lg w-full'>
                                         {
                                          isLoading===true ?
                                           //  circular move progress
                                           <CircularProgress color="inherit" />
                                            :
                                             'Change Password'
                                            } 
                                    </Button>

                        </form>
                    </div>
        </section>
  )
}

export default ChangePass;