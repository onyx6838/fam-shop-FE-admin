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
        size: 6,
        selectedRows: [],   // delete multiple item
        selectedRow: 0  // delete one item
    },
    reducers: {
        changeSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        changeSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        }
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

const { reducer, actions } = slice;
export const { changeSelectedRows, changeSelectedRow } = actions;
export default reducer;