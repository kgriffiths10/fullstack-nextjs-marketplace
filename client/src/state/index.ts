
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;      // Can be called like onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        }
    }
});

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;

/* Learning Notes

    - Purpose:  The primary purpose of this file is to define a global slice of the state for handling application-wide 
                UI preferences (like sidebar state and theme mode) and provide actions for modifying that state. It allows 
                different components in your app to access and manipulate this part of the global state using Redux.

    - Redux Slice:  A slice is a collection of Redux reducer logic and actions for a specific part of the state (i.e sidebar collapsed and color modes).

    - Reducers & Actions:   A reducer is a pure function that takes the current state and an action, and returns a new state based on that action.
                            Actions are payloads of information that send data from your application to your Redux store.

    - useAppDispatch is used to dispatch these actions to the Redux store.
    - useAppSelector is used to read the current state values.

    Ex. 
            import React from 'react';
            import { useAppDispatch, useAppSelector } from '@/redux';
            import { setIsSidebarCollapsed, setIsDarkMode } from '@/state';

            const MyComponent = () => {
                const dispatch = useAppDispatch();
                const { isSidebarCollapsed, isDarkMode } = useAppSelector((state) => state.global);

                return (
                    <div>
                    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                        Toggle Sidebar
                    </button>
                    <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
                        Toggle Dark Mode
                    </button>
                    </div>
                );
            };

            export default MyComponent;

*/