import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL='http://localhost:3002/api'

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};


const initialState={
    user: null,
    token: null,
    isLoading: false,
    status: null,
}



//register
export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password, username, firstname, lastname },thunkAPI) => {
  try{
    const res  = await axios.post('/auth/register', { email, password, username, firstname, lastname });
    token.set(res.data.token)
    return res.data;
  } catch (error){
    return thunkAPI.rejectWithValue(error.message)
  }
});


export const loginUser = createAsyncThunk('auth/loginUser', async ({ password, email },thunkAPI) => {
  try{
    const { data } = await axios.post('/auth/login', { password, email });
    token.set(data.token)
    return data;
  } catch (error){
    return thunkAPI.rejectWithValue(error.message)
  }
});


export const logOut=createAsyncThunk('logout',async()=>{
  try{
await axios.post('/users/logout')
    token.unset()
  }catch (error){
    console.log(error);
  }
})


//getMe
// export const getMe = createAsyncThunk('loginUser', async () => {
//   try{
//     const { data } = await axios.get('/auth/me');
//     return data;
//   } catch (e){
//     console.log(e);
//   }
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    //register
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.status;
      state.isLoading = false;
    },
    //  login
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.status;
      state.isLoading = false;
    },

    [logOut.fulfilled]:(state,action)=>{
      state=initialState
    },
    //Get me
    // [getMe.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.status = null;
    //   state.user = action.payload?.user;
    //   state.token = action.payload?.token;
    // },
    // [getMe.rejected]: (state, action) => {
    //   state.status = action.payload.status;
    //   state.isLoading = false;
    // },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
