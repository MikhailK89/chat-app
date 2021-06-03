const express = require('express')
const cors = require('cors')
const app = express()

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

  const tokenInfo = findUser ? tokenGenerator.createToken(findUser.id) : null

  res.json(tokenInfo)
})

app.post('/users/:id', (req, res) => {
  const id = +req.params.id
  const token = req.body.token

  if (!tokenGenerator.tokenIsValid(id, token)) {
    res.status(404).send('Try auth again')
  }

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
