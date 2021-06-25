import './mainStyles.scss'

import {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'
import * as helperFuncs from '../../shared/helperFuncs'
import {wsDomain} from '../../settings/fetchSettings'
import dbManager from '../../services/databaseManager'
import dbMessages from '../../services/messagesTypes'

import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'

function Main(props) {
  const {user, friends} = props
  const {
    selectedFriend,
    profileOperation,
    friendsListOperation,
    activateAlertMessage
  } = props

  const messagesCont = useRef(null)

  const [userMessages, setUserMessages] = useState(null)
  const [webSocket, setWebSocket] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  const scrollDownMessages = () => {
    const contElem = messagesCont.current
    contElem.scrollTop = contElem.scrollHeight - contElem.clientHeight
  }

  const resetFriendSelection = () => {
    if (friends.length > 0 && !selectedFriend) {
      props.selectFriend(friends[0])
      return
    }

    if (friends.length === 0 && selectedFriend) {
      props.selectFriend(null)
      return
    }

    if (friendsListOperation?.friendId === selectedFriend?.id) {
      if (friendsListOperation?.type === 'delete') {
        props.selectFriend(null)
        return
      }
    }
  }

  const sendMessage = async (message) => {
    if (webSocket) {
      if (message.type === '__INIT__') {
        webSocket.send(JSON.stringify(message))
      }

      if (message.type === '__COMMON__') {
        const {from, to} = message
        const dbSendRes = await dbManager.sendMessage(from, to, message)

        if (dbSendRes.type === 'error') {
          activateAlertMessage({
            type: dbSendRes.type,
            text: dbMessages[dbSendRes.message],
            duration: 4000
          })

          return
        }

        webSocket.send(JSON.stringify(message))
      }

      if (message.type === '__UPDATE__') {
        webSocket.send(JSON.stringify(message))
      }
    }
  }

  const createWsConnection = () => {
    try {
      const myWs = new WebSocket(`${wsDomain}/messages`)

      myWs.onmessage = message => {
        setReceivedMessage(JSON.parse(message.data))
      }

      myWs.onopen = () => {
        myWs.send(JSON.stringify({userId: user.id, type: '__INIT__'}))
        setWebSocket(myWs)
      }
    } catch (e) {
      activateAlertMessage({
        type: 'error',
        text: dbMessages['WS_CHAT_NOT_CONNECTED'],
        duration: 4000
      })
    }
  }

  const getUserMessages = async () => {
    const dataReceive = await dbManager.getUserMessages({userId: user.id})

    if (dataReceive.type === 'error') {
      activateAlertMessage({
        type: dataReceive.type,
        text: dbMessages[dataReceive.message],
        duration: 4000
      })

      return
    }

    setUserMessages(dataReceive.userMessages)
  }

  const cardClickHandler = friend => {
    props.selectFriend(friend)
  }

  const createCards = () => {
    const filterText = props.filterContactsText

    if (friends.length === 0) {
      return null
    }

    return helperFuncs.filterByName(friends, filterText).map(friend => {
      return <Card
        key={friend.id}
        friend={friend}
        cardClickHandler={() => cardClickHandler(friend)}
      />
    })
  }

  const createMessages = () => {
    if (friends.length === 0) {
      return <div className="message__warning">Добавьте новые контакты...</div>
    }

    if (!selectedFriend) {
      return <div className="message__warning">Подождите...</div>
    }

    const selectedMessages = helperFuncs.filterAndSortMessages(userMessages, user, selectedFriend)

    if (selectedMessages.length > 0) {
      return selectedMessages.map(message => {
        return <Message key={message.date} message={message} />
      })
    } else {
      return <div className="message__warning">Пока нет сообщений...</div>
    }
  }

  useEffect(() => {
    resetFriendSelection()
  }, [friendsListOperation, friends, selectedFriend])

  useEffect(() => {
    createWsConnection()
    return () => webSocket ? webSocket.close() : null
  }, [])

  useEffect(() => {
    if (profileOperation?.status === 'send') {
      const createdMessage = {
        type: '__UPDATE__',
        operation: profileOperation
      }
      sendMessage(createdMessage)
    }

    if (friendsListOperation?.status === 'send') {
      const createdMessage = {
        type: '__UPDATE__',
        operation: friendsListOperation
      }
      sendMessage(createdMessage)
    }
  }, [profileOperation, friendsListOperation])

  useEffect(() => {
    if (receivedMessage?.type === '__INIT__') {
      getUserMessages()
    }

    if (receivedMessage?.type === '__COMMON__') {
      getUserMessages()
    }

    if (receivedMessage?.type === '__UPDATE__') {
      const {status, action} = receivedMessage.operation

      if (status === 'get') {
        if (action === 'updateFriendsList') {
          props.updateFriendsList(receivedMessage.operation)
        }

        if (action === 'updateProfile') {
          props.updateProfile(receivedMessage.operation)
        }
      }
    }
  }, [receivedMessage])

  useEffect(() => {
    if (receivedMessage?.type === '__INIT__') {
      scrollDownMessages()
    }

    if (receivedMessage?.type === '__COMMON__') {
      const {from, to} = receivedMessage

      if (user.id === from && selectedFriend.id === to) {
        scrollDownMessages()
      }
    }
  }, [userMessages])

  useEffect(() => {
    scrollDownMessages()
  }, [selectedFriend])

  return (
    <div className="chat__main">
      <div className="main__contacts">
        <Filter />

        <div className="main__cards">
          {createCards()}
        </div>
      </div>

      <div className="main__dialog">
        <div className="main__messages" ref={messagesCont}>
          {userMessages && createMessages()}
        </div>

        <Footer
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFriend: state.chatPageState.selectedFriend,
    profileOperation: state.chatPageState.profileOperation,
    friendsListOperation: state.chatPageState.friendsListOperation,
    filterContactsText: state.chatPageState.filterContactsText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectFriend: friend => dispatch(actions.selectFriend(friend)),
    updateProfile: operation => dispatch(actions.updateProfile(operation)),
    updateFriendsList: operation => dispatch(actions.updateFriendsList(operation)),
    activateAlertMessage: messageInfo => dispatch(actions.showAlertMessage(messageInfo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
