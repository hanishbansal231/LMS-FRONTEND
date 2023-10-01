import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Redux/Slices/AuthSlice";

function Profile() {
    const { data } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleDelete(){
        await dispatch(deleteAccount());
        navigate('/')
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white max-w-[50vw] shadow-[0_0_10px_black]">
                    <img
                        src={data?.avatar?.secure_url}
                        alt={data?.fullName}
                        className="w-40 m-auto rounded-full border boder-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {data?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>
                            Email:
                        </p>
                        <p>
                            {
                                data?.email
                            }
                        </p>
                        <p>
                            Role:
                        </p>
                        <p>
                            {
                                data?.role
                            }
                        </p>
                        <p>
                            Subscription:
                        </p>
                        <p>
                            {
                                data?.subscription?.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"
                            }
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Link
                            to={"/change-password"}
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Change Password
                            </button>
                        </Link>
                        <Link
                            to={"/user/edit-profile"}
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                    {
                        data?.subscription?.status !== 'ACTIVE' && (
                            <button
                                className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                            >
                                Cancel Subscription
                            </button>

                        )
                    }
                    <button
                    onClick={handleDelete}
                        className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                    >
                        Delete Account
                    </button>

                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;