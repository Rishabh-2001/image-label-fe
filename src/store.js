import { configureStore } from "@reduxjs/toolkit";

import userReducer from './redux/auth.slice'
import adminImagesSlice from "./redux/admin.images.slice";
import customerImagesSlice from "./redux/customer.images.slice";


export default configureStore({
    reducer:{
        user:userReducer,
        adminImages: adminImagesSlice,
        customerImages: customerImagesSlice,

    }
})

