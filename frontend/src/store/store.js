
import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "../features/Attendance";
import TeacherReducer from "../features/Teacher"
import TimetableReducer from "../features/TimeTable"



const store=configureStore({
    reducer:{
        attendance:attendanceReducer,
        Teacher:TeacherReducer,
        Timetable:TimetableReducer
    }
})
export default store;