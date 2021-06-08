import {SELECT_FRIEND, FILTER_CONTACTS} from './actionTypes'

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
