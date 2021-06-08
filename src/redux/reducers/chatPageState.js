import {SELECT_FRIEND, FILTER_CONTACTS} from '../actionTypes'

const initialState = {
  selectedFriend: null,
  filterContactsText: ''
}

export default function chatPageState(state = initialState, action) {
  switch (action.type) {
    case SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: {...action.payload}
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filterContactsText: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
