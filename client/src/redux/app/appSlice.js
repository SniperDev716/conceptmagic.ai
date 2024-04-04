import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../helpers";

const initialState = {
    isDarkMode: getStorage('theme') == 'dark',
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = !state.isDarkMode;
            setStorage('theme', state.isDarkMode ? 'dark' : 'light');
        },
    },
});

export const { setDarkMode } = appSlice.actions;

export default appSlice.reducer;
