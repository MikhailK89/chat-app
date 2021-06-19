import {useState} from 'react'
import dbManager from '../../../services/databaseManager'

import FindFriends from '../../find-friends/FindFriends'

function ContactsAdd() {
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))
  const userId = tokenInfo.localId

  const [friendsList, setFriendsList] = useState([])

  const title = 'Добавить контакты'
  const btnType = 'add'

  const handleSearch = async ({filterText}) => {
    if (filterText === '') {
      return
    }

    const dataReceive = await dbManager.getFriendsList({userId, filterText})
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
