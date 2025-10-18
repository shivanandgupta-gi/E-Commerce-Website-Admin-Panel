import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';//for loading
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { editData, getData, postData, uploadImage } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Radio from '@mui/material/Radio';




//thsi page for profile page in to see profile
const Profile = () => {
    //for radio in address selectioon
    const [selectedValue, setSelectedValue] = React.useState('');

   const handleChange = (event) => {
     setSelectedValue(event.target.value); 
     if(event.target.checked === true){
        editData(`/api/address/update/${event.target.value}`,{select:true});
        
     }
     else{
         editData(`/api/address/update/${event.target.value}`,{select:false});
     }
    };

    const [phone, setPhone] = useState(''); //this for phone number with countary code
    //BACKEND code here
    const [previews, setPreviews] = useState([]) //image upload
    const [uploading, setUploading] = useState(false)
    let selectedImg = [];
    const formdata = new FormData();
    const context = useContext(MyContext);

    useEffect(() => { //this is for stay image on the avatar during refresh   
        if (context?.userData?.avatar) {//if image exist then
            setPreviews([context.userData.avatar]);
        } else {
            setPreviews([]); // Ensure it's empty when no avatar exists
        }
    }, [context?.userData])
    //this is image upload
    const onchangeFile = async (e, api) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true); //loading start
            for (var i = 0; i < files.length; i++) {
                if (files[i] && (
                    files[i].type === "image/jpg" ||
                    files[i].type === "image/jpeg" ||
                    files[i].type === "image/png" ||
                    files[i].type === "image/webg"
                )) {
                    const file = files[i];
                    selectedImg.push(file);
                    formdata.append('avatar', file);
                } else {
                    context.openAlertBox("error", "Please select a valid JPG or PNG image file.")
                    setUploading(false);
                    return false;
                }
            }
            //api call
            uploadImage("/api/user/user-avatar", formdata).then((res) => {
                setUploading(false);
                let avatars = []; //for showing image in the profile
                avatars.push(res?.avatar);
                setPreviews(avatars)
            })
        }
        catch (error) {
            console.log(error)
        }
        console.log(previews);
    }

    //for user details 
    //backend
    const [isLoading, setIsLoading] = useState(false); //this for loading (loader circular movve)
    const [isLoading2, setIsLoading2] = useState(false); //this for loading (loader circular movve to change password)
    const [userId, setUserId] = useState("") //for stroe id to send on api
    const [isFormShown, setIsFormShown] = useState(false) //this is for the when click on change password then it open the form of change password
    const [address,setAddress] = useState([]) //for how many address saved stored in this state
    const [formFields, setFormFields] = useState({ //thsi for update the user profile  like name , email and phone number 
        name: '',
        email: '',
        mobile: ''
    })
    const [changePassword, setChangePassword] = useState({ //thsi for update the user password for change password
        email: context?.userData?.email,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const history = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            history("/login");
        } else {
            context.setIsLogin(true); // restore login state
        }
    }, []);
    //useeffect to find user id
    useEffect(() => { //this is for stay image on the avatar during refresh   
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {//if image exist then
            //thsi is fetching address from database in profile section and stored in like how many data have use
            setUserId(context?.userData?._id);
            setFormFields({ //this for what is in database shown in textfiled area
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            const ph = `"${context?.userData?.mobile}"` //this for phoen number with countary code
            setPhone(ph)
            setChangePassword({ //this for what is in database shown in textfiled area of change password
                email: context?.userData?.email,
                oldPassword: context?.userData?.password,
                newPassword: '',
                confirmPassword: ''
            })
        }
    }, [context?.userData])
    // Add this effect to listen for context.addressData changes
    useEffect(() => {
        if (context?.addressData) {
            setAddress(context.addressData);
        }
    }, [context?.addressData]);
  
    //for user profile update
    const onChangeInput = (e) => { //this for input change in input area
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
        setChangePassword({ ...changePassword, [e.target.name]: e.target.value }) //this for change password
    }


    //if any field empty disabeld button it check the field
    const validValue = Object.values(formFields).every(el => el);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        //toster
        if (formFields.name === "") {
            context.openAlertBox("error", "please enter your Name")
            setIsLoading(false);
            return false;
        }
        if (formFields.email === "") {
            context.openAlertBox("error", "please enter your Email")
            setIsLoading(false);
            return false;
        }
        if (formFields.mobile === "") {
            context.openAlertBox("error", "please enter your Phone Number")
            setIsLoading(false);
            return false;
        }
        //api called
        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            console.log(res);
            if (res?.error !== true) {
                context.openAlertBox("success", res?.data?.message)
                setIsLoading(false);
            }
            else {
                context.openAlertBox("error", res?.data?.message)
                setIsLoading(false);
            }
        })
    }
    //this is for the change password ijnput filled correctly or not

    const validValue2 = Object.values(formFields).every(el => el);
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        setIsLoading2(true);
        //toster
        if (changePassword.oldPassword === "") {
            context.openAlertBox("error", "please enter your Name")
            setIsLoading2(false)
            return false;
        }
        if (changePassword.newPassword === "") {
            context.openAlertBox("error", "please enter your Email")
            setIsLoading2(false)
            return false;
        }
        if (changePassword.confirmPassword === "") {
            context.openAlertBox("error", "please enter your Phone Number")
            setIsLoading2(false)
            return false;
        }
        if (changePassword.newPassword !== changePassword.confirmPassword) {
            context.openAlertBox("error", "please enter your Phone Number")
            setIsLoading2(false)
            return false;
        }
        //api called
        postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {

            if (res?.error !== true) {
                setIsLoading2(false)
                context.openAlertBox("success", res?.message)

            }
            else {
                setIsLoading2(false);
                context.openAlertBox("error", res?.message)

            }
        })
    }

    return (
        <>
            <div className="card my-4 pt-5 w-[70%] shadow-md sm:rounded-lg bg-white px-5 pb-5">
                <div className='flex justify-between items-center'>
                    <h2 className="text-[18px] font-[600]">
                        User Profile
                    </h2>
                    {/* for button on change password on profile page */}
                    <Button className='!ml-auto !text-primary' onClick={() => setIsFormShown(!isFormShown)}>Change Password</Button>
                </div>
                <br />
                {/* for image upload of user */}
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
                    {
                        uploading === true ? (
                            //for loading (loder)
                            <CircularProgress color="inherit" />
                        )
                            :
                            <>
                                {previews?.length !== 0 ? (
                                    previews.map((img, idx) => (
                                        <img
                                            src={img}
                                            key={idx}
                                            className="w-full h-full object-cover"
                                            alt="Profile"
                                        />
                                    ))
                                ) : (
                                    <img

                                        src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" // <-- path to your default image
                                        className="w-full h-full object-cover"
                                        alt="Default Profile"
                                    />
                                )}
                            </>
                    }
                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 
                                                    bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100"
                    >
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />

                        <input
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                            accept='image/*' //accept onlt image
                            onChange={(e) => onchangeFile(e, "/api/user/user-avatar")}
                            name="avatar"
                        />
                    </div>

                </div>

                {/* for name email and phone numbre add means user detail  */}
                <form className='form mt-8 ' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 ">
                        <div className="w-[50%]">
                            <input type='text'
                                name='name'
                                placeholder='enter your name'
                                value={formFields.name}
                                onChange={onChangeInput}
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>
                        <div className="w-[50%]">
                            <input type='email'
                                name='email'
                                value={formFields.email}
                                disabled={true}
                                onChange={onChangeInput}
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                            />
                        </div>

                    </div>
                    <div className="flex items-center gap-5 mt-4 ">
                        <div className="w-[50%]">
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields({
                                        mobile: phone
                                    })
                                }}
                                enableSearch={true}
                            />
                        </div>

                    </div>
                    <br />
                    {/* for storing address */}
                    <div className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1f1f1] hover:bg-[#e2f3f9] cursor-pointer"
                        onClick={() => {
                            context.setisOpenFullScreenPanel({
                                open: true,
                                model: 'address added'
                            })
                        }}>
                        <span className="text-[13px] font-[500]">Add Address</span>
                    </div>

                    {/* address list showing how many address you have saved */}
                    <div className='flex gap-2 flex-col mt-2'>
                      {
                      address?.length > 0 && address?.map((address, index) => {
                        return (
                            <div key={index} className="flex gap-1 flex-col mt-2">
                            <label className="border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-2 rounded-md cursor-pointer">
                                  <Radio 
                                    name='address'
                                    value={address._id}
                                    checked={selectedValue === address._id} 
                                    onChange={handleChange}
                                    className="w-7 h-8  border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-5 text-sm bg-white "
                                    size='small'
                                  />
                                <span className='text-[12px] '>
                                    {/* showing address on radio */}
                                <span>{address?.address_line1 +  ' , ' + address?.city + ' , ' + address?.state + ' , ' + address?.pincode + ' , ' + address?.country
                                    
                                    }</span>
                                </span>
                            </label>
                            </div>
                        );
                        })
                        }  
                        </div>

                    <br />
                    <div className='flex items-center gap-4'>
                        <Button
                            type="submit"
                            disabled={!validValue}
                            className='btn-blue btn-md btn-md w-full'>
                            {
                                isLoading === true ? ( //for loading (loder)
                                    <CircularProgress color="inherit" />
                                ) :
                                    "Update Profile"
                            }
                        </Button>
                    </div>
                </form>

            </div>
            {/* for password change */}
            {
                isFormShown === true &&
                <div className="card bg-white p-5 mt-3 shadow-md rounded-md w-[70%]">
                    <div className='flex items-center pb-3'>
                        <h2 className='pb-0 font-[600] text-[17px]'>Change Password</h2>
                    </div>
                    <hr />
                    <form className='mt-8 ' onSubmit={handleSubmitChangePassword}>
                        <div className="flex items-center gap-5 ">
                            <div className="w-[75%]">
                                <TextField
                                    label="Old Password"
                                    variant="outlined"
                                    size='small'
                                    type='password'
                                    className='w-full'
                                    name='oldPassword'
                                    value={changePassword.oldPassword}
                                    onChange={onChangeInput}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-5 mt-4">
                            <div className="w-[75%]">
                                <TextField
                                    label="New Password"
                                    type='password'
                                    variant="outlined"
                                    size='small'
                                    className='w-full'
                                    name='newPassword'
                                    value={changePassword.newPassword}
                                    onChange={onChangeInput}
                                />
                            </div>

                        </div>
                        <div className="flex items-center gap-5 mt-4 ">
                            <div className="w-[75%]">
                                <TextField
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    size='small'
                                    className='w-full'
                                    name='confirmPassword'
                                    value={changePassword.confirmPassword}
                                    onChange={onChangeInput}
                                />
                            </div>

                        </div>
                        <br />
                        <div className='flex items-center gap-4'>
                            <Button
                                type="submit"
                                disabled={!validValue2}
                                className='btn-blue btn-md w-full'>
                                {
                                    isLoading2 === true ? ( //for loading (loder)
                                        <CircularProgress color="inherit" />
                                    ) :
                                        "Change Password"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}


export default Profile;