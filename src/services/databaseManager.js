import fbManager from './firebaseManager'
import {domain} from '../settings/fetchSettings'

class DatabaseManager {
  async authUser(formData) {
    const {email, password} = formData
    let userId = fbManager.getUserId()

    if (!userId) {
      const fbAuthRes = await fbManager.authUser({email, password})
      userId = fbManager.getUserId()
    }

    return {localId: userId}
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

    return {}
  }

  async getUserInfo(dataSend) {
    const {userId} = dataSend

    const userData = await fbManager.getUser(userId)
    const friendsData = []
    const friendsIds = userData.friendsIds

    for (let i = 0; i < friendsIds.length; i++) {
      if (friendsIds[i] !== '') {
        const friendData = await fbManager.getUser(friendsIds[i])
        friendsData.push(friendData)
      }
    }

    return {userData, friendsData}
  }

  async getUserMessages(dataSend) {
    const {userId} = dataSend

    const fbRes = await fbManager.getUserMessages(userId)
    let userMessages = []

    if (fbRes) {
      userMessages = Object.keys(fbRes).map(messageId => fbRes[messageId])
    }

    return userMessages
  }

  async sendMessage(userId, friendId, message) {
    const fbUserRes = await fbManager.addMessage(userId, message)
    const fbFriendRes = await fbManager.addMessage(friendId, message)
    return {}
  }

  async getFriendsList(dataSend) {
    const {userId} = dataSend
    const filterText = dataSend.filterText.toLowerCase()

    const userData = await fbManager.getUser(userId)
    const friendsIds = userData.friendsIds

    const fbUsers = await fbManager.getUsers()
    const usersData = Object.keys(fbUsers).map(uid => fbUsers[uid])

    const friendsList = usersData.filter(user => {
      const regexp = /(\S+)\s+(\S+)/
      const userNameArr = user.userName.toLowerCase().match(regexp)

      const filterCond = user.id !== userId && !friendsIds.includes(user.id) &&
        (userNameArr[1].startsWith(filterText) || userNameArr[2].startsWith(filterText))

      return filterCond
    })

    return friendsList
  }

  async addFriend(dataSend) {
    const {userId, friendId} = dataSend
    const fbUserRes = await fbManager.addFriendId(userId, friendId)
    const fbFriendRes = await fbManager.addFriendId(friendId, userId)

    return {}
  }

  async deleteFriend(dataSend) {
    const {userId, friendId} = dataSend
    const fbUserRes = await fbManager.deleteFriendId(userId, friendId)
    const fbFriendRes = await fbManager.deleteFriendId(friendId, userId)

    return {}
  }

  async getOnlineStatus(dataSend) {
    const res = await fetch(`${domain}/user/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataSend)
    })

    const dataReceive = await res.json()

    return dataReceive
  }
}

export default new DatabaseManager()
