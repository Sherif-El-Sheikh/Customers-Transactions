import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionsData } from "@/types";

export interface selectedCustomerData{
    name: string | null;
    transactions: TransactionsData[] | null;
}

const initialState: selectedCustomerData = {
    name: null,
    transactions: null,
};

export const selectedCustomerSlice = createSlice({
    name: "selectedCustomer",
    initialState,
    reducers: {
        setSelectedCustomer: (state, action: PayloadAction<selectedCustomerData>) => {
            state.name = action.payload.name;
            state.transactions = action.payload.transactions;
        },
    },
});

export const { setSelectedCustomer } = selectedCustomerSlice.actions;

export default selectedCustomerSlice.reducer;