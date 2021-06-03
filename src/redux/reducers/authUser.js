import {TOKEN_INFO} from '../actionTypes'

const initialState = {
  tokenInfo: null
}

export default function authUser(state = initialState, action) {
  switch (action.type) {
    case TOKEN_INFO:
      return {
        ...state,
        tokenInfo: {...action.payload}
      }
    default:
      return {
        ...state
      }
  }
}
