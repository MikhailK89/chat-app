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

    if (fbRegRes.type === 'error') {
      return fbRegRes
    }

    const fbAuthRes = await fbManager.authUser({email, password})

    if (fbAuthRes.type === 'error') {
      return fbAuthRes
    }

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

      if (fbAddUserRes.type === 'error') {
        return fbAddUserRes
      }
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

    let savedError = null

    for (let i = 0; i < friendsIds.length; i++) {
      if (friendsIds[i] !== '') {
        const fbGetFriendRes = await fbManager.getUser(friendsIds[i])

        if (fbGetFriendRes.type === 'error') {
          savedError = fbGetFriendRes
          continue
        }

        friendsData.push(fbGetFriendRes.userData)
      }
    }

    const data = {userData: fbGetUserRes.userData, friendsData}

    return savedError ?
      {type: 'error', message: 'DB_USER_INFO_NOT_FOUND'} :
      {type: 'success', message: 'DB_USER_INFO_FOUND', ...data}
  }

  async getUserMessages(dataSend) {
    const {userId} = dataSend

    const fbRes = await fbManager.getUserMessages(userId)

    if (fbRes.type === 'error') {
      return fbRes
    }

    const {userMessages} = fbRes

    if (userMessages) {
      const filteredUserMessages = Object.keys(userMessages)
        .map(id => userMessages[id])

      return {...fbRes, userMessages: filteredUserMessages}
    } else {
      return {...fbRes, userMessages: []}
    }
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

    if (usersData) {
      const filteredUsersData = Object.keys(usersData)
        .map(id => usersData[id])
        .filter(user => {
          const regexp = /(\S+)\s+(\S+)/
          const userNameArr = user.userName.toLowerCase().match(regexp)

          const filterCond = user.id !== userId && !friendsIds.includes(user.id) &&
            (userNameArr[1].startsWith(filterText) || userNameArr[2].startsWith(filterText))

          return filterCond
        })

      return {...fbGetUsersRes, usersData: filteredUsersData}
    } else {
      return {...fbGetUsersRes, usersData: []}
    }
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

      return {
        type: 'success',
        message: 'SERVER_CONTACT_STATUS_SUCCESS',
        ...dataReceive
      }
    } catch (e) {
      return {type: 'error', message: 'SERVER_CONTACT_STATUS_ERROR'}
    }
  }

  async sendProfileInfo(formData) {
    try {
      const serverRes = await fetch(`${domain}/user/profile`, {
        method: 'POST',
        body: formData
      })

      const data = await serverRes.json()
    } catch (e) {}
  }
}

export default new DatabaseManager()
