import {SELECT_FRIEND} from '../actionTypes'

const initialState = {
  selectedFriend: null
}

export default function chatPageState(state = initialState, action) {
  switch (action.type) {
    case SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: {...action.payload}
      }
    default:
      return {
        ...state
      }
  }
}
