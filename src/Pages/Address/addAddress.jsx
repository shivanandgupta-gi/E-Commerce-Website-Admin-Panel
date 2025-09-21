import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import UploadBox from '../../Componenets/UploadBox';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {  getData, postDataAddress } from '../../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';

const AddAddress = () => {
    const context=useContext(MyContext)
    const [phone, setPhone] = useState(''); //this for phone number with countary code
    const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
    //this for status that user active or not
    const [status, setStatus] = useState(false);
    const handleChange = (event) => {
        setStatus(event.target.value);
        setFormFields(prev => ({ ...prev, status: event.target.value }));
    };
    //this for saving address backend
     const [formFields, setFormFields] = useState({ //thsi for taken and store and then update the user address data 
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile: '',
            status:'',
            userId:context.userData._id,
            select:false
        })
        useEffect(()=>{
             setFormFields(prevState=>({
            ...prevState,
            userId:context?.userData?._id || " "
        }));
        },[context?.userData]);
       
        
     //for user changes in input area it will update in formFields
    const onChangeInput = (e) => { //this for input change in input area
        setFormFields(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    //this for address save in database when click save button
    const handleSubmit = (e) => {
            e.preventDefault();
            setIsLoading(true); //this is toster to loading or not
            //toster
            if (formFields.address_line1 === "") {
                context.openAlertBox("error", "please enter address line 1")
                setIsLoading(false);
                return false;
            }
            if (formFields.city === "") {
                context.openAlertBox("error", "please enter city name")
                setIsLoading(false);
                return false;
            }
            if (formFields.state === "") {
                context.openAlertBox("error", "please enter state name")
                setIsLoading(false);
                return false;
            }
             if (formFields.pincode === "") {
                context.openAlertBox("error", "please enter pincode")
                setIsLoading(false);
                return false;
            }
             if (formFields.country === "") {
                context.openAlertBox("error", "please enter country name")
                setIsLoading(false);
                return false;
            }
             if (formFields.mobile === "") {
                context.openAlertBox("error", "please enter your Phone Number")
                setIsLoading(false);
                return false;
            }
            //api called
            postDataAddress(`/api/address/add`, formFields , Credential=(true)).then((res) => {
                if (res?.error !== true) {
                    context.openAlertBox("success","Address Added Successfully")
                    setIsLoading(false);
                    context?.setisOpenFullScreenPanel({
                        open:false
                    })
                    //data fetch after add new address
                    getData(`/api/address/get?userId=${context?.userData?._id}`).then((res)=>{
                        if(res?.error !== true){
                            context.setAddressData(res?.data)
                        }
                    })
                }
                else {
                    context.openAlertBox("error","something went wrong")
                    setIsLoading(false);
                }
            }) 
        }
    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-2 mb-3 gap-5'>
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Address Line 1*</h3>
                            <input
                                name='address_line1'
                                value={formFields.address_line1}
                                onChange={onChangeInput}
                                type='text'
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>City*</h3>
                            <input
                             name='city'
                                value={formFields.city}
                                onChange={onChangeInput}
                                type='text'
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mb-3 gap-5'>
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>State*</h3>
                            <input
                             name='state'
                                value={formFields.state}
                                onChange={onChangeInput}
                                type='text'
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>pincode*</h3>
                            <input
                            name='pincode'
                                value={formFields.pincode}
                                onChange={onChangeInput}
                                type='text'
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Country*</h3>
                            <input
                            name='country'
                                value={formFields.country}
                                onChange={onChangeInput}
                                type='text'
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mb-3 gap-5'>
                          {/* for mobile number */}
                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Mobile Number*</h3>
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields(prevState=>({
                                        ...prevState,
                                        mobile: phone
                                    }));
                                }}
                                enableSearch={true}
                            />
                        </div>

                        <div className='col w-[100%]'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>status*</h3>
                            <Select
                                value={status}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size='small'
                                className='w-full'
                                >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                                </Select>
                        </div>
                    </div>
                    <br />

                </div>
                <div className='w-[250px]'>
                    <Button type='submit' className='btn-blue btn-lg w-full flex items-center justify-center gap-3 '>
                        <IoMdCloudUpload className='text-[25px] text-white' />Publish and View</Button>
                </div>
            </form>
        </section>
    )
}

export default AddAddress;
