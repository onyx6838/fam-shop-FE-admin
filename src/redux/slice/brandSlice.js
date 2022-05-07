import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ThuongHieuApi from '../../api/ThuongHieuApi'

/**
 * thunk
 */
export const fetchBrands = createAsyncThunk('brand/fetchBrands', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await ThuongHieuApi.getAll(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'brand',
    initialState: {
        brands: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 6
    },
    extraReducers: {
        [fetchBrands.fulfilled]: (state, action) => {
            state.brands = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;