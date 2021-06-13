import {useState} from 'react'
import {useParams} from 'react-router-dom'

import dbManager from '../../../services/databaseManager'

import FindFriends from '../../find-friends/FindFriends'

function ContactsAdd() {
  const id = +useParams().id
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const [friendsList, setFriendsList] = useState([])

  const title = 'Добавить контакты'
  const btnType = 'add'

  const handleSearch = async ({filterText}) => {
    if (filterText === '') {
      return
    }

    const dataReceive = await dbManager.getFriendsList({id, tokenInfo, filterText})
    setFriendsList(dataReceive)
  }

  const closeModal = () => {
    setFriendsList([])
  }

  return (
    <FindFriends
      title={title}
      friendsList={friendsList}
      handleSearch={handleSearch}
      closeModal={closeModal}
      btnType={btnType}
    />
  )
}

export default ContactsAdd
