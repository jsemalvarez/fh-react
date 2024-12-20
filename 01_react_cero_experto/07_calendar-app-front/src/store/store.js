import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice } from "./";


export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer
    }
})