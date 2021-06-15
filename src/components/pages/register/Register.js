import './registerStyles.scss'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import dbManager from '../../../services/databaseManager'

import SendForm from '../../send_form/SendForm'

function Register() {
  const history = useHistory()

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

export default Register
