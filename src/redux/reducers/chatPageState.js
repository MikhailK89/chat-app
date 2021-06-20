import * as actionTypes from '../actionTypes'

const initialState = {
  selectedFriend: null,
  filterContactsText: '',
  menuIsActivated: false,
  friendsModalIsOpened: false,
  friendsListOperation: null,
  contactsAddModal: false,
  contactsDeleteModal: false,
  alertMessage: null
}

export default function chatPageState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: action.payload ? {...action.payload} : null
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
        friendsListOperation: {...action.payload}
      }
    case actionTypes.CONTACTS_ADD:
      return {
        ...state,
        contactsAddModal: action.payload
      }
    case actionTypes.CONTACTS_DELETE:
      return {
        ...state,
        contactsDeleteModal: action.payload
      }
    case actionTypes.ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload ? {...action.payload} : null
      }
    default:
      return {
        ...state
      }
  }
}
