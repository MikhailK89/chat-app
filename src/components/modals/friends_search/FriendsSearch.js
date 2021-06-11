import {useState} from 'react'
import {useParams} from 'react-router-dom'

import dbManager from '../../../services/databaseManager'

import FindFriends from '../../find-friends/FindFriends'

function FriendsSearch() {
  const id = +useParams().id

  const [friendsList, setFriendsList] = useState([])

  const title = 'Найти друзей'

  const handleSearch = async ({filterText}) => {
    const dataReceive = await dbManager.getFriendsList({id, filterText})
    setFriendsList(dataReceive)
  }

  const clearFriendsList = () => {
    setFriendsList([])
  }

  return (
    <FindFriends
      title={title}
      friendsList={friendsList}
      clearFriendsList={clearFriendsList}
      handleSearch={handleSearch}
    />
  )
}

export default FriendsSearch
