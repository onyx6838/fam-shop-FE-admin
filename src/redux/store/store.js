import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import theme from '../slice/themeSlice'
import layout from '../slice/layoutSlice'
import sidebar from '../slice/sidebarSlice'
import product from '../slice/productSlice'
import brand from '../slice/brandSlice'
import { reducer as toastr } from "react-redux-toastr";

const reducer = combineReducers({
    theme,
    layout,
    sidebar,
    toastr,
    product,
    brand
})

const store = configureStore({
    reducer
})

export default store;