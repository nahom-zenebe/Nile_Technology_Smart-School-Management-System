import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
    getallTeacher:null,
    isallTeacherget:false,
    isTeacheradd:false,
    isTeacherremove:false,
    searchdata:null,
    issearchdata:false,
    editedTeacher:null,
    iseditedTeacher:false,
 
  
}



export const AddTeacher=createAsyncThunk('teacher/TeacherProfile',async(Teacher,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("teacher/TeacherProfile",Teacher,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Teacher adding failed");
    }
  })


  export const RemoveTeacher=createAsyncThunk('teacher/deleteTeacher',async(TeacherId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.delete(`teacher/deleteTeacher/${TeacherId}`,TeacherId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Teacher remove failed");
    }
  })

  
  export const EditTeacher = createAsyncThunk(
    'teacher/updateTeacher',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(
          `teacher/updateTeacher/${id}`,
          { TeacherId: id, updatedData },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update Teacher. Please try again.";
        toast.error(errorMessage); 
        return rejectWithValue(errorMessage);
      }
    }
  );




  export const gettingallTeachers=createAsyncThunk('teacher/getallTeacher',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("teacher/getallTeacher",{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Teacher getting failed");
    }
  })



   export const SearchTeacher=createAsyncThunk('teacher/searchTeacher',async(query,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get(`teacher/searchTeacher?query=${query}`,query,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Teacher search failed");
    }
  })









const TeacherSlice = createSlice({
name:"Teacher",
initialState:initialState,
reducers:{},
extraReducers:(builder)=>{
  builder



 .addCase( gettingallTeachers.pending,(state)=>{

    state.isallTeacherget=true
    
  })
  .addCase(gettingallTeachers.fulfilled, (state, action) => {
    state.isallTeacherget = false;
    state.getallTeacher = action.payload.Teachers || [];
    toast.success("Teachers fetched successfully");
  })
  
 
  .addCase( gettingallTeachers.rejected,(state,action)=>{
     state.isallTeacherget=false
   toast.error( action.payload|| 'Error In adding Teacher logout');
  })


  .addCase(RemoveTeacher.pending,(state)=>{

    state.isTeacherremove=true
  
  })
  

  .addCase(RemoveTeacher.fulfilled, (state, action) => {
    state.isTeacherremove = false;
    state.getallTeacher = state.getallTeacher.filter(Teacher => Teacher._id !== action.meta.arg);
    toast.success("Teachers removed successfully");
  })
  
  
 
  .addCase( RemoveTeacher.rejected,(state,action)=>{
     state.isTeacherremove=false

  })



  .addCase(AddTeacher.pending,(state)=>{

    state.isTeacheradd=true
  
  })
  .addCase(AddTeacher.fulfilled,(state,action)=>{
   state.isTeacheradd=false
   state.getallTeacher.push(action.payload);
   toast.success("Teachers added successfully");
  
 
  })
  
 
  .addCase(AddTeacher.rejected,(state,action)=>{
     state.isTeacheradd=false   

  
  })




  .addCase(  SearchTeacher.pending,(state)=>{
     state.issearchdata=true

  
  })
  .addCase( SearchTeacher.fulfilled,(state,action)=>{
    state.issearchdata=false 
    state.searchdata=action.payload
 
 
  })
  
 
  .addCase(   SearchTeacher.rejected,(state,action)=>{
    state.issearchdata=false
  
  })




  .addCase(EditTeacher.pending,(state)=>{
    state.iseditedTeacher=true

 
 })
 .addCase(EditTeacher.fulfilled,(state,action)=>{
   state.iseditedTeacher=false 
   state.editedTeacher=action.payload


 })
 

 .addCase( EditTeacher.rejected,(state,action)=>{
   state.iseditedTeacher=false
  
 })











}
  


});





export default TeacherSlice.reducer;