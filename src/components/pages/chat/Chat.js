import './chatStyles.scss'

import {useParams} from 'react-router-dom'

import Header from '../../header/Header'
import Main from '../../main/Main'

import users from '../../../data/users.json'

function Chat() {
  const userId = useParams().id
  const findUser = users.find(user => user.id === +userId)
  const findFriends = findUser.friendsIds.map(id => {
    return users.find(user => user.id === id)
  })

  return (
    <div className="chat">
      <Header user={findUser} />
      <Main user={findUser} friends={findFriends} />
    </div>
  )
}

export default Chat
