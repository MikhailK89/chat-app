import './mainStyles.scss'

import {useState, useEffect} from 'react'

import Filter from '../filter/Filter'
import Card from '../card/Card'
import Message from '../message/Message'
import Footer from '../footer/Footer'

import {domain} from '../../settings/fetchSettings'

function Main(props) {
  const {user, friends} = props

  const [selectedFriend, setSelectedFriend] = useState(friends[0])
  const [userMessages, setUserMessages] = useState(null)

  useEffect(() => {
    async function getUserMessages() {
      const res = await fetch(`${domain}/messages/${user.id}`)
      const data = await res.json()

      setUserMessages(data)
    }

    getUserMessages()
  }, [])

  const createCards = friends.map(friend => {
    return <Card
      friend={friend}
      cardClickHandler={() => setSelectedFriend(friend)}
    />
  })

  const createMessages = () => {
    const selectedMessages = userMessages.filter(message => {
      if (message.from === user.id) {
        message.author = user.userName
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
          {userMessages && createMessages()}
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Main
