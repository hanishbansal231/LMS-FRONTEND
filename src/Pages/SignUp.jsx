import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createAccount } from '../Redux/Slices/AuthSlice';
import { isEmail, isValidPassword } from '../Helpers/RegexMatcher';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    console.log(showPassword);
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;

        setSignupData({
            ...signupData,
            [name]: value,
        })

    }

    function getImage(event) {
        event.preventDefault();
        const uploadImage = event.target.files[0];

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage,
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }
    async function createNewAccount(e) {
        e.preventDefault();
        if (!signupData.email || !signupData.avatar || !signupData.password || !signupData.fullName) {
            toast.error('Please fill all the details');
            return;
        }
        if (signupData.fullName.length < 5) {
            toast.error('Name should be atleast of 5 characters');
            return;
        }
        if(!isEmail(signupData.email)){
            toast.error("Invalid email id");
            return;
        }
        if (!isValidPassword(signupData.password)) {
            toast.error('Password should be 6 - 16 character long with atleast a number and special character');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', signupData.fullName);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('avatar', signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success) navigate("/");
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[90vh] w-full'>
                <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h2 className='text-center text-2xl font-bold'>Registration Page</h2>
                    <label htmlFor="image_uploads" className='cursor-pointer'>
                        {
                            previewImage
                                ? (
                                    <img className='w-24 h-24 rounded-full m-auto' src={previewImage} alt={"Name"} />
                                )
                                : (
                                    <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                                )
                        }
                    </label>
                    <input
                        onChange={getImage}
                        type='file'
                        id='image_uploads'
                        name='image_uploads'
                        className='hidden'
                        accept='.jpg, .jpeg, .png, .svg'
                    />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName" className='font-semibold'>Name</label>
                        <input
                            type='text'
                            required
                            name='fullName'
                            id='fullName'
                            placeholder='Enter your Name..'
                            className='bg-transparent px-2 py-1 border '
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            className='bg-transparent px-2 py-1 border relative '
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-2 top-9 text-xl cursor-pointer'>
                            {
                                !showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                            }
                        </span>

                    </div>
                    <button type='submit' className='mt-2 w-full bg-yellow-600 rounded-sm font-semibold py-2 text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300'>Create Account</button>

                    <p className='text-center'>
                        Already have an account ? <Link className='link text-accent cursor-pointer' to={'/login'}>Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default SignUp;