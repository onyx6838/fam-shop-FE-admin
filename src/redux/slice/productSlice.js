import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SanPhamApi from '../../api/SanPhamApi'

/**
 * thunk
 */
export const fetchProducts = createAsyncThunk('product/fetchProduct', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await SanPhamApi.getAll(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;