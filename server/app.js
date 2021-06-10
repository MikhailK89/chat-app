const express = require('express')
const cors = require('cors')
const app = express()

const WebSocket = require('ws')
const myWs = new WebSocket.Server({noServer: true})
const clients = {}
let handleClients = null

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = require('./data/users')
const messages = require('./data/messages')
const tokenGenerator = require('./tokenGenerator')

app.post('/auth', (req, res) => {
  const {email, password} = req.body

  const findUser = users.find(user => {
    return user.email === email && user.password === password
  })

  if (findUser) {
    const findToken = tokenGenerator.findToken(findUser.id)
    const tokenInfo = findToken || tokenGenerator.createToken(findUser.id)

    res.json(tokenInfo)
  } else {
    res.json(null)
  }
})

app.post('/users/:id', (req, res) => {
  const id = +req.params.id
  const token = req.body.token

  if (tokenGenerator.tokenIsValid(id, token)) {
    const findUser = users.find(user => user.id === id)

    const findFriends = findUser.friendsIds.map(id => {
      return users.find(user => user.id === id)
    })

    res.json({findUser, findFriends})
  } else {
    res.status(404).send('Try auth again')
  }
})

app.post('/messages/:id', (req, res) => {
  const id = +req.params.id
  const token = req.body.token

  if (tokenGenerator.tokenIsValid(id, token)) {
    const findMessages = messages.find(item => item.id === id).messages

    res.json(findMessages)
  } else {
    res.status(404).send('Try auth again')
  }
})

app.get('/messages/live', (req, res) => {
  if (!handleClients) {
    handleClients = client => {
      client.on('message', message => {
        message = JSON.parse(message)

        switch (message.type) {
          case '__INIT__':
            clients[message.id.toString()] = client
            client.send(JSON.stringify({type: '__RECEIVED__'}))
            break
          case '__COMMON__':
            const messageFromItem = messages.find(item => item.id === message.from)
            const messageToItem = messages.find(item => item.id === message.to)

            if (messageFromItem) {
              messageFromItem.messages.push({...message})
            } else {
              messages.push({
                id: message.from,
                messages: [{...message}]
              })
            }

            if (messageToItem) {
              messageToItem.messages.push({...message})
            } else {
              messages.push({
                id: message.to,
                messages: [{...message}]
              })
            }

            Object.keys(clients).forEach(id => {
              if (id === message.from.toString() || id === message.to.toString()) {
                clients[id].send(JSON.stringify({type: '__RECEIVED__'}))
              }
            })

            break
        }
      })

      client.on('close', () => {
        Object.keys(clients).forEach(id => {
          if (clients[id] === client) {
            delete clients[id]
          }
        })
      })
    }
  }

  myWs.handleUpgrade(req, req.socket, Buffer.alloc(0), handleClients)
})

app.post('/friends', (req, res) => {
  const filterText = req.body.filterText.toLowerCase()
  const currentUserId = req.body.id
  const currentUser = users.find(user => user.id === currentUserId)
  const currentFriendsIds = currentUser.friendsIds

  const friendsList = users.filter(user => {
    const userName = user.userName.toLowerCase()

    const regexp = /(\S+)\s+(\S+)/
    const userNameArr = userName.match(regexp)

    const filterCond = !currentFriendsIds.includes(user.id) &&
      (userNameArr[1].startsWith(filterText) || userNameArr[2].startsWith(filterText))

    return filterCond
  })

  res.json(friendsList)
})

app.listen(4200)
