import {
  AUDIO_LIST_REQUEST,
  AUDIO_LIST_SUCCESS,
  AUDIO_LIST_FAIL,
  AUDIO_DETAILS_REQUEST,
  AUDIO_DETAILS_SUCCESS,
  AUDIO_DETAILS_FAIL,
  AUDIO_DELETE_REQUEST,
  AUDIO_DELETE_SUCCESS,
  AUDIO_DELETE_FAIL,
  AUDIO_CREATE_REQUEST,
  AUDIO_CREATE_SUCCESS,
  AUDIO_CREATE_FAIL,
  AUDIO_CREATE_RESET,
  AUDIO_UPDATE_REQUEST,
  AUDIO_UPDATE_SUCCESS,
  AUDIO_UPDATE_FAIL,
  AUDIO_UPDATE_RESET,
} from '../constants/audioConstants'

export const audioListReducer = (state = { audios: [] }, action) => {
  switch (action.type) {
    case AUDIO_LIST_REQUEST:
      return { loading: true, audios: [] }
    case AUDIO_LIST_SUCCESS:
      return {
        loading: false,
        audios: action.payload.audios,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case AUDIO_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const audioDetailsReducer = (state = { audio: {} }, action) => {
  switch (action.type) {
    case AUDIO_DETAILS_REQUEST:
      return { loading: true, ...state }
    case AUDIO_DETAILS_SUCCESS:
      return { loading: false, audio: action.payload }
    case AUDIO_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const audioDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUDIO_DELETE_REQUEST:
      return { loading: true }
    case AUDIO_DELETE_SUCCESS:
      return { loading: false, success: true }
    case AUDIO_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const audioCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUDIO_CREATE_REQUEST:
      return { loading: true }
    case AUDIO_CREATE_SUCCESS:
      return { loading: false, success: true, audio: action.payload }
    case AUDIO_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case AUDIO_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const audioUpdateReducer = (state = { audio: {} }, action) => {
  switch (action.type) {
    case AUDIO_UPDATE_REQUEST:
      return { loading: true }
    case AUDIO_UPDATE_SUCCESS:
      return { loading: false, success: true, audio: action.payload }
    case AUDIO_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case AUDIO_UPDATE_RESET:
      return { audio: {} }
    default:
      return state
  }
}
