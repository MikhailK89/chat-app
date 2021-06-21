import './mainStyles.scss'

import {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {selectFriend, updateFriendsList} from '../../redux/actions'
import {wsDomain} from '../../settings/fetchSettings'
import {filterByName, filterAndSortMessages} from '../../shared/helperFuncs'

import dbManager from '../../services/databaseManager'

import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'

function Main(props) {
  const {user, friends} = props

  const messagesCont = useRef(null)

  const [userMessages, setUserMessages] = useState(null)
  const [webSocket, setWebSocket] = useState(null)

  const {selectedFriend, friendsListOperation} = props

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
      if (message.type === '__COMMON__') {
        const {from, to} = message
        const dbSendRes = await dbManager.sendMessage(from, to, message)
      }

      webSocket.send(JSON.stringify(message))
    }
  }

  const createWsConnection = () => {
    const myWs = new WebSocket(`${wsDomain}/messages`)

    myWs.onmessage = message => {
      message = JSON.parse(message.data)

      if (message.type === '__RECEIVED__') {
        getUserMessages()
      }

      if (message.type === '__UPDATE__') {
        if (message.operation.status === 'get') {
          props.updateFriendsList(message.operation)
        }
      }
    }

    myWs.onopen = () => {
      myWs.send(JSON.stringify({userId: user.id, type: '__INIT__'}))
      setWebSocket(myWs)
    }
  }

  const getUserMessages = async () => {
    const dataReceive = await dbManager.getUserMessages({userId: user.id})

    setUserMessages(dataReceive)
  }

  useEffect(() => {
    resetFriendSelection()
  })

  useEffect(() => {
    createWsConnection()

    return () => {
      if (webSocket) {
        webSocket.close()
      }
    }
  }, [])

  useEffect(() => {
    if (friendsListOperation) {
      if (friendsListOperation.status === 'send') {
        const createdMessage = {
          type: '__UPDATE__',
          operation: friendsListOperation
        }
        sendMessage(createdMessage)
      }
    }
  }, [friendsListOperation])

  const cardClickHandler = friend => {
    props.selectFriend(friend)
  }

  const createCards = () => {
    const filterText = props.filterContactsText

    if (friends.length === 0) {
      return null
    }

    return filterByName(friends, filterText).map(friend => {
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

    const selectedMessages = filterAndSortMessages(userMessages, user, selectedFriend)

    if (selectedMessages.length > 0) {
      return selectedMessages.map(message => {
        return <Message key={message.date} message={message} />
      })
    } else {
      return <div className="message__warning">Пока нет сообщений...</div>
    }
  }

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
    filterContactsText: state.chatPageState.filterContactsText,
    friendsListOperation: state.chatPageState.friendsListOperation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectFriend: friend => dispatch(selectFriend(friend)),
    updateFriendsList: operation => dispatch(updateFriendsList(operation))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
