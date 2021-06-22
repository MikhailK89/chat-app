function createHandleClients(clients) {
  return client => {

    client.on('message', async (message) => {
      message = JSON.parse(message)

      if (message.type === '__INIT__') {
        clients[message.userId] = client
        client.send(JSON.stringify(message))
      }

      if (message.type === '__COMMON__') {
        Object.keys(clients).forEach(id => {
          if (id === message.from || id === message.to) {
            clients[id].send(JSON.stringify(message))
          }
        })
      }

      if (message.type === '__UPDATE__') {
        const {operation} = message

        if (clients.hasOwnProperty(operation.friendId)) {
          clients[operation.friendId].send(JSON.stringify({
            type: '__UPDATE__',
            operation: {
              ...operation,
              status: 'get',
              userId: operation.friendId,
              friendId: operation.userId
            }
          }))
        }
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

module.exports = createHandleClients
