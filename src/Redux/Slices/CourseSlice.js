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

export const createNewCourse = createAsyncThunk("/course/create",async (data) => {
    try{
        const res = axiosInstance.post("courses/",data);
        toast.promise(res,{
            loading: 'Creating new course...',
            success:'course created successfully',
            error:'Failed to create course',
        });
        return (await res).data;
    }catch(Error){
        toast.error(Error?.response?.data?.message);
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try{
        const res = axiosInstance.delete(`courses/${id}`);
        toast.promise(res,{
            loading:"Wait! Delete Course ... ",
            success: "Course delete successfully",
            error: "Failed to delete the courses"
        });
        return (await res).data;
    }catch(Error){
        toast.error(Error?.response?.data?.message)
    }
});

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                state.courseData = [...action.payload];
            }
        })
    }
});
export const {} = courseSlice.actions; 
export default courseSlice.reducer;