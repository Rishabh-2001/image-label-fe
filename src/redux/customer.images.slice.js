import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosConfig";




const initialState={
    state: {
        isFetching: false,
    },
    imagesData:{
      isLoading:false,
      error: "",
      data:[]
    }
}





export const addTagsPost=createAsyncThunk('customer/tags', async (postData,thunkAPI)=>{
  console.log("HRERERERE");

    try{
      console.log("HRERERE");
      const data= await axiosInstance.post(`/customer/addTagsPost`, postData);
       console.log("RERER", data);
       return { data };
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})


export const getAllImagesTagsCus = createAsyncThunk(
  'customer/getAllImages',
  async (_, thunkAPI) => {
    try{
      console.log("HRERERE","SDFSD");
      let {page,limit, selectedCategory,labels }=_;
      if(selectedCategory || labels.length>0 )
      {
        page=1;
        limit=10;
      }
      let url=`/customer/getAllImages?page=${page}&limit=${limit}`;
      if(selectedCategory)
      {
        url+=`&category=${selectedCategory}`;
      }
      if(labels?.length>0)
      {
        url+=`&labels=${labels}`;
      }


      const data= await axiosInstance.get(url );
      //  console.log("RERER", data);
      return { data };
    }
    catch(err){
        // console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }

  }
);






const customerImageSlice = createSlice({
    name: "customerTags",
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


      [getAllImagesTagsCus.pending]:(state)=>{
        state.imagesData.isLoading=true
      },
      [getAllImagesTagsCus.fulfilled]:(state,action)=>{
      
        state.imagesData.isLoading=false;
        state.imagesData.data=action?.payload?.data;
        // return action?.payload;
      },
      [getAllImagesTagsCus.rejected]:(state,action)=>{
        state.imagesData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default customerImageSlice.reducer;
  