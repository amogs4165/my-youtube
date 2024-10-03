import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";

const store = configureStore({
    reducer: {
        app: appSlice
    }
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
