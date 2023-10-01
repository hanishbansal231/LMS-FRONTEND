import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { resetPassword } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {resetToken} = useParams();
    const [data,setData] = useState({
        password:"",
    })
    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]:value,
        });
    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.password){
            toast.error('Password is required');
            return;
        }
       const res = await dispatch(resetPassword([resetToken,data]));
       if(res?.payload?.success){
        navigate('/');
       }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                onSubmit={onFormSubmit}
                    className='flex flex-col justify-center gap-5 p-4 w-80 shadow-[0_0_10px_black]'
                >
                    <h2
                        className="text-lg font-semibold leading-[2.375rem] text-richblack-5">
                        Choose new password
                    </h2>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="newPassword"
                            onChange={handleUserInput}
                            className="py-1 px-2 border bg-transparent"
                            placeholder="Enter New Password"
                        />
                    </div>
                    <button
                    type="submit"
                        className="w-full bg-yellow-600 font-semibold text-lg py-2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 text-white"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ResetPassword;