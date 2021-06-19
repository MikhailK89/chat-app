import './sendFormStyles.scss'

import {useState} from 'react'
import {useForm} from 'react-hook-form'

function SendForm(props) {
  const {sendFormHandler, btnState, inputNameState} = props

  const [name, setName] = useState('Рэнди Марш')
  const [email, setEmail] = useState('randy_marsh@gmail.com')
  const [password, setPassword] = useState('123456789')

  const {register, handleSubmit, formState: {errors}} = useForm()

  const addClasses = inputNameState ? '' : ' delete'

  const onSubmit = data => {
    const {name, email, password} = data
    sendFormHandler({name, email, password})
  }

  return (
    <div className="send__form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"send-form__name" + addClasses}>
          <label htmlFor="inputName">Имя:</label>
          <input
            id="inputName"
            type="text"
            {...register('name', {
              required: 'Поле не должно быть пустым',
              pattern: {
                value: /\S+\s+\S+/,
                message: 'Образец имени: Иван Иванов'
              }
            })}
            autoComplete="off"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="send-form__error">{errors.name?.message}</div>

        <div className="send-form__login">
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
        <div className="send-form__error">{errors.email?.message}</div>

        <div className="send-form__password">
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
        <div className="send-form__error">{errors.password?.message}</div>

        <div className="send-form__send">
          <button
            type="submit"
            disabled={btnState}
          >Отправить</button>
        </div>
      </form>
    </div>
  )
}

export default SendForm
