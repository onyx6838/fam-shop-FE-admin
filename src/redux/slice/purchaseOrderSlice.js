import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DonDatHangApi from '../../api/DonDatHangApi'

/**
 * thunk
 */
export const fetchPurchaseOrders = createAsyncThunk('purchaseOrder/fetchPurchaseOrder', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await DonDatHangApi.getAllDonDatHang(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'purchaseOrder',
    initialState: {
        purchaseOrders: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3,
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
        [fetchPurchaseOrders.fulfilled]: (state, action) => {
            state.purchaseOrders = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer, actions } = slice;
export const { changeSelectedRows, changeSelectedRow } = actions;
export default reducer;