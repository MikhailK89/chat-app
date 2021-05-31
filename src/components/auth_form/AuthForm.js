import './authFormStyles.scss'

import {useState} from 'react'

function AuthForm(props) {
  const [email, setEmail] = useState('randy_marsh@gmail.com')
  const [password, setPassword] = useState('12345')

  const btnHandler = e => {
    e.preventDefault()
    props.sendFormHandler({email, password})
  }

  return (
    <div className="auth__form">
      <form>
        <div className="form__login">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Введите email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form__password">
          <label>Пароль:</label>
          <input
            type="text"
            placeholder="Введите пароль"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form__send">
          <button
            onClick={btnHandler}
          >Отправить</button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
