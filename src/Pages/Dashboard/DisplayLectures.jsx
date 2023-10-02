import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
    const { lectures } = useSelector((state) => state.lecture)
    const { role } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [currentVideo, setCurrentVideo] = useState(0);
    useEffect(() => {
        console.log(lectures);
        if (!state) navigate('/courses')
        dispatch(getCourseLecture(state._id));
    }, []);
    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteLecture({ courseId: courseId, lectureId: lectureId }));
        await dispatch(getCourseLecture(state._id));
    }
    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[100vh] py-10 text-white mx-5">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>
                {lectures && lectures.length > 0 &&
                    (<div className={`flex justify-center gap-10 w-full`}>
                        <div className="space-y-5 w-[28rem] p-2 rouded-lg shadow-[0_0_10px_black]">
                            <video
                                src={state && lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >

                            </video>
                            <div>
                                <h2>
                                    <span className="text-yellow-500 ">
                                        Title: {" "}
                                    </span>
                                    {
                                        lectures && lectures[currentVideo]?.title
                                    }
                                </h2>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description: {" "}
                                    </span>
                                    {
                                        lectures && lectures[currentVideo]?.description
                                    }
                                </p>
                            </div>
                        </div>

                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p className="flex justify-between w-full">
                                    Lecture List:
                                    {
                                        role === 'ADMIN' && (
                                            <button onClick={() => navigate('/course/add-lecture', { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                                Add New Lecture
                                            </button>
                                        )
                                    }
                                </p>
                            </li>
                            {
                                lectures &&
                                lectures.map((item, idx) => {
                                    return (
                                        <li key={item._id} className="space-y-2">
                                            <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                                <span>
                                                    {" "} Lecture {idx + 1} : {" "}
                                                </span>
                                                {
                                                    item.title
                                                }
                                            </p>
                                            {
                                                role === 'ADMIN' && (
                                                    <button onClick={() => onLectureDelete(state?._id, item._id)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
                                                        Delete Lecture
                                                    </button>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>)
                }
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures;