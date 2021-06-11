import * as actionTypes from '../actionTypes'

const initialState = {
  selectedFriend: null,
  filterContactsText: '',
  menuIsActivated: false,
  friendsModalIsOpened: false,
  friendsListOperation: ''
}

export default function chatPageState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: {...action.payload}
      }
    case actionTypes.FILTER_CONTACTS:
      return {
        ...state,
        filterContactsText: action.payload
      }
    case actionTypes.TOGGLE_MENU:
      return {
        ...state,
        menuIsActivated: action.payload
      }
    case actionTypes.FRIENDS_MODAL:
      return {
        ...state,
        friendsModalIsOpened: action.payload
      }
    case actionTypes.FRIENDS_UPDATE:
      return {
        ...state,
        friendsListOperation: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
