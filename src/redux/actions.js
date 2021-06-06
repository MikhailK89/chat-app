import {SELECT_FRIEND} from './actionTypes'

export const selectFriend = friend => {
  return {
    type: SELECT_FRIEND,
    payload: friend
  }
}
