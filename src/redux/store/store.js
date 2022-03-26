import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import theme from '../slice/themeSlice'
import layout from '../slice/layoutSlice'
import sidebar from '../slice/sidebarSlice'
import { reducer as toastr } from "react-redux-toastr";

const reducer = combineReducers({
    theme,
    layout,
    sidebar,
    toastr
})

const store = configureStore({
    reducer
})

export default store;