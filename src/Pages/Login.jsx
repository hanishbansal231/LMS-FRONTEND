import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { login } from '../Redux/Slices/AuthSlice';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value,
        })

    }

    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('Please fill all the details');
            return;
        }

        const response = await dispatch(login(loginData));
        if (response?.payload?.success) navigate("/");
        setLoginData({
            email: "",
            password: "",
        });
    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[90vh] w-full'>
                <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h2 className='text-center text-2xl font-bold'>Login Page</h2>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            type='email'
                            required
                            name='email'
                            id='email'
                            placeholder='Enter your email..'
                            className='bg-transparent px-2 py-1 border '
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input
                            type={!showPassword ? "password" : "text"}
                            required
                            name='password'
                            id='password'
                            placeholder='Enter your password..'
                            className='bg-transparent px-2 py-1 border '
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                          <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-2 top-9 text-xl cursor-pointer'>
                            {
                                showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                            }
                        </span>
                    </div>
                    <Link to={"/forgot-password"}>
                        <span className='text-sm italic link text-accent'>Forgot Password</span>
                    </Link>
                    <button type='submit' className='mt-2 w-full bg-yellow-600 rounded-sm font-semibold py-2 text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300'>Login</button>

                    <p className='text-center'>
                        Donot have an account ? <Link className='link text-accent cursor-pointer' to={'/signup'}>SignUp</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Login;