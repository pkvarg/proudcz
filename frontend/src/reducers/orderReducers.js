import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_RESET,
  ORDER_CONFIRMATION_EMAIL_REQUEST,
  ORDER_CONFIRMATION_EMAIL_SUCCESS,
  ORDER_CONFIRMATION_EMAIL_FAIL,
  ORDER_CONFIRMATION_EMAIL_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCELL_REQUEST,
  ORDER_CANCELL_SUCCESS,
  ORDER_CANCELL_FAIL,
  ORDER_CANCELL_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAID_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAID_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAID_RESET:
      return {}
    default:
      return state
  }
}

export const confirmationEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRMATION_EMAIL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CONFIRMATION_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_CONFIRMATION_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CONFIRMATION_EMAIL_RESET:
      return {}
    default:
      return state
  }
}

export const orderCancellReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCELL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CANCELL_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_CANCELL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CANCELL_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }

    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// DELETE ORDER
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
