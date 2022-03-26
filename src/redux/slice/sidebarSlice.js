import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { LAYOUT_BOXED_ENABLE, LAYOUT_BOXED_TOGGLE, SIDEBAR_STICKY_DISABLE } from "../constants";

const slice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: true,
        isSticky: false
    },
    reducers: {
        SIDEBAR_VISIBILITY_TOGGLE: (state) => {
            state.isOpen = !state.isOpen
        },
        SIDEBAR_VISIBILITY_SHOW: (state) => {
            state.isOpen = true
        },
        SIDEBAR_VISIBILITY_HIDE: (state) => {
            state.isOpen = false
        },
        SIDEBAR_STICKY_TOGGLE: (state) => {
            state.isSticky = !state.isSticky
        },
        SIDEBAR_STICKY_ENABLE: (state) => {
            state.isSticky = true
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            isAnyOf(LAYOUT_BOXED_ENABLE, LAYOUT_BOXED_TOGGLE, SIDEBAR_STICKY_DISABLE),
            (state) => {
                state.isSticky = false
            }
        )
    }
});

const { reducer, actions } = slice;
export const {
    SIDEBAR_VISIBILITY_TOGGLE,
    SIDEBAR_VISIBILITY_SHOW,
    SIDEBAR_VISIBILITY_HIDE,
    SIDEBAR_STICKY_TOGGLE,
    SIDEBAR_STICKY_ENABLE } = actions;
export default reducer;