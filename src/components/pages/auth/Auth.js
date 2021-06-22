import './authStyles.scss'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {showAlertMessage} from '../../../redux/actions'
import dbManager from '../../../services/databaseManager'
import dbMessages from '../../../services/messagesTypes'

import SendForm from '../../send_form/SendForm'

function Auth(props) {
  const {activateAlertMessage} = props
  const history = useHistory()

  const [btnState, setBtnState] = useState(false)
  const inputNameState = false

  const sendFormHandler = async (formData) => {
    setBtnState(true)

    const authInfo = await dbManager.authUser(formData)
    setBtnState(false)

    if (authInfo.type === 'error') {
      activateAlertMessage({
        type: authInfo.type,
        text: dbMessages[authInfo.message],
        duration: 4000
      })

      return
    }

    const {userId} = authInfo

    if (userId) {
      localStorage.setItem('authInfo', JSON.stringify({userId}))
      history.push('/chat')
    }
  }

  return (
    <div className="auth">
      <div className="auth-info">
        <div className="auth-info__title">Войти в чат</div>

        <SendForm
          sendFormHandler={sendFormHandler}
          btnState={btnState}
          inputNameState={inputNameState}
        />

        <div className="auth-info__register">
          Для регистрации перейдите на <Link to="/register">страницу</Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    activateAlertMessage: messageInfo => dispatch(showAlertMessage(messageInfo))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Auth)
