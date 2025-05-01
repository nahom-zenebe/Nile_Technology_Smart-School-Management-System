
import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "../features/Attendance";
import TeacherReducer from "../features/Teacher"
import TimetableReducer from "../features/TimeTable"
import authSliceReducer from "../features/Authentication"



const store=configureStore({
    reducer:{
        attendance:attendanceReducer,
        Teacher:TeacherReducer,
        Timetable:TimetableReducer,
        authSlice:authSliceReducer
    }
})
export default store;