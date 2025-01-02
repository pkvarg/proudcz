import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import { firebaseInitApp } from '../App'
import { getAnalytics } from 'firebase/analytics'
import axios from 'axios'

const Footer = () => {
  const [cookieAccept, setCookieAccept] = useState(false)

  if (cookieAccept === true) {
    const analytics = getAnalytics(firebaseInitApp)
  }

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

  return (
    <>
      <CookieConsent
        location="bottom"
        style={{
          background: '#dadada',
          color: '#8a1b1f',
          fontSize: '15px',
          textAlign: 'justify',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '17.5px',
        }}
        buttonText="Souhlasím"
        expires={365}
        enableDeclineButton
        onAccept={() => {
          setCookieAccept(true)
          increaseVisitors()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '17.5px',
        }}
        declineButtonText="Nesouhlasím"
        onDecline={() => {
          increaseVisitors()
        }}
      >
        Tato stránka používá pouze analytické a pro fungování webu nezbytné cookies. Nepoužívame
        funkční ani marketingové soubory cookies.{' '}
        <a
          style={{
            color: '#8a1b1f',
            fontSize: '15px',
            //textDecoration: 'none',
          }}
          href="/safety-privacy"
        >
          {' '}
          GDPR
        </a>
      </CookieConsent>

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
    </>
  )
}

export default Footer
