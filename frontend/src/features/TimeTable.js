import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
    Timetables: null,
    isTimetablesLoading: false,
    isTimetableAdding: false,
    isTimetableRemoving: false,
    isTimetableUpdating: false,
    searchedTimetables: null,
    isSearching: false,
    currentTimetable: null,
    isCurrentLoading: false,
    error: null
};

// Fetch all Timetables
export const fetchAllTimetables = createAsyncThunk(
    'Timetable/getallTimetable',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("Timetable/getallTimetable", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch Timetables");
        }
    }
);

// Add a new Timetable
export const addTimetable = createAsyncThunk(
    'Timetable/createTimetable',
    async (TimetableData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("Timetable/createTimetable", TimetableData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add Timetable");
        }
    }
);

// Remove a Timetable
export const removeTimetable = createAsyncThunk(
    'Timetable/deleteTimetable',
    async (TimetableId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`Timetable/deleteTimetable/${TimetableId}`, { withCredentials: true });
            return { id: TimetableId, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove Timetable");
        }
    }
);

// Update a Timetable
export const updateTimetable = createAsyncThunk(
    'Timetable/updateTimetable',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `Timetable/updateTimetable/${id}`,
                updatedData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update Timetable. Please try again.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Search Timetables
export const searchTimetables = createAsyncThunk(
    'Timetable/search',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Timetable/search?query=${query}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to search Timetables");
        }
    }
);

// Get Timetable by ID
export const getTimetableById = createAsyncThunk(
    'Timetable/getById',
    async (TimetableId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Timetable/getById/${TimetableId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch Timetable");
        }
    }
);

const TimetableSlice = createSlice({
    name: "Timetable",
    initialState,
    reducers: {
        clearCurrentTimetable: (state) => {
            state.currentTimetable = null;
        },
        clearSearchResults: (state) => {
            state.searchedTimetables = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all Timetables
            .addCase(fetchAllTimetables.pending, (state) => {
                state.isTimetablesLoading = true;
                state.error = null;
            })
            .addCase(fetchAllTimetables.fulfilled, (state, action) => {
                state.isTimetablesLoading = false;
                state.Timetables = action.payload.Timetables || [];
                toast.success("Timetables fetched successfully");
            })
            .addCase(fetchAllTimetables.rejected, (state, action) => {
                state.isTimetablesLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error fetching Timetables');
            })

            // Add Timetable
            .addCase(addTimetable.pending, (state) => {
                state.isTimetableAdding = true;
                state.error = null;
            })
            .addCase(addTimetable.fulfilled, (state, action) => {
                state.isTimetableAdding = false;
                if (state.Timetables) {
                    state.Timetables.push(action.payload);
                }
                toast.success("Timetable added successfully");
            })
            .addCase(addTimetable.rejected, (state, action) => {
                state.isTimetableAdding = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error adding Timetable');
            })

            // Remove Timetable
            .addCase(removeTimetable.pending, (state) => {
                state.isTimetableRemoving = true;
                state.error = null;
            })
            .addCase(removeTimetable.fulfilled, (state, action) => {
                state.isTimetableRemoving = false;
                if (state.Timetables) {
                    state.Timetables = state.Timetables.filter(
                        Timetable => Timetable._id !== action.payload.id
                    );
                }
                toast.success("Timetable removed successfully");
            })
            .addCase(removeTimetable.rejected, (state, action) => {
                state.isTimetableRemoving = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error removing Timetable');
            })

            // Update Timetable
            .addCase(updateTimetable.pending, (state) => {
                state.isTimetableUpdating = true;
                state.error = null;
            })
            .addCase(updateTimetable.fulfilled, (state, action) => {
                state.isTimetableUpdating = false;
                if (state.Timetables) {
                    const index = state.Timetables.findIndex(
                        Timetable => Timetable._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.Timetables[index] = action.payload;
                    }
                }
                if (state.currentTimetable?._id === action.payload._id) {
                    state.currentTimetable = action.payload;
                }
                toast.success("Timetable updated successfully");
            })
            .addCase(updateTimetable.rejected, (state, action) => {
                state.isTimetableUpdating = false;
                state.error = action.payload;
            })

            // Search Timetables
            .addCase(searchTimetables.pending, (state) => {
                state.isSearching = true;
                state.error = null;
            })
            .addCase(searchTimetables.fulfilled, (state, action) => {
                state.isSearching = false;
                state.searchedTimetables = action.payload.Timetables || [];
            })
            .addCase(searchTimetables.rejected, (state, action) => {
                state.isSearching = false;
                state.error = action.payload;
            })

            // Get Timetable by ID
            .addCase(getTimetableById.pending, (state) => {
                state.isCurrentLoading = true;
                state.error = null;
            })
            .addCase(getTimetableById.fulfilled, (state, action) => {
                state.isCurrentLoading = false;
                state.currentTimetable = action.payload.Timetable || null;
            })
            .addCase(getTimetableById.rejected, (state, action) => {
                state.isCurrentLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentTimetable, clearSearchResults } = TimetableSlice.actions;
export default TimetableSlice.reducer;