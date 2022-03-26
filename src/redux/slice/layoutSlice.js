import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { LAYOUT_BOXED_DISABLE, SIDEBAR_STICKY_ENABLE, SIDEBAR_STICKY_TOGGLE } from "../constants";

const slice = createSlice({
    name: 'layout',
    initialState: {
        isBoxed: false
    },
    reducers: {
        LAYOUT_BOXED_TOGGLE: (state) => {
            state.isBoxed = !state.isBoxed
        },
        LAYOUT_BOXED_ENABLE: (state) => {
            state.isBoxed = true;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            isAnyOf(SIDEBAR_STICKY_ENABLE, SIDEBAR_STICKY_TOGGLE, LAYOUT_BOXED_DISABLE),
            (state) => {
                state.isBoxed = false
            }
        )
    }
});

const { reducer, actions } = slice;
export const { LAYOUT_BOXED_TOGGLE, LAYOUT_BOXED_ENABLE } = actions;
export default reducer;