import axios from 'axios'
import {
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
  VIDEO_DELETE_FAIL,
  VIDEO_DELETE_SUCCESS,
  VIDEO_DELETE_REQUEST,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_FAIL,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
  VIDEO_UPDATE_FAIL,
} from '../constants/videoConstants'

export const listVideo =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: VIDEO_LIST_REQUEST })
      const { data } = await axios.get(
        `/api/video?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: VIDEO_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: VIDEO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listVideoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/video/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'cache-control': 'no-cache',
      },
    })

    dispatch({
      type: VIDEO_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VIDEO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteVideo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIDEO_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/video/${id}`, config)

    dispatch({
      type: VIDEO_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: VIDEO_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createVideo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIDEO_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/video`, {}, config)

    dispatch({
      type: VIDEO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: VIDEO_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateVideo = (video) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIDEO_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/video/${video._id}`, video, config)

    dispatch({
      type: VIDEO_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: VIDEO_UPDATE_FAIL,
      payload: message,
    })
  }
}
