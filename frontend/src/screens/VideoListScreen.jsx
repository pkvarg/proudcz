import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listVideo, deleteVideo, createVideo } from '../actions/videoActions'
import { useNavigate } from 'react-router-dom'
import { VIDEO_CREATE_RESET } from '../constants/videoConstants'
import * as Icon from 'react-bootstrap-icons'

const VideoListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoList = useSelector((state) => state.videoList)
  const { loading, error, videos } = videoList

  const videoDelete = useSelector((state) => state.videoDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = videoDelete

  const videoCreate = useSelector((state) => state.videoCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    video: createdVideo,
  } = videoCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: VIDEO_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/video/${createdVideo._id}/edit`)
    } else {
      dispatch(listVideo('', pageNumber))
    }
  }, [dispatch, userInfo, navigate, successDelete, successCreate, createdVideo, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteVideo(id))
    }
  }

  const createVideoHandler = () => {
    dispatch(createVideo())
  }

  // sort by abc
  videos.sort((a, b) => {
    return a.videoTitle.localeCompare(b.videoTitle)
  })

  return (
    <>
      <Row className="align-items-center no-mobile">
        <Col>
          <h1>YouTube Video</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3 btn-red" onClick={createVideoHandler}>
            Přidat YouTube Video
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mobile-only">
        <Col>
          <h1>YouTube Video</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3 btn-red" onClick={createVideoHandler}>
            Přidat YouTube Video
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm my-5">
            <thead>
              <tr>
                <th>NÁZEV (v tomto -abc- pořadí budou videa zobrazená)</th>
                <th>VIDEO</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td>{video.videoTitle}</td>
                  <td>{video.code}</td>

                  <td>
                    <LinkContainer to={`/admin/video/${video._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <Icon.Pencil />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(video._id)}
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

export default VideoListScreen
