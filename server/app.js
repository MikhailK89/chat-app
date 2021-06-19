const express = require('express')
const cors = require('cors')
const app = express()

const fbManager = require('./database/firebaseManager')

const WebSocket = require('ws')
const myWs = new WebSocket.Server({noServer: true})
const clients = {}
const createHandleClients = require('./services/handleClients')
const handleClients = createHandleClients(clients, fbManager)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/auth', async (req, res) => {
  const {email, password} = req.body

  const fbRes = await fbManager.authUser({email, password})
  res.json(fbRes)
})

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  const regRes = await fbManager.registerUser({email, password})

  if (!regRes.hasOwnProperty('error')) {
    const userId = regRes.localId
    const addUserRes = await fbManager.addUser(userId, {
      id: userId,
      userName: name,
      profileImage: '',
      friendsIds: [''],
      email,
      password
    })
  }

  res.json(regRes)
})

app.post('/user/info', async (req, res) => {
  const {userId} = req.body

  const userData = await fbManager.getUser(userId)
  const friendsData = []
  const friendsIds = userData.friendsIds

  for (let i = 0; i < friendsIds.length; i++) {
    if (friendsIds[i] !== '') {
      const friendData = await fbManager.getUser(friendsIds[i])
      friendsData.push(friendData)
    }
  }

  res.json({userData, friendsData})
})

app.post('/user/messages', async (req, res) => {
  const {userId} = req.body

  const fbRes = await fbManager.getUserMessages(userId)
  let userMessages = []

  if (fbRes) {
    userMessages = Object.keys(fbRes).map(messageId => fbRes[messageId])
  }

  res.json(userMessages)
})

app.get('/messages', (req, res) => {
  myWs.handleUpgrade(req, req.socket, Buffer.alloc(0), handleClients)
})

app.post('/friends/search', async (req, res) => {
  const {userId} = req.body
  const filterText = req.body.filterText.toLowerCase()

  const userData = await fbManager.getUser(userId)
  const friendsIds = userData.friendsIds

  const fbUsers = await fbManager.getUsers()
  const usersData = Object.keys(fbUsers).map(id => fbUsers[id])

  const friendsList = usersData.filter(user => {
    const regexp = /(\S+)\s+(\S+)/
    const userNameArr = user.userName.toLowerCase().match(regexp)

    const filterCond = !friendsIds.includes(user.id) &&
      (userNameArr[1].startsWith(filterText) || userNameArr[2].startsWith(filterText))

    return filterCond
  })

  res.json(friendsList)
})

app.post('/friends/add', async (req, res) => {
  const {userId, friendId} = req.body
  const fbRes = await fbManager.addFriendId(userId, friendId)
  res.json(fbRes)
})

app.delete('/friends/delete', async (req, res) => {
  const {userId, friendId} = req.body
  const fbRes = await fbManager.deleteFriendId(userId, friendId)
  res.json(fbRes)
})

app.listen(4200)
