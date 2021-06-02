const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const users = require('./data/users')
const messages = require('./data/messages')

app.get('/users/:id', (req, res) => {
  const id = +req.params.id

  const findUser = users.find(user => user.id === id)

  const findFriends = findUser.friendsIds.map(id => {
    return users.find(user => user.id === id)
  })

  res.json({findUser, findFriends})
})

app.get('/messages/:id', (req, res) => {
  const id = +req.params.id

  const findMessages = messages.find(item => item.id === id).messages

  res.json(findMessages)
})

app.listen(4200)
