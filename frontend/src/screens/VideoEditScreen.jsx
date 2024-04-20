import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listVideoDetails, updateVideo } from '../actions/videoActions'
import { VIDEO_UPDATE_RESET } from '../constants/videoConstants'

const VideoEditScreen = () => {
  const params = useParams()
  const videoId = params.id
  const navigate = useNavigate()

  const [videoTitle, setVideoTitle] = useState('')
  const [code, setCode] = useState('')

  /* All Videos Dropdown content*/
  const videoList = useSelector((state) => state.videoList)
  const { videos } = videoList

  const dispatch = useDispatch()

  const videoDetails = useSelector((state) => state.videoDetails)
  const { loading, error, video } = videoDetails

  const videoUpdate = useSelector((state) => state.videoUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = videoUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VIDEO_UPDATE_RESET })
      navigate('/admin/video')
    } else {
      if (!video.videoTitle || video._id !== videoId) {
        dispatch(listVideoDetails(videoId))
      } else {
        setVideoTitle(video.videoTitle)
        setCode(video.code)
      }
    }
  }, [dispatch, navigate, videoId, video, successUpdate, videos])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVideo({
        _id: videoId,
        videoTitle,
        code,
      })
    )
  }

  return (
    <>
      <Link to='/admin/video' className='btn btn-back my-3'>
        Zpět
      </Link>
      <FormContainer>
        <h1>YouTube Video</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='video-title'>
              <Form.Label>
                Název (Videa se zobrazí v abecedním resp. číselném pořadí)
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Název'
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='code' className='my-3'>
              <Form.Label>Link kód</Form.Label>

              <Form.Control
                type='text'
                placeholder='Link kód'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <p className='ytcode my-2'>
              (kód je třeba zkopírovat z url adresy youtube videa, je to 11 znaků
              mezi '=' a '&', viz příklad ze screenshotu níže)
            </p>

            <Button
              className='my-5 btn-blue rounded'
              type='submit'
              variant='primary'
            >
              Uložit
            </Button>
          </Form>
        )}
      </FormContainer>
      <Image
        src='/images/YTcode.png'
        alt='ytcode'
        className='ytcode-png'
        fluid
      />
    </>
  )
}

export default VideoEditScreen
