import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import OtpBox from '../../Componenets/OtpBox';
import Button from '@mui/material/Button';


const VerifyOTP=()=> {
    const [otp, setOtp] = useState('');
    const handleOtpChange=(value)=>{
        setOtp(value);
    }
  return (
    <section className="!bg-white w-full h-[100vh]  top-0 left-0">
        <header className="w-full fixed  top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
            {/* logo */}
            <Link to="/">
            <img
                src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                className="w-[200px]"
            />
            </Link>
           
        </header>
                {/* for background image */}
                <img src="patern.webp" className="w-full fixed top-0 left-0 opacity-5" />

                {/* icon and login page */}
                    <div className="loginBox card w-[600px] pb-52 h-auto mx-auto pt-20 relative z-50">
                        <div className="text-center">
                            {/* for secure image */}
                            <img  src="https://th.bing.com/th/id/OIP.eG5CujoK0tNdZ2IIpkCHnwHaHa?w=207&h=207&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" className='w-[100px] m-auto'/>
                        </div>
                        <h1 className="text-center text-[35px] font-[800] mt-4">
                            Welcome Back!<br />
                            Please Verify Your Account
                        </h1>
                            <br/>
                        <p className="text-center text-[15px]">
                            OTP sent to &nbsp;<span className="text-[#3872fa] font-bold">shivananadgupta316@gmail.com</span>
                            </p>
                           
                            <br/>
                            {/* same as client page copy it for create box*/}
                            <div className=' text-center flex items-center justify-center flex-col'>
                            <OtpBox length={6} onChange={handleOtpChange}/>
                            </div>
                            <br/>
                            <div className='w-[200px] m-auto'>
                                <Button className='text-[#3872fa] btn-blue w-full'>Verify Otp</Button>
                            </div>
                            


                    </div>
        </section>
  )
}

export default VerifyOTP;