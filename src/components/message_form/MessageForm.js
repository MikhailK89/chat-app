import './messageFormStyles.scss'

import {useState} from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

function MessageForm(props) {
  const userId = +useParams().id

  const [messageText, setMessageText] = useState('')

  const handleSending = e => {
    e.preventDefault()

    const message = {
      from: userId,
      to: props.selectedFriend.id,
      text: messageText,
      date: Date.now(),
      type: '__COMMON__'
    }

    props.sendMessage(message)
    setMessageText('')
  }

  return (
    <div className="message__form">
      <textarea
        className="message-form__text"
        onChange={e => setMessageText(e.target.value)}
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
