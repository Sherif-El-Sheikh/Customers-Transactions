import { configureStore } from "@reduxjs/toolkit";

import customersReducer from './features/customers/customersSlice'
import transactionsReducer from './features/transactions/transactionsSlice'

export const store = configureStore({
    reducer: {
        customers: customersReducer,
        transactions: transactionsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;