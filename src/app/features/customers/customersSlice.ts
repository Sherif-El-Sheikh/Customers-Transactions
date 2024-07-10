import { CustomersData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface CustomersState {
    customersList : CustomersData[],
    isLoading: boolean,
    isError: string | null
}

const initialState: CustomersState = {
    customersList : [],
    isLoading: false,
    isError: null
}

export const getCustomers = createAsyncThunk('customers/getCustomers', async ()=> {
    try{
        const res = await axios.get('http://localhost:5000/customers');
        return res.data;
    }
    catch (error){
        console.log(error)
    }
})

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
    })
    .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersList = action.payload;
    })
    .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Something went wrong';
    })
    }
})


export default customersSlice.reducer