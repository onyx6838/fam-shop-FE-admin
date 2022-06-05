import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PhieuNhapKhoApi from '../../api/PhieuNhapKhoApi'

/**
 * thunk
 */
export const fetchReceipts = createAsyncThunk('receipt/fetchReceipts', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await PhieuNhapKhoApi.getAllPNK(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchChildReceiptsByMaSP = createAsyncThunk('receipt/fetchChildReceiptsByMaSP', async (data, { rejectWithValue }) => {
    let { maSP, page, size } = data;
    const response = await PhieuNhapKhoApi.getCTPNKByMaSP(maSP, page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'receipt',
    initialState: {
        receipts: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3,
        selectedRows: [],   // delete multiple item
        selectedRow: 0,  // delete one item,
        // ctpnk by maSP
        childReceipts: [],
        childTotalElements: 0,
        childTotalPages: 0,
        childPage: 1,
        childSize: 2
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
        [fetchReceipts.fulfilled]: (state, action) => {
            state.receipts = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchChildReceiptsByMaSP.fulfilled]: (state, action) => {
            state.childReceipts = action.payload.content;
            state.childTotalElements = action.payload.totalElements;
            state.childTotalPages = action.payload.totalPages;
            state.childPage = action.payload.page;
        }
    }
});

const { reducer, actions } = slice;
export const { changeSelectedRows, changeSelectedRow } = actions;
export default reducer;