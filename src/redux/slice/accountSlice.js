import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TaiKhoanApi from '../../api/TaiKhoanApi'

export const fetchAccountByRole = createAsyncThunk('account/fetchAccountsByRole', async (data, { rejectWithValue }) => {
    let { page, size, role } = data;
    try {
        const response = await TaiKhoanApi.getAccountsByRole(page, size, role);
        return { ...response, page, role };
    } catch (err) {
        if (!err.response) {
            throw err
        }
        console.log(err);
        return rejectWithValue(true)
    }
})

export const fetchAccounts = createAsyncThunk('account/fetchAccounts', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await TaiKhoanApi.getAllTaiKhoan(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'account',
    initialState: {
        accounts: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 6,
        role: '',
        selectedRowShipper: []
    },
    reducers: {
        changeSelectedRowShipper: (state, action) => {
            state.selectedRowShipper = action.payload
        }
    },
    extraReducers: {
        [fetchAccountByRole.fulfilled]: (state, action) => {
            state.accounts = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
            state.role = action.payload.role;
        },
        [fetchAccounts.fulfilled]: (state, action) => {
            state.accounts = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer, actions } = slice;
export const { changeSelectedRowShipper } = actions;
export default reducer;