import * as actionTypes from './actionTypes'

export const selectFriend = friend => {
  return {
    type: actionTypes.SELECT_FRIEND,
    payload: friend
  }
}

export const filterContacts = text => {
  return {
    type: actionTypes.FILTER_CONTACTS,
    payload: text
  }
}

export const toggleMenu = isActivated => {
  return {
    type: actionTypes.TOGGLE_MENU,
    payload: isActivated
  }
}

export const openFriendsModal = isOpened => {
  return {
    type: actionTypes.FRIENDS_MODAL,
    payload: isOpened
  }
}

export const updateFriendsList = operation => {
  return {
    type: actionTypes.FRIENDS_UPDATE,
    payload: {operation}
  }
}

export const openContactsAdd = isOpened => {
  return {
    type: actionTypes.CONTACTS_ADD,
    payload: isOpened
  }
}

export const openContactsDelete = isOpened => {
  return {
    type: actionTypes.CONTACTS_DELETE,
    payload: isOpened
  }
}

export const showAlertMessage = messageInfo => {
  return {
    type: actionTypes.ALERT_MESSAGE,
    payload: messageInfo
  }
}
