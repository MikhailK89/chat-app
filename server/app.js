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

let maxId = users.reduce((max, cur) => cur.id > max ? cur.id : max, 0)

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

app.post('/register', (req, res) => {
  const {name, email, password} = req.body

  const findUser = users.find(user => {
    return user.email === email
  })

  if (findUser) {
    res.json({message: 'Пользователь с таким email уже есть'})
  } else {
    const genId = ++maxId

    users.push({
      id: genId,
      userName: name,
      friendsIds: [],
      email,
      password
    })

    messages.push({
      id: genId,
      messages: []
    })

    res.json({message: 'Регистрация прошла успешно!'})
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
    res.status(404).send('Произошла ошибка. Попробуйте войти в систему заново')
  }
})

app.post('/messages/:id', (req, res) => {
  const id = +req.params.id
  const token = req.body.token

  if (tokenGenerator.tokenIsValid(id, token)) {
    const findMessages = messages.find(item => item.id === id).messages

    res.json(findMessages)
  } else {
    res.status(404).send('Произошла ошибка. Попробуйте войти в систему заново')
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
  const token = req.body.tokenInfo.token

  if (tokenGenerator.tokenIsValid(currentUserId, token)) {
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
  } else {
    res.status(404).send('Произошла ошибка. Попробуйте войти в систему заново')
  }
})

app.post('/friends/add', (req, res) => {
  const {userId, friendId} = req.body
  const token = req.body.tokenInfo.token

  if (tokenGenerator.tokenIsValid(userId, token)) {
    const user = users.find(user => user.id === userId)

    if (!user.friendsIds.includes(friendId)) {
      user.friendsIds.push(friendId)
    }

    res.json({message: 'Добавлен новый контакт'})
  } else {
    res.status(404).send('Произошла ошибка. Попробуйте войти в систему заново')
  }
})

app.delete('/friends/delete', (req, res) => {
  const {userId, friendId} = req.body
  const token = req.body.tokenInfo.token

  if (tokenGenerator.tokenIsValid(userId, token)) {
    const user = users.find(user => user.id === userId)

    if (user.friendsIds.includes(friendId)) {
      user.friendsIds = user.friendsIds.filter(id => id !== friendId)
    }

    res.json({message: 'Данный контакт удалён'})
  } else {
    res.status(404).send('Произошла ошибка. Попробуйте войти в систему заново')
  }
})

app.listen(4200)
