import {domain} from '../settings/fetchSettings'

class DatabaseManager {
  async getFriendsList(dataSend) {
    const res = await fetch(`${domain}/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataSend)
    })

    const dataReceive = await res.json()

    return dataReceive
  }

  async addFriend(dataSend) {
    const res = await fetch(`${domain}/friends/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataSend)
    })

    const dataReceive = await res.json()

    return dataReceive
  }

  async deleteFriend(dataSend) {
    const res = await fetch(`${domain}/friends/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataSend)
    })

    const dataReceive = await res.json()

    return dataReceive
  }

  async getUserInfo(dataSend) {
    const {userId, tokenInfo} = dataSend

    const res = await fetch(`${domain}/users/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: tokenInfo.token})
    })

    const dataReceive = await res.json()

    return dataReceive
  }

  async getUserMessages(dataSend) {
    const {userId, tokenInfo} = dataSend

    const res = await fetch(`${domain}/messages/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: tokenInfo.token})
    })

    const dataReceive = await res.json()

    return dataReceive
  }
}

export default new DatabaseManager()
