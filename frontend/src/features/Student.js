import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
    students: [],
    isStudentsLoading: false,
    isStudentAdding: false,
    isStudentRemoving: false,
    isStudentUpdating: false,
    searchedStudents: null,
    isSearching: false,
    currentStudent: null,
    isCurrentLoading: false,
    error: null,
    studentStats: {
        total: 0,
        active: 0,
        suspended: 0,
        graduated: 0
    }
};

// Fetch all students
export const fetchAllStudents = createAsyncThunk(
    'student/getallStudentprofile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("student/getallStudentprofile", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch students");
        }
    }
);

// Add a new student
export const addStudent = createAsyncThunk(
    'student/createStudentprofile',
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("student/createStudentprofile", studentData, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add student");
        }
    }
);

// Remove a student
export const removeStudent = createAsyncThunk(
    'student/deleteProfile',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`student/profile/${studentId}`, { withCredentials: true });
            return { id: studentId, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove student");
        }
    }
);

// Update a student
export const updateStudent = createAsyncThunk(
    'student/updateProfile',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `student/profile/${id}`,
                updatedData,
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update student profile. Please try again.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Search students
export const searchStudents = createAsyncThunk(
    'student/search',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`student/search?query=${query}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to search students");
        }
    }
);

// Get student academic records
export const getStudentAcademicRecords = createAsyncThunk(
    'student/academic-records',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`student/academic-records?studentId=${studentId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch student academic records");
        }
    }
);

const StudentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        clearCurrentStudent: (state) => {
            state.currentStudent = null;
        },
        clearSearchResults: (state) => {
            state.searchedStudents = null;
        },
        calculateStudentStats: (state) => {
            state.studentStats.total = state.students.length;
            state.studentStats.active = state.students.filter(student => student.status === 'active').length;
            state.studentStats.suspended = state.students.filter(student => student.status === 'suspended').length;
            state.studentStats.graduated = state.students.filter(student => student.status === 'graduated').length;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all students
            .addCase(fetchAllStudents.pending, (state) => {
                state.isStudentsLoading = true;
                state.error = null;
            })
            .addCase(fetchAllStudents.fulfilled, (state, action) => {
                state.isStudentsLoading = false;
                state.students = action.payload.students || [];
                toast.success("Students fetched successfully");
            })
            .addCase(fetchAllStudents.rejected, (state, action) => {
                state.isStudentsLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error fetching students');
            })

            // Add student
            .addCase(addStudent.pending, (state) => {
                state.isStudentAdding = true;
                state.error = null;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.isStudentAdding = false;
                state.students.push(action.payload.student);
                toast.success("Student added successfully");
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.isStudentAdding = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error adding student');
            })

            // Remove student
            .addCase(removeStudent.pending, (state) => {
                state.isStudentRemoving = true;
                state.error = null;
            })
            .addCase(removeStudent.fulfilled, (state, action) => {
                state.isStudentRemoving = false;
                state.students = state.students.filter(
                    student => student._id !== action.payload.id
                );
                toast.success("Student removed successfully");
            })
            .addCase(removeStudent.rejected, (state, action) => {
                state.isStudentRemoving = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error removing student');
            })

            // Update student
            .addCase(updateStudent.pending, (state) => {
                state.isStudentUpdating = true;
                state.error = null;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isStudentUpdating = false;
                const index = state.students.findIndex(
                    student => student._id === action.payload.student._id
                );
                if (index !== -1) {
                    state.students[index] = action.payload.student;
                }
                if (state.currentStudent?._id === action.payload.student._id) {
                    state.currentStudent = action.payload.student;
                }
                toast.success("Student updated successfully");
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.isStudentUpdating = false;
                state.error = action.payload;
            })

            // Search students
            .addCase(searchStudents.pending, (state) => {
                state.isSearching = true;
                state.error = null;
            })
            .addCase(searchStudents.fulfilled, (state, action) => {
                state.isSearching = false;
                state.searchedStudents = action.payload.students || [];
            })
            .addCase(searchStudents.rejected, (state, action) => {
                state.isSearching = false;
                state.error = action.payload;
            })

            // Get student academic records
            .addCase(getStudentAcademicRecords.pending, (state) => {
                state.isCurrentLoading = true;
                state.error = null;
            })
            .addCase(getStudentAcademicRecords.fulfilled, (state, action) => {
                state.isCurrentLoading = false;
                if (state.currentStudent) {
                    state.currentStudent = {
                        ...state.currentStudent,
                        academicRecords: action.payload.records
                    };
                }
            })
            .addCase(getStudentAcademicRecords.rejected, (state, action) => {
                state.isCurrentLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentStudent, clearSearchResults, calculateStudentStats } = StudentSlice.actions;
export default StudentSlice.reducer; 