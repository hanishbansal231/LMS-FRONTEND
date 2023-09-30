import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
    const disptach = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("");
    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        previewImage: "",
        thumbnail: null,
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage,
                });
            });
        }
    }
    function handelUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail) {
            toast.error("All fields are mandatory")
            return;
        }
        const formData = new FormData();
        formData.append("title", userInput?.title);
        formData.append("description", userInput?.description);
        formData.append("category", userInput?.category);
        formData.append("createdBy", userInput?.createdBy);
        formData.append("thumbnail", userInput?.thumbnail);

        const res = await disptach(createNewCourse(formData));
        if (res?.payload?.success) {
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                previewImage: "",
                thumbnail: null,
            });
            navigate("/courses");
        }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >

                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h2 className="text-center text-2xl font-bold">
                        Create New Course
                    </h2>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="imageUploads" className="cursor-pointer">
                                    {
                                        userInput?.previewImage
                                            ?
                                            (
                                                <img
                                                    src={userInput?.previewImage}
                                                    alt="thumbnail"
                                                    className="w-full h-44 m-auto border"
                                                />
                                            )
                                            :
                                            (
                                                <div className="w-full h-44 m-auto flex items-center justify-center border">
                                                    <h2 className="font-bold text-lg ">Upload your course thumbnail</h2>
                                                </div>
                                            )
                                    }
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="imageUploads"
                                    onChange={handleImageUpload}
                                    accept=".jpg,.jpeg,.png"
                                    name="image_uploads"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold">
                                    Course Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput?.title}
                                    onChange={handelUserInput}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">
                                    Course Instructor
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="createdBy"
                                    name="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput?.createdBy}
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="text-lg font-semibold">
                                    Course Category
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="category"
                                    name="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput?.category}
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold">
                                    Course Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Enter course description"
                                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    value={userInput?.description}
                                    onChange={handelUserInput}
                                />
                            </div>
                        </div>
                    </main>
                    <button className="w-full p-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300" type="submit">Create Course</button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;