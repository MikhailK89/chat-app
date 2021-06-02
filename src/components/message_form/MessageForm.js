import './messageFormStyles.scss'

function MessageForm() {
  return (
    <div className="message__form">
      <textarea
        className="message-form__text"
        placeholder="Текст вашего сообщения"
      ></textarea>
      <button className="message-form__send">Отправить</button>
    </div>
  )
}

export default MessageForm
