import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import ContactScreen from './screens/ContactScreen'
import CreateDiscount from './screens/CreateDiscount'
import NewBooks from './screens/NewBooks'
import WordsOfLife from './screens/WordsOfLife'
import LifeStudy from './screens/LifeStudy'
import AudioListScreen from './screens/AudioListScreen'
import AudioEditScreen from './screens/AudioEditScreen'
import BannerListScreen from './screens/BannerListScreen'
import BannerEditScreen from './screens/BannerEditScreen'
import Video from './screens/Video'
import Eshop from './screens/Eshop'
import VideoListScreen from './screens/VideoListScreen'
import VideoEditScreen from './screens/VideoEditScreen'
import Library from './screens/Library'
import LibraryExcerpt from './screens/LibraryExcerpt'
import About from './screens/About'
import WatchmanNee from './screens/WatchmanNee'
import WitnessLee from './screens/WitnessLee'
import SafetyPrivacy from './screens/SafetyPrivacy'
import TradeRules from './screens/TradeRules'
import Reviews from './screens/Reviews'
import Favorites from './screens/Favorites'
import OrderStripeSuccess from './screens/OrderStripeSuccess'
import OrderStripeFail from './screens/OrderStripeFail'
import CompleteRegistration from './screens/CompleteRegistration'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { firebaseConfiguration } from './firebaseConfig'

// Initialize Firebase
export const firebaseInitApp = initializeApp(firebaseConfiguration)
export const auth = getAuth(firebaseInitApp)
export const provider = new GoogleAuthProvider()

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route
                path='/order/:id/stripe-success/:init'
                element={<OrderStripeSuccess />}
              />
              <Route
                path='/order/:id/stripe-fail'
                element={<OrderStripeFail />}
              />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/login/profile' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route
                path='/reset-password/:email/:id/:token'
                element={<ResetPasswordScreen />}
              />

              <Route path='/profile' element={<ProfileScreen />} />

              <Route path='/product/:id' element={<ProductScreen />} />

              <Route path='/cart'>
                <Route path=':id' element={<CartScreen />} />
                <Route path='' element={<CartScreen />} />
              </Route>
              <Route path='/contact' element={<ContactScreen />} />
              <Route path='/create-discount' element={<CreateDiscount />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />

              <Route path='/' element={<HomeScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route path='/admin/audio' element={<AudioListScreen />} />
              <Route
                path='/admin/audio/:id/edit'
                element={<AudioEditScreen />}
              />
              <Route
                path='/forgot-password'
                element={<ForgotPasswordScreen />}
              />

              <Route path='/new-books/:year' element={<NewBooks />} />
              <Route path='/words-of-life' element={<WordsOfLife />} />
              <Route path='/life-study' element={<LifeStudy />} />

              <Route path='/admin/banner' element={<BannerListScreen />} />
              <Route
                path='/admin/banner/:id/edit'
                element={<BannerEditScreen />}
              />
              <Route path='/video' element={<Video />} />
              <Route path='/eshop/:category' element={<Eshop />} />
              <Route path='/admin/video' element={<VideoListScreen />} />
              <Route
                path='/admin/video/:id/edit'
                element={<VideoEditScreen />}
              />
              <Route path='/library' element={<Library />} />
              <Route path='/library/:id' element={<LibraryExcerpt />} />
              <Route path='/library/page/:pageNumber' element={<Library />} />
              <Route
                path='/library/:id/page/:pageNumber'
                element={<LibraryExcerpt />}
              />
              <Route path='/watchman-nee' element={<WatchmanNee />} />
              <Route path='/witness-lee' element={<WitnessLee />} />
              <Route path='/about' element={<About />} />
              <Route path='/safety-privacy' element={<SafetyPrivacy />} />
              <Route path='/trade-rules' element={<TradeRules />} />
              <Route path='/admin/reviews' element={<Reviews />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route
                path='/registerLink/:email/:token'
                element={<CompleteRegistration />}
              />
              <Route path='/registerLink' element={<CompleteRegistration />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
