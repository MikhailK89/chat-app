import './authStyles.scss'

import {useHistory} from 'react-router-dom'
import AuthForm from '../../auth_form/AuthForm'
import users from '../../../data/users.json'

function Auth() {
  const history = useHistory()

  const sendFormHandler = ({email, password}) => {
    const findUser = users.find(user => {
      return user.email === email && user.password === password
    })

    history.push(`/users/${findUser.id}`)
  }

  return (
    <div className="auth">
      <AuthForm
        sendFormHandler={sendFormHandler}
      />
    </div>
  )
}

export default Auth
