import axios from 'axios'
import {
  AUDIO_LIST_REQUEST,
  AUDIO_LIST_SUCCESS,
  AUDIO_LIST_FAIL,
  AUDIO_DETAILS_REQUEST,
  AUDIO_DETAILS_SUCCESS,
  AUDIO_DETAILS_FAIL,
  AUDIO_DELETE_FAIL,
  AUDIO_DELETE_SUCCESS,
  AUDIO_DELETE_REQUEST,
  AUDIO_CREATE_REQUEST,
  AUDIO_CREATE_SUCCESS,
  AUDIO_CREATE_FAIL,
  AUDIO_UPDATE_REQUEST,
  AUDIO_UPDATE_SUCCESS,
  AUDIO_UPDATE_FAIL,
} from '../constants/audioConstants'

export const listAudio =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: AUDIO_LIST_REQUEST })
      const { data } = await axios.get(
        `/api/audio?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: AUDIO_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AUDIO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listAudioDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUDIO_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/audio/${id}`)

    dispatch({
      type: AUDIO_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUDIO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAudio = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDIO_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/audio/${id}`, config)

    dispatch({
      type: AUDIO_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: AUDIO_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createAudio = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDIO_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/audio`, {}, config)

    dispatch({
      type: AUDIO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: AUDIO_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateAudio = (audio) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDIO_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/audio/${audio._id}`, audio, config)

    dispatch({
      type: AUDIO_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: AUDIO_UPDATE_FAIL,
      payload: message,
    })
  }
}
