import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL=process.env.REACT_APP_BASE_URL;
const userData=localStorage.getItem('currentUser');
let userId=''
let userType=''
if(userData){
   userId=JSON.parse(userData)?.userId;
   userType=JSON.parse(userData)?.userType
}
const initialState={
    state: {
        isFetching: false,
    },
    user:{
      userType:"",
      isAuthenticated:false,
      token:''
},
profileData: {},
}



export const registerUser=createAsyncThunk('auth/register',async (registerData,thunkAPI)=>{
  try {
    
     const {data,error}=await axios.post(`${BASE_URL}/auth/register`,registerData)
    
     return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.error)
  }
})


export const getProfile = createAsyncThunk(
  'user/profile',
  async (_, thunkAPI) => {
    try {
     
      let url=`${BASE_URL}/customer/getProfile`;
    

      const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'userType': userType,
            'userToken': userId,
          }
    } );
    //   console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
    //   console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setIsFetching : (state) => {
          state.state.isFetching = true;
    }, 
    setUser: (state, action) => {
      console.log("ACTPO", action);
      state.user.userType = action.payload.userType;
      state.user.token = action.payload.token;
      state.user.isAuthenticated = true;
      // Add other user properties as needed
    },
    },
    extraReducers:{
      [registerUser.pending]:(state)=>{
        state.isLoading=true
      },
      [registerUser.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
      },
      [registerUser.rejected]:(state)=>{
        state.isLoading=false;
      },
      [getProfile.pending]:(state)=>{
        state.isLoading=true
      },
      [getProfile.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.profileData=action.payload;
      },
      [getProfile.rejected]:(state)=>{
        state.isLoading=false;
      }


    }

  });

  export const {
    setIsFetching,
    setUser
  } = userSlice.actions;

  export default userSlice.reducer;
  