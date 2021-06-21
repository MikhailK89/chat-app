import './authStyles.scss'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import dbManager from '../../../services/databaseManager'

import SendForm from '../../send_form/SendForm'

function Auth() {
  const history = useHistory()

  const [btnState, setBtnState] = useState(false)
  const inputNameState = false

  const sendFormHandler = async (formData) => {
    setBtnState(true)

    const authInfo = await dbManager.authUser(formData)
    const {userId} = authInfo

    setBtnState(false)

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

export default Auth
