import './messageStyles.scss'

function Message(props) {
  const {message} = props

  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))
  const userId = tokenInfo.localId
  const authorId = message.from

  let addClasses = ''

  if (userId === authorId) {
    addClasses += ' message__user'
  } else {
    addClasses += ' message__friend'
  }

  const date = new Date(message.date)
  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  const messageDate = formatter.format(date)

  return (
    <div className={"main__message" + addClasses}>
      <div className={"message__author" + addClasses}>{message.author}</div>
      <div className="message__text">{message.text}</div>
      <div className="message__date">{messageDate}</div>
    </div>
  )
}

export default Message
