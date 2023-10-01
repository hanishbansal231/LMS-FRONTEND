import { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import toast from 'react-hot-toast';
import { forgotPassword } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
function ForgotPassword() {
    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState(false);
    console.log(emailSent);
    const [data, setData] = useState({
        email: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.email) {
            toast.error("Email is required");
            return;
        }

        await dispatch(forgotPassword([setEmailSent, data]));
    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form
                    onSubmit={onFormSubmit}
                    className='flex flex-col justify-center gap-5 p-4 w-80 shadow-[0_0_10px_black]'
                >
                    <h2 className="text-2xl font-bold">
                        {!emailSent ? "Reset your password" : "Check email"}
                    </h2>
                    <p className="my-4 text-[.8rem] leading-[1.625rem] text-richblack-100">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${data.email}`}
                    </p>
                    {
                        !emailSent && (
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email">Email</label>
                                <input
                                    type='email'
                                    className='bg-transparent px-2 py-1 border'
                                    placeholder='Enter your email'
                                    onChange={handleUserInput}
                                    value={data?.email}
                                    name='email'
                                />
                            </div>
                        )
                    }
                    <button
                        type='submit'
                        className='w-full bg-yellow-600 font-semibold text-lg py-2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 text-white'
                    >
                        {!emailSent ? "Sumbit" : "Resend Email"}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}
export default ForgotPassword;