import './authStyles.scss'

import {Link, useHistory} from 'react-router-dom'
import dbManager from '../../../services/databaseManager'

import AuthForm from '../../auth_form/AuthForm'

function Auth() {
  const history = useHistory()

  const sendFormHandler = async (formData) => {
    const tokenInfo = await dbManager.authUser(formData)

    if (tokenInfo) {
      localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
      history.push(`/users/${tokenInfo.id}`)
    }
  }

  return (
    <div className="auth">
      <div className="auth-info">
        <div className="auth-info__title">Войти в чат</div>

        <AuthForm
          sendFormHandler={sendFormHandler}
        />

        <div className="auth-info__register">
          Для регистрации перейдите на <Link to="/register">страницу</Link>
        </div>
      </div>
    </div>
  )
}

export default Auth
