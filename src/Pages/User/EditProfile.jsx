import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { editProfile, getProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id),
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage,
                })
            });
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        if (!data.fullName || !data.avatar) {
            toast.error('All fields are mandatory');
            return;
        }
        if (data.fullName.length < 5) {
            toast.error('Name cannot be of less than 5 characters')
            return;
        }

        const formData = new FormData();

        formData.append("fullName", data?.fullName);
        formData.append("avatar", data?.avatar);
        console.log(formData.entries().next());
        await dispatch(editProfile([data.userId, formData]));
        await dispatch(getProfile())
        navigate("/user/profile");
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                    onSubmit={onFormSubmit}
                >
                    <h2 className="text-center text-2xl font-semibold">Edit Profile</h2>
                    <div>
                        <label htmlFor="imageUpload" className="cursor-pointer">
                            {
                                data?.previewImage
                                    ?
                                    (
                                        <img src={data?.previewImage} alt="avatar" className="w-28 h-28 m-auto rounded-full" />
                                    )
                                    :
                                    (
                                        <BsPersonCircle className="w-28 h-28 m-auto rounded-full" />
                                    )
                            }
                        </label>
                        <input
                            type="file"
                            className="hidden"
                            id="imageUpload"
                            onChange={handleImageUpload}
                            name="imageUpload"
                            accept=".jpg,.jpeg,.png,.svg"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Name</label>
                        <input
                            required
                            type="text"
                            id="fullName"
                            className="bg-transparent px-2 py-1 border"
                            name="fullName"
                            placeholder="Enter your name"
                            value={data?.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 py-2 rounded-sm text-lg cursor-pointer hover:bg-yellow-500 transition-all duration-300 ease-in-out"
                    >
                        Update Profile
                    </button>
                    <Link 
                    to={"/user/profile"}
                    className="link text-accent cursor-pointer flex items-center justify-center w-full gap-3"
                    >
                        <AiOutlineArrowLeft /> Go back profile
                    </Link>
                </form>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;