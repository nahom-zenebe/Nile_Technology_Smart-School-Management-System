import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  Authuser: JSON.parse(localStorage.getItem("user")) || null, 
  isUserSignup: false,
  staffuser:null,
  manageruser:null,
  adminuser:null,
  isUserLogin: false,
  token: localStorage.getItem("token") || null,
  isupdateProfile: false,
};


export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.savedUser)); 
      localStorage.setItem("token", response.data.savedUser.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      localStorage.setItem("token", response.data.user.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("authUser");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (base64Image, { rejectWithValue }) => {
    try {
  
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');


      if (!storedUser || !token) {
        return rejectWithValue('User not authenticated. Please log in again.');
      }

     
      const response = await axiosInstance.put(
        'auth/updateProfile',
        { ProfilePic: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = response.data;

    
      if (updatedData && updatedData.updatedUser) {
       
        localStorage.setItem('user', JSON.stringify(updatedData.updatedUser));
        return updatedData.updatedUser; // Return the updated user object
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);














export const removeusers=createAsyncThunk("auth/removeuser",async(UserId,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.delete(`auth/removeuser/${UserId}`,UserId,{ withCredentials: true });

    return response.data

  } catch (error) {
     return rejectWithValue(error.response?.data?.message || 'Failed to delete  user');
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(signup.pending, (state) => {
        state.isUserSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isUserSignup = false;
        state.Authuser = action.payload.savedUser; 
        state.token = action.payload.token; 
        toast.success("signup successfully")
        

      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignup = false;
        toast.error(" error in signup")

      })

      
      .addCase(login.pending, (state) => {
        state.isUserLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLogin = false;
        state.Authuser = action.payload.user; 
        state.token = action.payload.token; 
        toast.success("Login successfully")
 
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLogin = false;
        toast.error(" Error in Login ")

      })

    
      .addCase(logout.fulfilled, (state) => {
        state.Authuser = null;
        state.token = null;
        toast.success("Successfully logged out!");
      })
      .addCase(logout.rejected, (state, action) => {
     
      })

      .addCase(updateProfile.pending, (state) => {
        state.isupdateProfile = true;
      })
      

      builder.addCase(updateProfile.fulfilled, (state, action) => {
        state.isupdateProfile = false;
        state.Authuser = { ...state.Authuser, user: action.payload }; 
      
      })
      
    

      

      


      
     
    
      
    



  
  },
});

export default authSlice.reducer;