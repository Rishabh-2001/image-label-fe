import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosConfig";


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
    imagesData:{
      isLoading:false,
      error: "",
      data:[]
    }, 
    error:""
}





export const addTagsPost=createAsyncThunk('admin/tags', async (postData,thunkAPI)=>{
  console.log("HRERERERE");

    try{
    
    
      const data= await axiosInstance.post(`/admin/addTagsPost`, postData);
       console.log("RERER", data);
      return { data };
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})
export const deleteTagPost=createAsyncThunk('admin/delete', async (postData,thunkAPI)=>{

    try{
       const {id}=postData;
      console.log("HRERERE", id);
      const data= await axiosInstance.delete(`/admin/deleteTagPost/${id}`,);
       console.log("RERER", data);
      return { data };
    }
    catch(err){
        console.log("ERR:12",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})

export const getAllImagesTags = createAsyncThunk(
  'admin/getAllImages',
  async (_, thunkAPI) => {
    try{
      console.log("HRERERE");
      let {page,limit, selectedCategory,labels }=_;
      if(selectedCategory || labels.length>0 )
      {
        page=1;
        limit=10;
      }
      let url=`/admin/getAllImages?page=${page}&limit=${limit}`;
      if(selectedCategory)
      {
        url+=`&category=${selectedCategory}`;
      }
      if(labels?.length>0)
      {
        url+=`&labels=${labels}`;
      }


      const data= await axiosInstance.get(url );
       console.log("RERER", data);
      return { data };
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }

  }
);


export const getAllCars = createAsyncThunk(
  'admin/getAllCars',
  async (_, thunkAPI) => {
        try {
          const {data} = await axiosInstance.get(`/customer/allCars`);
          console.log("DATAAA:", data);
          return { data };
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);




const adminImagesSlice = createSlice({
    name: "adminImages",
    initialState,
    reducers: {
   

    },
    extraReducers:{
      [addTagsPost.pending]:(state)=>{
        state.isLoading=true
      },
      [addTagsPost.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
        // return action?.payload;
      },
      [addTagsPost.rejected]:(state)=>{
        state.isLoading=false;
      }, 
      [deleteTagPost.pending]:(state)=>{
        state.isLoading=true
      },
      [deleteTagPost.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
        // return action?.payload;
      },
      [deleteTagPost.rejected]:(state, payload)=>{
        
        state.isLoading=false;
        state.error=payload;
      }, 

      [getAllImagesTags.pending]:(state)=>{
        state.imagesData.isLoading=true
      },
      [getAllImagesTags.fulfilled]:(state,action)=>{
      
        state.imagesData.isLoading=false;
        state.imagesData.data=action?.payload?.data;
        // return action?.payload;
      },
      [getAllImagesTags.rejected]:(state,action)=>{
        state.imagesData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminImagesSlice.reducer;
  