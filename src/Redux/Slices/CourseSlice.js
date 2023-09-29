import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axioxInstance";

const initialState = {
    courseData: [],
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try{
        const res = axiosInstance.get("courses/");
        toast.promise(res,{
            loading:"Wait! Course Data... ",
            success: "Course loading successfully",
            error: "Failed to get the courses"
        });
        return (await res).data.courses;
    }catch(Error){
        toast.error(Error?.response?.data?.message)
    }
});


const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers: (builder) => {

    }
});
export const {} = courseSlice.actions; 
export default courseSlice.reducer;