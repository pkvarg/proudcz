import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getGoogleUserInfo } from '../actions/userActions'
import { Button } from 'react-bootstrap'

import { auth, provider } from './../App'
import { signInWithPopup } from 'firebase/auth'
import { GoogleButton } from 'react-google-button'

const GoogleSignIn = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  // only with google
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  // Google Firebase
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      let userObject = result.user
      setUser(userObject)
      const data = {
        name: userObject.displayName,
        email: userObject.email,
        googleId: userObject.uid,

        isAdmin: false,
      }

      dispatch(getGoogleUserInfo(data))
    })
  }

  const handleGoogleSignIn = () => {
    try {
      signInWithGoogle()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <GoogleButton onClick={handleGoogleSignIn} />

      {/* {Object.keys(user).length !== 0 && (
        <Button
          className='my-1'
          variant='primary'
          onClick={(e) => handleSignOut(e)}
        >
          Google Sign Out
        </Button>
      )} */}
    </>
  )
}

export default GoogleSignIn
