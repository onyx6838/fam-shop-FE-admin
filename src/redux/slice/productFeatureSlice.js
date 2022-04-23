import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DacTrungSanPhamApi from '../../api/DacTrungSanPhamApi'
import DacTrungApi from '../../api/DacTrungApi'

/**
 * thunk
 */
export const fetchProductFeatures = createAsyncThunk('productFeature/fetchProductFeatures', async (data, { rejectWithValue }) => {
    let { page, size, maSP } = data;
    const response = await DacTrungSanPhamApi.getDacTrungBySanPham(page, size, maSP);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchFeaturesNonGr = createAsyncThunk('feature/fetchFeaturesNonGr', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await DacTrungApi.getAllDacTrungNoneGr(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'productFeature',
    initialState: {
        productFeatures: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3,
        featuresNonGr: [],
        totalElementsNonGr: 0,
        totalPagesNonGr: 0,
        pageNonGr: 1,
        sizeNonGr: 3,
        featuresNonGrSelectedRows: []
    }, reducers: {
        changeFeaturesNonGrSelectedRows: (state, action) => {
            state.featuresNonGrSelectedRows = action.payload
        }
    },
    extraReducers: {
        [fetchProductFeatures.fulfilled]: (state, action) => {
            state.productFeatures = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchFeaturesNonGr.fulfilled]: (state, action) => {
            state.featuresNonGr = action.payload.content;
            state.totalElementsNonGr = action.payload.totalElements;
            state.totalPagesNonGr = action.payload.totalPages;
            state.pageNonGr = action.payload.page;
        }
    }
});

const { reducer, actions } = slice;
export const { changeFeaturesNonGrSelectedRows } = actions;
export default reducer;