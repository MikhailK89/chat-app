import './authStyles.scss'

import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import dbManager from '../../../services/databaseManager'

import SendForm from '../../send_form/SendForm'

function Auth() {
  const history = useHistory()

  const [btnState, setBtnState] = useState(false)
  const [inputNameState, setInputNameState] = useState(false)

  const sendFormHandler = async (formData) => {
    setBtnState(true)
    const tokenInfo = await dbManager.authUser(formData)
    setBtnState(false)

    if (tokenInfo) {
      localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
      history.push(`/users/${tokenInfo.id}`)
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
