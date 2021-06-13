import './mainStyles.scss'

import {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {selectFriend} from '../../redux/actions'
import {wsDomain} from '../../settings/fetchSettings'
import {filterByName, filterAndSortMessages} from '../../shared/helperFuncs'

import dbManager from '../../services/databaseManager'

import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'

function Main(props) {
  const {user, friends} = props
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const messagesCont = useRef(null)

  const [userMessages, setUserMessages] = useState(null)
  const [webSocket, setWebSocket] = useState(null)

  const selectedFriend = props.selectedFriend

  const sendMessage = message => {
    if (webSocket) {
      webSocket.send(JSON.stringify(message))
    }
  }

  const scrollDownMessages = () => {
    const contElem = messagesCont.current
    contElem.scrollTop = contElem.scrollHeight - contElem.clientHeight
  }

  const createWsConnection = () => {
    const myWs = new WebSocket(`${wsDomain}/messages/live`)

    myWs.onmessage = message => {
      message = JSON.parse(message.data)

      if (message.type === '__RECEIVED__') {
        getUserMessages()
      }
    }

    myWs.onopen = () => {
      myWs.send(JSON.stringify({id: user.id, type: '__INIT__'}))
      setWebSocket(myWs)
    }
  }

  const getUserMessages = async () => {
    const dataReceive = await dbManager.getUserMessages({userId: user.id, tokenInfo})

    setUserMessages(dataReceive)
    scrollDownMessages()
  }

  useEffect(() => {
    props.selectFriend(friends[0])

    createWsConnection()

    return () => {
      if (webSocket) {
        webSocket.close()
      }
    }
  }, [])

  const cardClickHandler = friend => {
    props.selectFriend(friend)
  }

  const createCards = () => {
    const filterText = props.filterContactsText

    return filterByName(friends, filterText).map(friend => {
      return <Card
        friend={friend}
        cardClickHandler={() => cardClickHandler(friend)}
      />
    })
  }

  const createMessages = () => {
    if (!selectedFriend) {
      return <div className="message__warning">Подождите...</div>
    }

    const selectedMessages = filterAndSortMessages(userMessages, user, selectedFriend)

    if (selectedMessages.length > 0) {
      return selectedMessages.map(message => {
        return <Message message={message} />
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
    filterContactsText: state.chatPageState.filterContactsText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectFriend: friend => dispatch(selectFriend(friend))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
