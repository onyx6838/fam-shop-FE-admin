import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import LoginApi from '../../api/LoginApi'
import storage from '../../storage/storage';

export const fetchLogin = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    const { username, password } = data;
    try {
        const response = await LoginApi.login(username, password);
        return response;
    } catch (err) {
        if (!err.response) {
            throw err
        }
        console.log(err);
        return rejectWithValue(true)
    }
})

const slice = createSlice({
    name: 'user',
    initialState: {
        userInfo: storage.getUserInfo(),
        token: storage.getToken(),
        refreshToken: storage.getRefreshToken()
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { setToken, setUserInfo, setRefreshToken } = actions;
export default reducer;