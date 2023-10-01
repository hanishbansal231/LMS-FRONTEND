import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axioxInstance';
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account..",
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Login",
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! Logout in progress...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to logout"
        });
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const editProfile = createAsyncThunk("/auth/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile",
        });

        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const getProfile = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get(`user/me`);
        // toast.promise(res,{
        //     loading:"",
        //     success:"",
        //     error:"",
        // });

        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const changePassword = createAsyncThunk("/user/changePassword", async (data) => {
    try {
        const res = axiosInstance.post("user/change-password", data);
        toast.promise(res, {
            loading: "Wait! password change progress...",
            success: "Password change successfully",
            error: "Failed to change password"
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const forgotPassword = createAsyncThunk("/user/forgotPassword", async (data) => {
    try {
        const res = axiosInstance.post("user/reset", data[1]);
        toast.promise(res, {
            loading: "Wait! sending email processing...",
            success: "Email Send Successfully",
            error: "Failed to send email",
        });
        data[0](true);
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

export const resetPassword = createAsyncThunk("/user/resetPassword", async (data) => {
    try {
        const res = axiosInstance.post(`user/reset/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! forget password Processing",
            success: "forgot password successfully",
            error: "Failed to forgot password",
        });
        return (await res).data;
    } catch (Error) {
        toast.error(Error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.data = {};
                state.role = "";
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
    },
});


export const { } = authSlice.actions;
export default authSlice.reducer;