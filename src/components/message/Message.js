import './messageStyles.scss'

function Message(props) {
  const {message} = props

  return (
    <div className="main__message">
      <div className="message__author">{message.author}</div>
      <div className="message__text">{message.text}</div>
      <div className="message__date">{new Date(message.date).toDateString()}</div>
    </div>
  )
}

export default Message
