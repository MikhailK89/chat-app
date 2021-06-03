import './authStyles.scss'

import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveTokenInfo} from '../../../redux/actions'
import {domain} from '../../../settings/fetchSettings'

import AuthForm from '../../auth_form/AuthForm'

function Auth(props) {
  const history = useHistory()

  const sendFormHandler = async (formData) => {
    const res = await fetch(`${domain}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formData)
    })

    const tokenInfo = await res.json()

    if (tokenInfo) {
      // props.saveTokenInfo(tokenInfo)
      localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
      history.push(`/users/${tokenInfo.id}`)
    }
  }

  return (
    <div className="auth">
      <AuthForm
        sendFormHandler={sendFormHandler}
      />
    </div>
  )
}

// const mapDispatchToProps = dispatch => {
//   return {
//     saveTokenInfo: tokenInfo => dispatch(saveTokenInfo(tokenInfo))
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(Auth)

export default Auth
