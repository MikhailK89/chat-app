import {SELECT_FRIEND, FILTER_CONTACTS, TOGGLE_MENU} from '../actionTypes'

const initialState = {
  selectedFriend: null,
  filterContactsText: '',
  menuIsActivated: false
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
    case TOGGLE_MENU:
      return {
        ...state,
        menuIsActivated: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
