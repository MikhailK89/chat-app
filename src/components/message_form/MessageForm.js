import './messageFormStyles.scss'

import {useState} from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

function MessageForm(props) {
  const userId = +useParams().id

  const [messageText, setMessageText] = useState('')

  const handleSending = e => {
    const message = {
      from: userId,
      to: props.selectedFriend.id,
      text: messageText,
      date: Date.now(),
      type: '__COMMON__'
    }

    if (e.type === 'click') {
      e.preventDefault()
      props.sendMessage(message)
      setMessageText('')
    }

    if (e.type === 'keydown') {
      if (e.code === 'Enter') {
        e.preventDefault()
      }
    }

    if (e.type === 'keyup') {
      if (e.code === 'Enter') {
        e.preventDefault()
        props.sendMessage(message)
        setMessageText('')
      }
    }
  }

  return (
    <div className="message__form">
      <textarea
        className="message-form__text"
        onChange={e => setMessageText(e.target.value)}
        onKeyDown={handleSending}
        onKeyUp={handleSending}
        value={messageText}
        placeholder="Текст вашего сообщения"
      ></textarea>
      <button
        className="message-form__send"
        onClick={handleSending}
      >Отправить</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFriend: state.chatPageState.selectedFriend
  }
}

export default connect(
  mapStateToProps,
  null
)(MessageForm)
