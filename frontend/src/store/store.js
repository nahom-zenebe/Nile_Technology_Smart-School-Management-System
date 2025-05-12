import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "../features/Attendance";
import TeacherReducer from "../features/Teacher"
import TimetableReducer from "../features/TimeTable"
import authReducer from "../features/Authentication"
import FeeReducer from "../features/Fee"
import StudentReducer from "../features/Student"



const store=configureStore({
    reducer:{
        attendance:attendanceReducer,
        Teacher:TeacherReducer,
        Timetable:TimetableReducer,
        auth:authReducer,
        Fee:FeeReducer,
        Student:StudentReducer
    }
})
export default store;