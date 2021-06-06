import './footerStyles.scss'

import MessageForm from '../message_form/MessageForm'

function Footer(props) {
  return (
    <div className="footer">
      <MessageForm sendMessage={props.sendMessage} />
    </div>
  )
}

export default Footer
