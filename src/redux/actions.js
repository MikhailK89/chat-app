import {SELECT_FRIEND, FILTER_CONTACTS, TOGGLE_MENU, FRIENDS_MODAL} from './actionTypes'

export const selectFriend = friend => {
  return {
    type: SELECT_FRIEND,
    payload: friend
  }
}

export const filterContacts = text => {
  return {
    type: FILTER_CONTACTS,
    payload: text
  }
}

export const toggleMenu = isActivated => {
  return {
    type: TOGGLE_MENU,
    payload: isActivated
  }
}

export const openFriendsModal = isOpened => {
  return {
    type: FRIENDS_MODAL,
    payload: isOpened
  }
}
