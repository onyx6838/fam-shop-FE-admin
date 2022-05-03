import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import theme from '../slice/themeSlice'
import layout from '../slice/layoutSlice'
import sidebar from '../slice/sidebarSlice'
import product from '../slice/productSlice'
import brand from '../slice/brandSlice'
import purchaseOrder from '../slice/purchaseOrderSlice'
import feature from '../slice/featureSlice'
import productFeature from '../slice/productFeatureSlice'
import category from '../slice/categorySlice'
import receipt from '../slice/receiptSlice'
import user from '../slice/userSlice'
import { reducer as toastr } from "react-redux-toastr";

const reducer = combineReducers({
    theme,
    layout,
    sidebar,
    toastr,
    product,
    brand,
    purchaseOrder,
    feature,
    productFeature,
    category,
    receipt,
    user
})

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export default store;