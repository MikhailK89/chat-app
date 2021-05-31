import './mainStyles.scss'

import {useState} from 'react'
import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'
import messages from '../../data/messages.json'

function Main(props) {
  const [selectedFriendId, setSelectedFriendId] = useState(props.friends[0].id)
  const {user, friends} = props

  const createCards = friends.map(friend => {
    return <Card
      friend={friend}
      cardClickHandler={() => setSelectedFriendId(friend.id)}
    />
  })

  const createMessages = () => {
    const userMessages = messages.find(item => item.id === user.id).messages

    const userName = user.userName
    const selectedFriendName = friends.find(friend => friend.id === selectedFriendId).userName

    const findMessages = userMessages.filter(message => {
      if (message.from === user.id) {
        message.author = userName
      } else if (message.from === selectedFriendId) {
        message.author = selectedFriendName
      }

      return (message.to === user.id && message.from === selectedFriendId) ||
        (message.to === selectedFriendId && message.from === user.id)
    })

    findMessages.sort((leftMessage, rightMessage) => {
      return leftMessage.date > rightMessage.date ? 1 :
        leftMessage.date < rightMessage.date ? -1 : 0
    })

    if (findMessages.length > 0) {
      return findMessages.map(message => {
        return <Message message={message} />
      })
    } else {
      return <div className="message__warning">No messages yet...</div>
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
          {createMessages()}
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Main
