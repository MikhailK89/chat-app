import fbManager from './firebaseManager'
import {domain} from '../settings/fetchSettings'

class DatabaseManager {
  async authUser(formData) {
    const {email, password} = formData

    const fbAuthRes = await fbManager.authUser({email, password})
    const userId = fbManager.getUserId()

    return {...fbAuthRes, userId}
  }

  async registerUser(formData) {
    const {name, email, password} = formData

    const fbRegRes = await fbManager.registerUser({email, password})
    const fbAuthRes = await fbManager.authUser({email, password})

    const userId = fbManager.getUserId()

    if (userId) {
      const fbAddUserRes = await fbManager.addUser(userId, {
        id: userId,
        userName: name,
        profileImage: '',
        friendsIds: [''],
        email,
        password
      })
    }

    return fbRegRes
  }

  async getUserInfo(dataSend) {
    const {userId} = dataSend

    const fbGetUserRes = await fbManager.getUser(userId)

    if (fbGetUserRes.type === 'error') {
      return fbGetUserRes
    }

    const friendsData = []
    const friendsIds = fbGetUserRes.userData.friendsIds

    let saveError = null

    for (let i = 0; i < friendsIds.length; i++) {
      if (friendsIds[i] !== '') {
        const fbGetFriendRes = await fbManager.getUser(friendsIds[i])

        if (fbGetFriendRes.type === 'error') {
          saveError = fbGetFriendRes
          continue
        }

        friendsData.push(fbGetFriendRes.userData)
      }
    }

    const clientRes = {userData: fbGetUserRes.userData, friendsData}

    return saveError ? {...saveError, ...clientRes} : clientRes
  }

  async getUserMessages(dataSend) {
    const {userId} = dataSend

    const fbRes = await fbManager.getUserMessages(userId)

    if (fbRes.type === 'error') {
      return fbRes
    }

    const {userMessages} = fbRes

    return userMessages ? Object.keys(userMessages).map(id => userMessages[id]) : []
  }

  async sendMessage(userId, friendId, message) {
    const fbUserRes = await fbManager.addMessage(userId, message)

    if (fbUserRes.type === 'error') {
      return fbUserRes
    }

    const fbFriendRes = await fbManager.addMessage(friendId, message)

    if (fbFriendRes.type === 'error') {
      return fbFriendRes
    }

    return fbFriendRes
  }

  async getFriendsList(dataSend) {
    const {userId} = dataSend
    const filterText = dataSend.filterText.toLowerCase()

    const fbGetUserRes = await fbManager.getUser(userId)

    if (fbGetUserRes.type === 'error') {
      return fbGetUserRes
    }

    const friendsIds = fbGetUserRes.userData.friendsIds

    const fbGetUsersRes = await fbManager.getUsers()

    if (fbGetUsersRes.type === 'error') {
      return fbGetUsersRes
    }

    const {usersData} = fbGetUsersRes

    return usersData ? Object.keys(usersData)
      .map(id => usersData[id])
      .filter(user => {
        const regexp = /(\S+)\s+(\S+)/
        const userNameArr = user.userName.toLowerCase().match(regexp)

        const filterCond = user.id !== userId && !friendsIds.includes(user.id) &&
          (userNameArr[1].startsWith(filterText) || userNameArr[2].startsWith(filterText))

        return filterCond
      }) : []
  }

  async addFriend(dataSend) {
    const {userId, friendId} = dataSend

    const fbUserRes = await fbManager.addFriendId(userId, friendId)

    if (fbUserRes.type === 'error') {
      return fbUserRes
    }

    const fbFriendRes = await fbManager.addFriendId(friendId, userId)

    if (fbFriendRes.type === 'error') {
      return fbFriendRes
    }

    return fbFriendRes
  }

  async deleteFriend(dataSend) {
    const {userId, friendId} = dataSend

    const fbUserRes = await fbManager.deleteFriendId(userId, friendId)

    if (fbUserRes.type === 'error') {
      return fbUserRes
    }

    const fbFriendRes = await fbManager.deleteFriendId(friendId, userId)

    if (fbFriendRes.type === 'error') {
      return fbFriendRes
    }

    return fbFriendRes
  }

  async getOnlineStatus(dataSend) {
    try {
      const res = await fetch(`${domain}/user/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataSend)
      })

      const dataReceive = await res.json()

      return dataReceive
    } catch (e) {
      return {type: 'error', message: 'SERVER_ERROR'}
    }
  }
}

export default new DatabaseManager()
