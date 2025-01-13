import React, { useState, useEffect } from 'react'
import { firebaseInitApp } from '../App'
import { getAnalytics } from 'firebase/analytics'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
      <footer>
        <Container>
          <div className="footer-text">
            <Row>
              <Col>
                <div className="footer-text-links ">
                  <h2>Informace</h2>
                  <Link to="/about">
                    <p>O nás</p>
                  </Link>
                  <Link to="/contact">
                    <p className="footer-trade-rules">Kontaktujte nás</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className="footer-text-links ">
                  <h2>Podmínky</h2>
                  <Link to="/safety-privacy">
                    <p>GDPR</p>
                  </Link>
                  <Link to="/trade-rules">
                    <p className="footer-trade-rules">Obchodní podmínky</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className="footer-text-links ">
                  <h2>Váš účet</h2>
                  <Link to="/login?redirect=/profile">
                    <p>Objednávky</p>
                  </Link>
                  <Link to="/forgot-password">
                    <p className="footer-trade-rules">Zapomenuté heslo</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className="footer-text-links ">
                  <h2>Kontakt</h2>

                  <a href="mailto:admin@prud.sk">
                    <p>proud@proudnihy.cz</p>
                  </a>

                  <a href="tel:+421904060262">
                    <p>+420 724 526 926</p>
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <Row>
            <Col className="py-3">
              <div className="footer-copyright no-mobile">
                <p className="footer-link">
                  Copyright &copy; {Date().substring(11, 15)} Distribuce Proud, všechna práva
                  vyhrazena,
                </p>
                <a
                  href="https://www.lsm.org"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  style={{ marginLeft: '2px' }}
                >
                  se svolením Living Stream Ministry
                </a>
                <a
                  href="https://www.pictusweb.sk"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  &#60;&#47;&#62; PICTUSWEB Development
                </a>
              </div>

              <div className="footer-copyright mobile-only">
                <p>Copyright &copy; {Date().substring(11, 15)} Distribuce Proud,</p>
                <p>všechna práva vyhrazena, se svolením</p>
                {/* <p> s povolením</p> */}
                <a
                  href="https://www.lsm.org"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  LIVING STREAM MINISTRY
                </a>
                <a
                  href="https://www.pictusweb.sk"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  &#60;&#47;&#62; PICTUSWEB Development
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
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
