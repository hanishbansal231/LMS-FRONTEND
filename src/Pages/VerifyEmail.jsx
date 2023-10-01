import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/Slices/AuthSlice';
import { useState } from 'react';
import OtpInput from "react-otp-input";
import { useNavigate } from 'react-router-dom';
function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const { signData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(otp);
    async function onFormSubmit(e) {
        e.preventDefault();
        const {
            fullName,
            email,
            password,
            avatar
        } = signData;

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        formData.append('otp', otp);

        const response = await dispatch(createAccount(formData));
        console.log(response?.payload?.success);
        if(response?.payload?.success){
            navigate('/login');
        }
    }
    return (
        <HomeLayout>
            <div className='h-[100vh] flex items-center justify-center'>
                <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-5 shadow-[0_0_10px_black] p-4 w-[40vw]'>
                    <h2 className="font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h2>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="verifyEmail"></label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                    </div>
                    <button type='submit' className='mt-2 w-full bg-yellow-600 rounded-sm font-semibold py-2 text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300'>Create Account</button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default VerifyEmail;