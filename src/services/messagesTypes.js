const FIREBASE_NOT_CONNECTED = 'FIREBASE_NOT_CONNECTED'
const EMAIL_EXISTS = 'EMAIL_EXISTS'
const EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND'
const USER_ADDED = 'USER_ADDED'
const USER_NOT_ADDED = 'USER_NOT_ADDED'
const MESSAGE_SAVED = 'MESSAGE_SAVED'
const MESSAGE_NOT_SAVED = 'MESSAGE_NOT_SAVED'
const CONTACT_ADDED = 'CONTACT_ADDED'
const CONTACT_NOT_ADDED = 'CONTACT_NOT_ADDED'
const CONTACT_DELETED = 'CONTACT_DELETED'
const CONTACT_NOT_DELETED = 'CONTACT_NOT_DELETED'

const messages = {
  [FIREBASE_NOT_CONNECTED]: 'Ошибка подключения к серверу Firebase',
  [EMAIL_EXISTS]: 'Такой пользователь уже есть в системе',
  [EMAIL_NOT_FOUND]: 'Пользователь не найден. Необходима регистрация',
  [USER_ADDED]: 'Пользователь успешно добавлен',
  [USER_NOT_ADDED]: 'При добавлении пользователя произошла ошибка',
  [MESSAGE_SAVED]: 'Сообщение успешно сохранено',
  [MESSAGE_NOT_SAVED]: 'При сохранении сообщения произошла ошибка',
  [CONTACT_ADDED]: 'Новый контакт успешно добавлен',
  [CONTACT_NOT_ADDED]: 'При добавлении контакта произошла ошибка',
  [CONTACT_DELETED]: 'Контакт успешно удалён',
  [CONTACT_NOT_DELETED]: 'При удалении контакта произошла ошибка'
}

export default messages
