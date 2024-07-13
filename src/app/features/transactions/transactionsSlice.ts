import { TransactionsData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface TransactionState {
    transactions : TransactionsData[],
    isError: string | null
}

const initialState: TransactionState = {
    transactions : [],
    isError: null
}

export const getTransactions = createAsyncThunk('transactions/getTransactions', async ()=> {
    try{
        const res = await axios.get('https://my-json-server.typicode.com/Sherif-El-Sheikh/customer-transaction-backend/transactions');
        return res.data;
    }
    catch (error){
        console.log(error)
    }
})

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {

        state.isError = null;
    })
    .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
    })
    .addCase(getTransactions.rejected, (state, action) => {
        state.isError = action.error.message || 'Something went wrong';
    })
    }
})


export default transactionsSlice.reducer