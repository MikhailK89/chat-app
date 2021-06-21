import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import fbConfig from './firebaseConfig'

class FirebaseManager {
  constructor() {
    firebase.initializeApp(fbConfig)
    this.database = firebase.database()
  }

  async registerUser(formData) {
    const {email, password} = formData
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  async authUser(formData) {
    const {email, password} = formData
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  getUserId() {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
  }

  addUser(userId, formData) {
    return this.database.ref('users/' + userId).set(formData)
      .then(() => {
        return {success: {message: 'USER_ADDED'}}
      })
      .catch(() => {
        return {error: {message: 'USER_NOT_ADDED'}}
      })
  }

  async getUser(userId) {
    const fbRes = await this.database.ref('users/' + userId).once('value')
    const userData = fbRes.val()

    return userData
  }

  async getUsers() {
    const fbRes = await this.database.ref('users').once('value')
    const usersData = fbRes.val()

    return usersData
  }

  async getUserMessages(userId) {
    const fbRes = await this.database.ref('messages/' + userId).once('value')
    const userMessages = fbRes.val()

    return userMessages
  }

  addMessage(userId, message) {
    return this.database.ref('messages/' + userId).push(message)
      .then(() => {
        return {success: {message: 'MESSAGE_SAVED'}}
      })
      .catch(() => {
        return {error: {message: 'MESSAGE_NOT_SAVED'}}
      })
  }

  addFriendId(userId, friendId) {
    return this.database.ref('users/' + userId + '/friendsIds')
      .transaction(friendsIds => {
        if (friendsIds) {
          return [...friendsIds, friendId]
        }
        return friendsIds
      })
      .then(() => {
        return {success: {message: 'CONTACT_ADDED'}}
      })
      .catch(() => {
        return {error: {message: 'CONTACT_NOT_ADDED'}}
      })
  }

  deleteFriendId(userId, friendId) {
    return this.database.ref('users/' + userId + '/friendsIds')
      .transaction(friendsIds => {
        if (friendsIds) {
          return friendsIds.filter(id => id !== friendId)
        }
        return friendsIds
      })
      .then(() => {
        return {success: {message: 'CONTACT_DELETED'}}
      })
      .catch(() => {
        return {error: {message: 'CONTACT_NOT_DELETED'}}
      })
  }
}

export default new FirebaseManager()
