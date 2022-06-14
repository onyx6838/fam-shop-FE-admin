import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TheLoaiBaiVietApi from '../../api/TheLoaiBaiVietApi'

/**
 * thunk
 */
export const fetchPostsCate = createAsyncThunk('postCate/fetchPostsCate', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await TheLoaiBaiVietApi.getAll(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'postCate',
    initialState: {
        postCates: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 6
    },
    extraReducers: {
        [fetchPostsCate.fulfilled]: (state, action) => {
            state.postCates = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;