import { configureStore } from "@reduxjs/toolkit";

import customersReducer from './features/customers/customersSlice'
import transactionsReducer from './features/transactions/transactionsSlice'
import selectedCustomerReducer from './features/customers/selectedCustomerSlice'

export const store = configureStore({
    reducer: {
        customers: customersReducer,
        transactions: transactionsReducer,
        selectedCustomer : selectedCustomerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;