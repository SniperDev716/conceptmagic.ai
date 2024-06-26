import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../helpers";

const initialState = {
    isDarkMode: getStorage('theme') == 'dark',
    openPayModal: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = !state.isDarkMode;
            setStorage('theme', state.isDarkMode ? 'dark' : 'light');
        },
        setOpenPayModal(state, action) {
            state.openPayModal = !state.openPayModal;
        }
    },
});

export const { setDarkMode, setOpenPayModal } = appSlice.actions;

export default appSlice.reducer;
