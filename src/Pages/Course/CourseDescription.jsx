import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CourseDescription() {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);
    const { data } = useSelector((state) => state.auth);
    const { state } = useLocation();
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center jusitfy-center text-white">
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img alt="thumbnail" src={state?.thumbnail?.secure_url} className="w-full h-64" />
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total Lectures :{" "}
                                    </span>
                                    {
                                        state?.numbersOfLectures
                                    }
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor :{" "}
                                    </span>
                                    {
                                        state?.createdBy
                                    }
                                </p>
                            </div>
                            {
                                role === 'ADMIN' || data?.subscription?.status === 'active'
                                    ? (
                                        <button
                                        onClick={() => navigate('/course/display-lectures',{state:{...state}})}
                                            className="bg-yellow-600 text-xl roundec-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                        >
                                            Watch Lectures
                                        </button>
                                    ) : (
                                        <button
                                        onClick={() => navigate('/checkout')}
                                            className="bg-yellow-600 text-xl roundec-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                        >
                                            Subscribe
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                    <div className="space-y-2 text-xl">
                        <h2 className="text-3xl font-bold text-yellow-500 mb-5">
                            {
                                state?.title
                            }
                        </h2>
                        <p className="text-yellow-500">Course Description: </p>
                        <p>
                            {state?.description}
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription