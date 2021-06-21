const express = require('express')
const cors = require('cors')
const app = express()

const WebSocket = require('ws')
const myWs = new WebSocket.Server({noServer: true})
const clients = {}
const createHandleClients = require('./services/handleClients')
const handleClients = createHandleClients(clients)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/user/status', (req, res) => {
  const {friendId} = req.body

  if (clients.hasOwnProperty(friendId)) {
    res.json({status: 'online'})
  } else {
    res.json({status: 'offline'})
  }
})

app.get('/messages', (req, res) => {
  myWs.handleUpgrade(req, req.socket, Buffer.alloc(0), handleClients)
})

app.listen(4200)
