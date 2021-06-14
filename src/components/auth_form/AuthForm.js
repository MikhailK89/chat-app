import './authFormStyles.scss'

import {useState} from 'react'
import {useForm} from 'react-hook-form'

function AuthForm(props) {
  const [email, setEmail] = useState('randy_marsh@gmail.com')
  const [password, setPassword] = useState('12345')

  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = data => {
    const {email, password} = data
    props.sendFormHandler({email, password})
  }

  return (
    <div className="auth__form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form__login">
          <label htmlFor="inputEmail">Email:</label>
          <input
            id="inputEmail"
            type="email"
            {...register('email', {
              required: 'Поле не должно быть пустым',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Введите корректный email'
              }
            })}
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="auth-form__error">{errors.email?.message}</div>

        <div className="auth-form__password">
          <label htmlFor="inputPassword">Пароль:</label>
          <input
            id="inputPassword"
            type="password"
            {...register('password', {
              required: 'Поле не должно быть пустым',
              minLength: {
                value: 5,
                message: 'Пароль должен быть не менее 5 символов'
              }
            })}
            placeholder="Введите пароль"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="auth-form__error">{errors.password?.message}</div>

        <div className="auth-form__send">
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
