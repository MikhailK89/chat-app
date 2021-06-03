import {TOKEN_INFO} from './actionTypes'

export const saveTokenInfo = tokenInfo => {
  return {
    type: TOKEN_INFO,
    payload: tokenInfo
  }
}
