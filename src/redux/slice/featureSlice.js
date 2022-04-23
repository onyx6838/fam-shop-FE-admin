import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DacTrungApi from '../../api/DacTrungApi'

/**
 * thunk
 */
export const fetchFeatures = createAsyncThunk('feature/fetchFeatures', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await DacTrungApi.getAllDacTrung(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchGroupFeatures = createAsyncThunk('feature/fetchGroupFeatures', async (data, { rejectWithValue }) => {
    let { page, size, loaiDacTrung } = data;
    const response = await DacTrungApi.getDacTrungGrByLoai(loaiDacTrung, page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'feature',
    initialState: {
        features: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3,
        groupFeatures: [],
        totalElementsGr: 0,
        totalPagesGr: 0,
        pageGr: 1,
        sizeGr: 4
    },
    extraReducers: {
        [fetchFeatures.fulfilled]: (state, action) => {
            state.features = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchGroupFeatures.fulfilled]: (state, action) => {
            state.groupFeatures = action.payload.content;
            state.totalElementsGr = action.payload.totalElements;
            state.totalPagesGr = action.payload.totalPages;
            state.pageGr = action.payload.page;
        }
    }
});

const { reducer } = slice;
//export const { } = actions;
export default reducer;