
import { configureStore } from "@reduxjs/toolkit";
import TeacherReducer from "../features/Teacher"
import TimetableReducer from "../features/TimeTable"

const store=configureStore({
    reducer:{
     
        Teacher:TeacherReducer,
        Timetable:TimetableReducer
       
    }
})
export default store;