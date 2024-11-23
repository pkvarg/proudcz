import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as Icon from 'react-bootstrap-icons'

import {
  listBanner,
  deleteBanner,
  createBanner,
} from '../actions/bannerActions'
import { useNavigate } from 'react-router-dom'
import { BANNER_CREATE_RESET } from '../constants/bannerConstants'

const BannerListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bannerList = useSelector((state) => state.bannerList)
  const { loading, error, banners } = bannerList

  const bannerDelete = useSelector((state) => state.bannerDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bannerDelete

  const bannerCreate = useSelector((state) => state.bannerCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    banner: createdBanner,
  } = bannerCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BANNER_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/banner/${createdBanner._id}/edit`)
    } else {
      dispatch(listBanner('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdBanner,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBanner(id))
    }
  }

  const createBannerHandler = (banner) => {
    dispatch(createBanner())
  }

  return (
    <>
      <Row className='align-items-center no-mobile'>
        <Col>
          <h1>Banner obrázky</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 btn-red' onClick={createBannerHandler}>
            <i className='fas fa-plus'></i> Přidat Banner
          </Button>
        </Col>
      </Row>
      <Row className='align-items-center mobile-only'>
        <Col>
          <h1>Banner</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 btn-red' onClick={createBannerHandler}>
            <i className='fas fa-plus'></i> Přidat obrázek
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm my-5'>
            <thead>
              <tr>
                <th>NÁZEV</th>
                <th>SOUBOR</th>
                <th>KATEGORIE</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  <td>{banner.bannerTitle}</td>
                  <td>{banner.image}</td>
                  <td>{banner.category}</td>

                  <td>
                    <LinkContainer to={`/admin/banner/${banner._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <Icon.Pencil />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(banner._id)}
                    >
                      <Icon.Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default BannerListScreen
