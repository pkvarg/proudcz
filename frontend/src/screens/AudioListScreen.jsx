import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as Icon from 'react-bootstrap-icons'

import { listAudio, deleteAudio, createAudio } from '../actions/audioActions'
import { useNavigate } from 'react-router-dom'
import { AUDIO_CREATE_RESET } from '../constants/audioConstants'

const AudioListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const audioList = useSelector((state) => state.audioList)

  console.log('audioList', audioList)
  const { loading, error, audios } = audioList

  const audioDelete = useSelector((state) => state.audioDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = audioDelete

  const audioCreate = useSelector((state) => state.audioCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    audio: createdAudio,
  } = audioCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: AUDIO_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/audio/${createdAudio._id}/edit`)
    } else {
      dispatch(listAudio('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdAudio,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAudio(id))
    }
  }

  const createAudioHandler = () => {
    dispatch(createAudio())
  }

  return (
    <>
      <Row className='align-items-center no-mobile'>
        <Col>
          <h1>Audio súbory</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 btn-red' onClick={createAudioHandler}>
            <Icon.Plus size={25} />
            Přidat audio súbor
          </Button>
        </Col>
      </Row>
      <Row className='align-items-center mobile-only'>
        <Col>
          <h1>Audio</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 btn-red' onClick={createAudioHandler}>
            <Icon.Plus size={25} /> Přidat audio súbor
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
                <th>NÁZOV</th>
                <th>SÚBOR</th>
                <th>KATEGÓRIA</th>
              </tr>
            </thead>
            <tbody>
              {audios.map((audio) => (
                <tr key={audio._id}>
                  <td>{audio.audioTitle}</td>
                  <td>{audio.mp3file}</td>
                  <td>{audio.category}</td>

                  <td>
                    <LinkContainer to={`/admin/audio/${audio._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <Icon.PencilFill />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(audio._id)}
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

export default AudioListScreen
