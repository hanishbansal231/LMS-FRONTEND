import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";
function ChangePassword() {
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const dispatch = useDispatch();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    function handleInputuser(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }
    async function onFormSubmit(e){
        e.preventDefault();
        console.log(data);
        if(!data.oldPassword || !data.newPassword){
            toast.error("All fields are mandatory");
            return;
        }

        await dispatch(changePassword(data));
    }
    return (
        <HomeLayout>
            <div className="h-[100vh] flex items-center justify-center">
                <form
                onSubmit={onFormSubmit}
                    className="flex justify-center gap-5 flex-col p-4 w-80 shadow-[0_0_10px_black]"
                >
                    <h2 className="text-2xl font-bold text-center">Change Password</h2>
                    <div className="flex flex-col gap-1 relative">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter Old Password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInputuser}
                        />
                        <span onClick={() => setShowOldPassword((prev) => !prev)} className="absolute right-2 top-8 text-2xl cursor-pointer">
                            {
                                showOldPassword ? <AiFillEyeInvisible  /> : <AiFillEye />
                            }
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter New Password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInputuser}
                        />
                        <span onClick={() => setShowNewPassword((prev) => !prev)} className="absolute right-2 top-8 text-2xl cursor-pointer">
                            {
                                showNewPassword ? <AiFillEyeInvisible  /> : <AiFillEye />
                            }
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-yellow-600 py-2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >
                        Chnage Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;