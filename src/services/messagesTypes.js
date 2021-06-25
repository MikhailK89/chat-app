const FIREBASE_NOT_CONNECTED = 'FIREBASE_NOT_CONNECTED'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_EMAIL_EXISTS = 'REGISTER_EMAIL_EXISTS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_EMAIL_NOT_FOUND = 'AUTH_EMAIL_NOT_FOUND'
const DB_USER_INFO_FOUND = 'DB_USER_INFO_FOUND'
const DB_USER_INFO_NOT_FOUND = 'DB_USER_INFO_NOT_FOUND'
const DB_USER_ADDED = 'DB_USER_ADDED'
const DB_USER_NOT_ADDED = 'DB_USER_NOT_ADDED'
const DB_USER_FOUND = 'DB_USER_FOUND'
const DB_USER_NOT_FOUND = 'DB_USER_NOT_FOUND'
const DB_USERS_FOUND = 'DB_USERS_FOUND'
const DB_USERS_NOT_FOUND = 'DB_USERS_NOT_FOUND'
const DB_MESSAGES_FOUND = 'DB_MESSAGES_FOUND'
const DB_MESSAGES_NOT_FOUND = 'DB_MESSAGES_NOT_FOUND'
const DB_MESSAGE_SAVED = 'DB_MESSAGE_SAVED'
const DB_MESSAGE_NOT_SAVED = 'DB_MESSAGE_NOT_SAVED'
const DB_CONTACT_ADDED = 'DB_CONTACT_ADDED'
const DB_CONTACT_NOT_ADDED = 'DB_CONTACT_NOT_ADDED'
const DB_CONTACT_DELETED = 'DB_CONTACT_DELETED'
const DB_CONTACT_NOT_DELETED = 'DB_CONTACT_NOT_DELETED'
const DB_PROFILE_UPDATED = 'DB_PROFILE_UPDATED'
const DB_PROFILE_NOT_UPDATED = 'DB_PROFILE_NOT_UPDATED'
const WS_CHAT_NOT_CONNECTED = 'WS_CHAT_NOT_CONNECTED'
const SERVER_CONTACT_STATUS_SUCCESS = 'SERVER_CONTACT_STATUS_SUCCESS'
const SERVER_CONTACT_STATUS_ERROR = 'SERVER_CONTACT_STATUS_ERROR'
const SERVER_PROFILE_IMAGE_SUCCESS = 'SERVER_PROFILE_IMAGE_SUCCESS'
const SERVER_PROFILE_IMAGE_ERROR = 'SERVER_PROFILE_IMAGE_ERROR'

const dbMessages = {
  [FIREBASE_NOT_CONNECTED]: 'Ошибка подключения к серверу Firebase',
  [REGISTER_SUCCESS]: 'Регистрация прошла успешно. Войдите в систему',
  [REGISTER_EMAIL_EXISTS]: 'Такой пользователь уже есть в системе',
  [AUTH_SUCCESS]: 'Авторизация прошла успешно',
  [AUTH_EMAIL_NOT_FOUND]: 'Пользователь не найден. Необходима регистрация',
  [DB_USER_INFO_FOUND]: 'Данные о пользователе успешно получены',
  [DB_USER_INFO_NOT_FOUND]: 'Не удалось получить данные о пользователе',
  [DB_USER_ADDED]: 'Пользователь успешно добавлен',
  [DB_USER_NOT_ADDED]: 'При добавлении пользователя произошла ошибка',
  [DB_USER_FOUND]: 'Пользователь успешно найден в базе данных',
  [DB_USER_NOT_FOUND]: 'Не удалось найти пользователя в базе данных',
  [DB_USERS_FOUND]: 'Список всех пользователей успешно получен',
  [DB_USERS_NOT_FOUND]: 'Не удалось получить список всех пользователей',
  [DB_MESSAGES_FOUND]: 'Список сообщений пользователя успешно получен',
  [DB_MESSAGES_NOT_FOUND]: 'Не удалось получить список сообщений пользователя',
  [DB_MESSAGE_SAVED]: 'Сообщение успешно сохранено',
  [DB_MESSAGE_NOT_SAVED]: 'При сохранении сообщения произошла ошибка',
  [DB_CONTACT_ADDED]: 'Новый контакт успешно добавлен',
  [DB_CONTACT_NOT_ADDED]: 'При добавлении контакта произошла ошибка',
  [DB_CONTACT_DELETED]: 'Контакт успешно удалён',
  [DB_CONTACT_NOT_DELETED]: 'При удалении контакта произошла ошибка',
  [DB_PROFILE_UPDATED]: 'Профиль успешно обновлён',
  [DB_PROFILE_NOT_UPDATED]: 'Не удалось обновить данные профиля',
  [WS_CHAT_NOT_CONNECTED]: 'Произошла ошибка подключения к чату. Попробуйте перезагрузить страницу',
  [SERVER_CONTACT_STATUS_SUCCESS]: 'Статус контакта успешно получен',
  [SERVER_CONTACT_STATUS_ERROR]: 'Не удалось получить статус контакта',
  [SERVER_PROFILE_IMAGE_SUCCESS]: 'Фотография профиля успешно загружена',
  [SERVER_PROFILE_IMAGE_ERROR]: 'Не удалось загрузить фотографию профиля'
}

export default dbMessages
