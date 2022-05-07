import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import LoaiSanPhamApi from '../../api/LoaiSanPhamApi'

/**
 * thunk
 */
export const fetchCategories = createAsyncThunk('category/fetchCategories', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await LoaiSanPhamApi.getAllLoaiSP(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 6
    },
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;