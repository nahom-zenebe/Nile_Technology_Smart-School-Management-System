
import { configureStore } from "@reduxjs/toolkit";
import TeacherReducer from "../features/Teacher"

const store=configureStore({
    reducer:{
     
        Teacher:TeacherReducer,
       
    }
})
export default store;