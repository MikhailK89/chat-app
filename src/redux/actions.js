import {SELECT_FRIEND, FILTER_CONTACTS, TOGGLE_MENU} from './actionTypes'

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
