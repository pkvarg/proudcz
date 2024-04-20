import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      {/* grey navbar no mobile */}

      <Navbar expand='lg' className='grey-navbar-top no-mobile'>
        <Container>
          <div className='grey-navbar-flex'>
            <LinkContainer to='/contact' className='grey-navbar-top-contact'>
              <p className='grey-navbar-contact'>Kontakt</p>
            </LinkContainer>
          </div>
          <div className='grey-navbar-two-links'>
            <LinkContainer to='/cart' className='grey-navbar-cart'>
              <Nav.Link>
                <p className='number-in-cart '>
                  <span>{cartItems.length}</span>
                </p>

                <Icon.Cart2 className='header-basket'>Košík</Icon.Cart2>
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='profile'>
                  <NavDropdown.Item>Můj profil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Odhlásit se
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login' className='grey-navbar-sign-in'>
                <Nav.Link>
                  <Icon.Person className='header-user' /> Přihlášení
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && !userInfo.isAssistant && (
              <NavDropdown className='admin-menu' title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Uživatelé</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Produkty</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Objednávky</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/audio'>
                  <NavDropdown.Item>Audio</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/video'>
                  <NavDropdown.Item>Video</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/banner'>
                  <NavDropdown.Item>Bannery</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {userInfo && userInfo.isAssistant && (
              <NavDropdown title='Asistent' id='adminmenu'>
                <LinkContainer to='/admin/audio'>
                  <NavDropdown.Item>Audio</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/video'>
                  <NavDropdown.Item>Video</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/banner'>
                  <NavDropdown.Item>Bannery</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </div>
        </Container>
      </Navbar>
      {/* Header with Logo ... */}
      <div className='top-container no-mobile container'>
        <div>
          <Link to='/' className='no-underline'>
            <img
              src='/images/wwwproudbanner.png'
              className='header-image'
              alt='prud-zivota'
            ></img>
          </Link>
          <h3 className='header-publisher'>
            Přinášet bohatství Božího slova všemu Božímu lidu
          </h3>
        </div>
        <div className='header-search-box'>
          <SearchBox />
        </div>
      </div>
      {/* Red Navbar, on Mobile is Grey with Toggle */}
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <div className='red-navbar-container'>
          <Container>
            <Navbar.Brand>
              <div className='mobile-navbar mobile-only'>
                <div className='mobile-sign-in mobile-only'>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='profile'>
                        <NavDropdown.Item>Můj profil</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Odhlásit se
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to='/login'>
                      <Nav.Link className='mobile-sign-in'>
                        <Icon.Person className='header-user' />
                      </Nav.Link>
                    </LinkContainer>
                  )}

                  {userInfo && userInfo.isAdmin && !userInfo.isAssistant && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Uživatelé</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Produkty</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Objednávky</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/audio'>
                        <NavDropdown.Item>Audio</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/video'>
                        <NavDropdown.Item>Video</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/banner'>
                        <NavDropdown.Item>Bannery</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.isAssistant && (
                    <NavDropdown title='Asistent' id='adminmenu'>
                      <LinkContainer to='/admin/audio'>
                        <NavDropdown.Item>Audio</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/video'>
                        <NavDropdown.Item>Video</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/banner'>
                        <NavDropdown.Item>Bannery</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </div>

                <div className='mobile-cart mobile-only'>
                  <LinkContainer to='/cart' className='header-cart mobile-only'>
                    <Nav.Link>
                      <p className='number-in-cart'>
                        <span>{cartItems.length}</span>
                      </p>
                      <Icon.Cart className='header-cart' />
                    </Nav.Link>
                  </LinkContainer>
                </div>
                <Link to='favorites' className='favorites-heart'>
                  <Icon.HeartFill className='header-heart' />
                </Link>
              </div>
            </Navbar.Brand>
          </Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            className='mobile-navbar-collapse'
            id='basic-navbar-nav'
          >
            {/* <NavDropdown title='Darujte 2%' className='red-navbar-item'>
            <LinkContainer to='give2'>
              <NavDropdown.Item>Darujte 2%</NavDropdown.Item>
            </LinkContainer>
              <LinkContainer to='give2-physical'>
                <NavDropdown.Item>Fyzické osoby</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='give2-physical-business'>
                <NavDropdown.Item> Podnikatelia</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='give2-lawyer'>
                <NavDropdown.Item>Právnické osoby</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown> */}
            <NavDropdown title='Novinky' className='red-navbar-item'>
              <LinkContainer to='new-books/2020'>
                <NavDropdown.Item>Knihy 2020</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='new-books/2019'>
                <NavDropdown.Item>Knihy 2019</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='new-books/2017'>
                <NavDropdown.Item>Knihy 2017</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='new-books/2016'>
                <NavDropdown.Item>Knihy 2016</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title='Podcast' className='red-navbar-item'>
              <LinkContainer to='words-of-life'>
                <NavDropdown.Item>Slova života</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='life-study'>
                <NavDropdown.Item>Studium života</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to='/video'>
              <Nav.Link className='red-navbar-item'>Video</Nav.Link>
            </LinkContainer>
            <NavDropdown title='E-shop' className='red-navbar-item'>
              <LinkContainer to='eshop/abecedný-zoznam-kníh'>
                <NavDropdown.Item>Abecední seznam knih</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/božia-ekonómia'>
                <NavDropdown.Item>Boží ekonomie</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/brožúry'>
                <NavDropdown.Item>Brožury</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/cirkev'>
                <NavDropdown.Item>Církev</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/duch'>
                <NavDropdown.Item>Duch</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/evanjelium'>
                <NavDropdown.Item>Evangelium</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/kristus'>
                <NavDropdown.Item>Kristus</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/kresťanská-prax'>
                <NavDropdown.Item>Křesťanská praxe</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/kresťanská-služba'>
                <NavDropdown.Item>Křesťanská služba</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/letáky'>
                <NavDropdown.Item>Letáky</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/mládež'>
                <NavDropdown.Item>Mládež</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/štúdium-a-výklad-biblie'>
                <NavDropdown.Item>Studium a výklad Bible</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/trojjediný-boh'>
                <NavDropdown.Item>Trojjediný Bůh</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/život'>
                <NavDropdown.Item>Život</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='eshop/životopisné'>
                <NavDropdown.Item>Životopisné</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to='/library'>
              <Nav.Link className='red-navbar-item'>Čítárna</Nav.Link>
            </LinkContainer>
            <NavDropdown title='Info' className='red-navbar-item'>
              <LinkContainer to='watchman-nee'>
                <NavDropdown.Item>Watchman Nee</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='witness-lee'>
                <NavDropdown.Item>Witness Lee</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='about'>
                <NavDropdown.Item>O nás</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='safety-privacy'>
                <NavDropdown.Item>Bezpečnost a soukromí</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to='/contact'>
              <Nav.Link className='red-navbar-item'>Kontakt</Nav.Link>
            </LinkContainer>
            {/* <a
              href='http://www.facebook.com/prud.sk'
              target='_blank'
              rel='noreferrer'
              className='no-mobile'
            >
              <Icon.Facebook className='header-facebook-white' />
            </a> */}
            <Link to='favorites' className='no-mobile'>
              <Icon.HeartFill className='header-heart-white' />
            </Link>

            {/* <div className='search-navbar-mobile mobile-only'>
              <SearchBox />
            </div> */}
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className='mobile-logo-under-grey mobile-only'>
        <Link to='/' className='no-underline'>
          <img
            src='/images/wwwproudbanner.png'
            className='img-mobile-logo-under-grey'
            alt='prud-zivota'
          ></img>
          <p className='mobile-under-grey-publisher'>
            Přinášet bohatství Božího lidu všemu Božímu lidu
          </p>
        </Link>

        <div className='search-navbar-mobile mobile-only'>
          <SearchBox />
        </div>
      </div>

      {/* <Link to='/' className='no-underline mobile-header-logo mobile-only'>
        <img
          src='/images/wwwproudbanner.png'
          className=''
          alt='prud-zivota'
        ></img>
      </Link> */}
    </header>
  )
}

export default Header
