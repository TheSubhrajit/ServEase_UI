import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'
import bookingTypeReducer from '../features/bookingType/bookingTypeSlice'
import pricingReducer from '../features/pricing/pricingSlice'


export default configureStore({
  reducer: {
    user : userReducer,
    cart : cartReducer,
    bookingType : bookingTypeReducer,
    pricing : pricingReducer 
  },
})