import './registerStyles.scss'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {showAlertMessage} from '../../../redux/actions'
import dbManager from '../../../services/databaseManager'

import SendForm from '../../send_form/SendForm'

function Register(props) {
  const history = useHistory()

  const {activateAlertMessage} = props

  const [btnState, setBtnState] = useState(false)
  const [inputNameState, setInputNameState] = useState(true)

  const sendFormHandler = async (formData) => {
    const {name, email, password} = formData
    setBtnState(true)

    const dataReceive = await dbManager.registerUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    })

    activateAlertMessage({
      type: 'error',
      text: dataReceive.message,
      duration: 4000
    })

    setBtnState(false)
  }

  return (
    <div className="register">
      <div className="register-info">
        <div className="register-info__title">Регистрация</div>

        <SendForm
          sendFormHandler={sendFormHandler}
          btnState={btnState}
          inputNameState={inputNameState}
        />

        <div className="register-info__register">
          Для входа в систему перейдите на <Link to="/auth">страницу</Link>
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
)(Register)