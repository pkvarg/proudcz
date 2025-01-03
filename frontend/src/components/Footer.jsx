import React, { useState, useEffect } from 'react'
import { firebaseInitApp } from '../App'
import { getAnalytics } from 'firebase/analytics'
import axios from 'axios'

const CookieConsentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const increaseVisitors = async () => {
    try {
      const { data } = await axios.put(`api/counter/increase`, config)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Check if the user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsModalVisible(true) // Show the modal if no consent is found
    }
  }, [])

  const handleAccept = () => {
    setIsModalVisible(false) // Close the modal
    localStorage.setItem('cookieConsent', 'accepted') // Save consent in localStorage
    const analytics = getAnalytics(firebaseInitApp)
    increaseVisitors() // Call your custom function
  }

  const handleDecline = () => {
    setIsModalVisible(false) // Close the modal
    localStorage.setItem('cookieConsent', 'declined') // Save decline in localStorage
    increaseVisitors() // Call your custom function
  }

  return (
    <div>
      {isModalVisible && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <p>
              Tato stránka používá pouze analytické a pro fungování webu nezbytné cookies.
              Nepoužíváme funkční ani marketingové soubory cookies.{' '}
              <a
                style={{
                  color: '#8a1b1f',
                  fontSize: '15px',
                }}
                href="/safety-privacy"
              >
                GDPR
              </a>
            </p>
            <div style={modalStyles.buttonContainer}>
              <button style={modalStyles.acceptButton} onClick={handleAccept}>
                Souhlasím
              </button>
              <button style={modalStyles.declineButton} onClick={handleDecline}>
                Nesouhlasím
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Modal styles
const modalStyles = {
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#dadada',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'justify',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  acceptButton: {
    backgroundColor: '#1d9f2f',
    color: '#fff',
    fontSize: '17.5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  declineButton: {
    backgroundColor: 'red',
    color: '#fff',
    fontSize: '17.5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default CookieConsentModal
