import './mainStyles.scss'

import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectFriend} from '../../redux/actions'

import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'

import {domain, wsDomain} from '../../settings/fetchSettings'

function Main(props) {
  const {user, friends} = props
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const [userMessages, setUserMessages] = useState(null)
  const [webSocket, setWebSocket] = useState(null)

  const selectedFriend = props.selectedFriend

  const sendMessage = message => {
    if (webSocket) {
      webSocket.send(JSON.stringify(message))
    }
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
    const res = await fetch(`${domain}/messages/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: tokenInfo.token})
    })

    const data = await res.json()

    setUserMessages(data)
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

  const createCards = friends.map(friend => {
    return <Card
      friend={friend}
      cardClickHandler={() => cardClickHandler(friend)}
    />
  })

  const createMessages = () => {
    if (!selectedFriend) {
      return <div className="message__warning">Подождите...</div>
    }

    const selectedMessages = userMessages.filter(message => {
      if (message.from === user.id) {
        message.author = 'Вы'
      } else if (message.from === selectedFriend.id) {
        message.author = selectedFriend.userName
      }

      return (message.to === user.id && message.from === selectedFriend.id) ||
        (message.to === selectedFriend.id && message.from === user.id)
    })

    selectedMessages.sort((leftMessage, rightMessage) => {
      return leftMessage.date > rightMessage.date ? 1 :
        leftMessage.date < rightMessage.date ? -1 : 0
    })

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
          {createCards}
        </div>
      </div>

      <div className="main__dialog">
        <div className="main__messages">
          {userMessages && createMessages()}
        </div>

        <Footer sendMessage={sendMessage} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFriend: state.chatPageState.selectedFriend
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
