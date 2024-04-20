import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk' // I still add this for my reference so I know thunk middleware is added
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productReviewAcknowledgeReducer,
  productReviewDeleteReducer,
  productTopRatedReducer,
  productRemoveFromFavoritesReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  forgotPasswordReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  resetPasswordReducer,
} from './reducers/userReducers'

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderCancellReducer,
} from './reducers/orderReducers'

import {
  audioListReducer,
  audioCreateReducer,
  audioDetailsReducer,
  audioDeleteReducer,
  audioUpdateReducer,
} from './reducers/audioReducers'

import {
  videoListReducer,
  videoCreateReducer,
  videoDetailsReducer,
  videoDeleteReducer,
  videoUpdateReducer,
} from './reducers/videoReducers'

import {
  bannerListReducer,
  bannerCreateReducer,
  bannerDetailsReducer,
  bannerDeleteReducer,
  bannerUpdateReducer,
} from './reducers/bannerReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewAcknowledge: productReviewAcknowledgeReducer,
  productReviewDelete: productReviewDeleteReducer,
  productTopRated: productTopRatedReducer,
  productRemoveFromFavorites: productRemoveFromFavoritesReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderCancell: orderCancellReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  audioList: audioListReducer,
  audioDetails: audioDetailsReducer,
  audioDelete: audioDeleteReducer,
  audioCreate: audioCreateReducer,
  audioUpdate: audioUpdateReducer,
  videoList: videoListReducer,
  videoDetails: videoDetailsReducer,
  videoDelete: videoDeleteReducer,
  videoCreate: videoCreateReducer,
  videoUpdate: videoUpdateReducer,

  bannerList: bannerListReducer,
  bannerDetails: bannerDetailsReducer,
  bannerDelete: bannerDeleteReducer,
  bannerCreate: bannerCreateReducer,
  bannerUpdate: bannerUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: middleware,
})

export default store
