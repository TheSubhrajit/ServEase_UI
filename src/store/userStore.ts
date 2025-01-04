import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'
import bookingTypeReducer from '../features/bookingType/bookingTypeSlice'


export default configureStore({
  reducer: {
    user : userReducer,
    cart : cartReducer,
    bookingType : bookingTypeReducer 
  },
})