import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axioxInstance";

const initialState = {
    lectures: [],
}

export const getCourseLecture = createAsyncThunk('/course/lecture/get', async (cid) => {
    try {
        const res = axiosInstance.get(`courses/${cid}`)
        toast.promise(res,{
            loading: 'Fetching course lecture',
            success:'Lectures  fetched successfully',
            error: 'Failed to load the lecture'
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (data) => {
    try {
        const formData = new FormData();
        formData.append('lecture',data?.lecture);
        formData.append('title',data?.title);
        formData.append('description',data?.description);

        const res = axiosInstance.post(`courses/${data.id}`,formData);
        toast.promise(res,{
            loading: 'Adding course lecture',
            success:'Lectures  added successfully',
            error: 'Failed to add the lecture'
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const deleteLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
    try {
        const res = axiosInstance.delete(`courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(res,{
            loading: 'Deleting course lecture',
            success:'Lectures  deleted successfully',
            error: 'Failed to delete the lecture'
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCourseLecture.fulfilled,(state,action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action) => {
            console.log(action);
            state.lectures = action?.payload?.course?.lectures;
        })
    }
});


export default lectureSlice.reducer;