const express = require('express')
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const app = express()

const WebSocket = require('ws')
const myWs = new WebSocket.Server({noServer: true})
const clients = {}
const createHandleClients = require('./services/handleClients')
const handleClients = createHandleClients(clients)

const storage = multer.diskStorage({
  destination: 'profiles/images',
  filename: (req, file, cb) => {
    const {userId} = req.body

    let filename = ''

    switch (file.mimetype) {
      case 'image/png':
        filename = `${userId}.png`
        break
      case 'image/jpg':
        filename = `${userId}.jpg`
        break
      case 'image/jpeg':
        filename = `${userId}.jpeg`
        break
      default:
        filename = file.originalname
    }

    cb(null, filename)
  }
})

const upload = multer({storage})

app.use(express.static(__dirname))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/user/profile', upload.single('filedata'), (req, res) => {
  const filedata = req.file

  if (filedata) {
    res.json({
      type: 'success',
      message: 'SERVER_PROFILE_IMAGE_SUCCESS',
      profileImage: filedata.filename
    })
  } else {
    res.json({type: 'error', message: 'SERVER_PROFILE_IMAGE_ERROR'})
  }
})

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
