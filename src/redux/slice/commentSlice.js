import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DanhGiaApi from '../../api/DanhGiaApi'

/**
 * thunk
 */
export const fetchParentComments = createAsyncThunk('comment/fetchParentComments', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await DanhGiaApi.getParentDanhGias(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchChildComments = createAsyncThunk('comment/fetchChildComments', async (data, { rejectWithValue }) => {
    let { page, size, maDanhGiaCha } = data;
    const response = await DanhGiaApi.getChildDanhGias(page, size, maDanhGiaCha);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 2,
        childComments: [],
        totalChildElements: 0,
        totalChildPages: 0,
        childCmtPage: 1,
        childCmtSize: 2
    },
    extraReducers: {
        [fetchParentComments.fulfilled]: (state, action) => {
            state.comments = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchChildComments.fulfilled]: (state, action) => {
            state.childComments = action.payload.content;
            state.totalChildElements = action.payload.totalElements;
            state.totalChildPages = action.payload.totalPages;
            state.childCmtPage = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;