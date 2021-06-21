import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import fbConfig from './firebaseConfig'

class FirebaseManager {
  constructor() {
    firebase.initializeApp(fbConfig)
    this.database = firebase.database()
  }

  registerUser(formData) {
    try {
      const {email, password} = formData
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          return {
            type: 'success',
            message: 'REGISTER_SUCCESS',
            userCredential
          }
        })
        .catch(() => {
          return {type: 'error', message: 'REGISTER_EMAIL_EXISTS'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  authUser(formData) {
    try {
      const {email, password} = formData
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          return {
            type: 'success',
            message: 'AUTH_SUCCESS',
            userCredential
          }
        })
        .catch(() => {
          return {type: 'error', message: 'AUTH_EMAIL_NOT_FOUND'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  getUserId() {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
  }

  addUser(userId, formData) {
    try {
      return this.database.ref('users/' + userId).set(formData)
        .then(() => {
          return {type: 'success', message: 'DB_USER_ADDED'}
        })
        .catch(() => {
          return {type: 'error', message: 'DB_USER_NOT_ADDED'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  getUser(userId) {
    try {
      return this.database.ref('users/' + userId).once('value')
        .then(fbRes => {
          return {
            type: 'success',
            message: 'DB_USER_FOUND',
            userData: fbRes.val()
          }
        })
        .catch(() => {
          return {type: 'error', message: 'DB_USER_NOT_FOUND'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  getUsers() {
    try {
      return this.database.ref('users').once('value')
        .then(fbRes => {
          return {
            type: 'success',
            message: 'DB_USERS_FOUND',
            usersData: fbRes.val()
          }
        })
        .catch(() => {
          return {type: 'error', message: 'DB_USERS_NOT_FOUND'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  getUserMessages(userId) {
    try {
      return this.database.ref('messages/' + userId).once('value')
        .then(fbRes => {
          return {
            type: 'success',
            message: 'DB_MESSAGES_FOUND',
            userMessages: fbRes.val()
          }
        })
        .catch(() => {
          return {type: 'error', message: 'DB_MESSAGES_NOT_FOUND'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  addMessage(userId, message) {
    try {
      return this.database.ref('messages/' + userId).push(message)
        .then(() => {
          return {type: 'success', message: 'DB_MESSAGE_SAVED'}
        })
        .catch(() => {
          return {type: 'error', message: 'DB_MESSAGE_NOT_SAVED'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  addFriendId(userId, friendId) {
    try {
      return this.database.ref('users/' + userId + '/friendsIds')
        .transaction(friendsIds => {
          if (friendsIds) {
            return [...friendsIds, friendId]
          }
          return friendsIds
        })
        .then(() => {
          return {type: 'success', message: 'DB_CONTACT_ADDED'}
        })
        .catch(() => {
          return {type: 'error', message: 'DB_CONTACT_NOT_ADDED'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }

  deleteFriendId(userId, friendId) {
    try {
      return this.database.ref('users/' + userId + '/friendsIds')
        .transaction(friendsIds => {
          if (friendsIds) {
            return friendsIds.filter(id => id !== friendId)
          }
          return friendsIds
        })
        .then(() => {
          return {type: 'success', message: 'DB_CONTACT_DELETED'}
        })
        .catch(() => {
          return {type: 'error', message: 'DB_CONTACT_NOT_DELETED'}
        })
    } catch (e) {
      return {type: 'error', message: 'FIREBASE_NOT_CONNECTED'}
    }
  }
}

export default new FirebaseManager()
