import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLectures() {
    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    });

    function handelInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    function handelVideoUpload(e) {
        const video = e.target.files[0];
        const sourse = window.URL.createObjectURL(video);
        console.log(sourse);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: sourse,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error('All fields are mandatory');
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));

        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: "",
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) return navigate('/courses');
    }, [])

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] text-white flex-col gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h2 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h2>
                    </header>
                    <form
                        onSubmit={onFormSubmit}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-lg" htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter the title of the lecture"
                                onChange={handelInputChange}
                                className="bg-transparent px-3 py-1 border"
                                value={userInput?.title}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-lg" htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter the description of the lecture"
                                onChange={handelInputChange}
                                className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                                value={userInput?.description}
                            />
                        </div>
                        {
                            userInput?.videoSrc
                                ?
                                (
                                    <video
                                        src={userInput?.videoSrc}
                                        muted
                                        controls
                                        controlsList="nodownload nofullscreeen"
                                        disablePictureInPicture
                                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                    >

                                    </video>
                                )
                                :
                                (
                                    <div className="h-48 border flex items-center justify-center cursor-pointer">
                                        <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose Your Video</label>
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="lecture"
                                            name="lecture"
                                            onChange={handelVideoUpload}
                                            accept="video/mp4, video/x-mp4 "
                                        />
                                    </div>
                                )
                        }
                        <button
                        type="submit"
                        className="btn btn-primary py-1 font-semibold text-xl"
                        >
                            Create Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLectures;