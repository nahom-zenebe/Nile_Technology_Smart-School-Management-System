import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
    fees: [],
    isFeesLoading: false,
    isFeeAdding: false,
    isFeeRemoving: false,
    isFeeUpdating: false,
    currentFee: null,
    isCurrentLoading: false,
    error: null,
    studentFees: [],
    isPaid: false
};

// Fetch all fees
export const fetchAllFees = createAsyncThunk(
    'Fee/getallFee',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("Fee/getallFee", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch fees");
        }
    }
);

// Add a new fee
export const addFee = createAsyncThunk(
    'Fee/CreateFee',
    async (feeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("Fee/CreateFee", feeData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add fee");
        }
    }
);

// Remove a fee
export const removeFee = createAsyncThunk(
    'Fee/deletefee',
    async (feeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`Fee/deletefee/${feeId}`, { withCredentials: true });
            return { id: feeId, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove fee");
        }
    }
);

// Update a fee
export const updateFee = createAsyncThunk(
    'Fee/updatefee',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `Fee/updatefee/${id}`,
                updatedData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update fee. Please try again.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Mark fee as paid
export const markFeePaid = createAsyncThunk(
    'Fee/markPaid',
    async ({ id, paymentDetails }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `Fee/updatefee/${id}`,
                {
                    paidStatus: true,
                    paymentDate: new Date().toISOString(),
                    ...paymentDetails
                },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to mark fee as paid. Please try again.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Get fee by ID
export const getFeeById = createAsyncThunk(
    'Fee/getFeeById',
    async (feeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Fee/${feeId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch fee details");
        }
    }
);

// Get fees by student ID
export const getFeesByStudentId = createAsyncThunk(
    'Fee/getByStudentId',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Fee/student/${studentId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch student fees");
        }
    }
);

const FeeSlice = createSlice({
    name: "Fee",
    initialState,
    reducers: {
        clearCurrentFee: (state) => {
            state.currentFee = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all fees
            .addCase(fetchAllFees.pending, (state) => {
                state.isFeesLoading = true;
                state.error = null;
            })
            .addCase(fetchAllFees.fulfilled, (state, action) => {
                state.isFeesLoading = false;
                state.fees = action.payload || [];
            })
            .addCase(fetchAllFees.rejected, (state, action) => {
                state.isFeesLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error fetching fees');
            })

            // Add fee
            .addCase(addFee.pending, (state) => {
                state.isFeeAdding = true;
                state.error = null;
            })
            .addCase(addFee.fulfilled, (state, action) => {
                state.isFeeAdding = false;
                state.fees.push(action.payload);
                toast.success("Fee added successfully");
            })
            .addCase(addFee.rejected, (state, action) => {
                state.isFeeAdding = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error adding fee');
            })

            // Remove fee
            .addCase(removeFee.pending, (state) => {
                state.isFeeRemoving = true;
                state.error = null;
            })
            .addCase(removeFee.fulfilled, (state, action) => {
                state.isFeeRemoving = false;
                state.fees = state.fees.filter(
                    fee => fee._id !== action.payload.id
                );
                toast.success("Fee removed successfully");
            })
            .addCase(removeFee.rejected, (state, action) => {
                state.isFeeRemoving = false;
                state.error = action.payload;
                toast.error(action.payload || 'Error removing fee');
            })

            // Update fee
            .addCase(updateFee.pending, (state) => {
                state.isFeeUpdating = true;
                state.error = null;
            })
            .addCase(updateFee.fulfilled, (state, action) => {
                state.isFeeUpdating = false;
                const index = state.fees.findIndex(
                    fee => fee._id === action.payload._id
                );
                if (index !== -1) {
                    state.fees[index] = action.payload;
                }
                if (state.currentFee?._id === action.payload._id) {
                    state.currentFee = action.payload;
                }
                toast.success("Fee updated successfully");
            })
            .addCase(updateFee.rejected, (state, action) => {
                state.isFeeUpdating = false;
                state.error = action.payload;
            })

            // Mark fee as paid
            .addCase(markFeePaid.pending, (state) => {
                state.isFeeUpdating = true;
                state.error = null;
            })
            .addCase(markFeePaid.fulfilled, (state, action) => {
                state.isFeeUpdating = false;
                const index = state.fees.findIndex(
                    fee => fee._id === action.payload._id
                );
                if (index !== -1) {
                    state.fees[index] = action.payload;
                }
                if (state.currentFee?._id === action.payload._id) {
                    state.currentFee = action.payload;
                }
                state.isPaid = true;
                toast.success("Fee marked as paid successfully");
            })
            .addCase(markFeePaid.rejected, (state, action) => {
                state.isFeeUpdating = false;
                state.error = action.payload;
            })

            // Get fee by ID
            .addCase(getFeeById.pending, (state) => {
                state.isCurrentLoading = true;
                state.error = null;
            })
            .addCase(getFeeById.fulfilled, (state, action) => {
                state.isCurrentLoading = false;
                state.currentFee = action.payload || null;
            })
            .addCase(getFeeById.rejected, (state, action) => {
                state.isCurrentLoading = false;
                state.error = action.payload;
            })

            // Get fees by student ID
            .addCase(getFeesByStudentId.pending, (state) => {
                state.isFeesLoading = true;
                state.error = null;
            })
            .addCase(getFeesByStudentId.fulfilled, (state, action) => {
                state.isFeesLoading = false;
                state.studentFees = action.payload || [];
            })
            .addCase(getFeesByStudentId.rejected, (state, action) => {
                state.isFeesLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentFee } = FeeSlice.actions;
export default FeeSlice.reducer; 