import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Header from '../../header/Header'
import Main from '../../main/Main'

import {domain} from '../../../settings/fetchSettings'

function Chat() {
  const userId = useParams().id

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch(`${domain}/users/${userId}`)
      const data = await res.json()

      setUserInfo(data)
    }

    getUserInfo()
  }, [])

  return (
    <div className="chat">
      {userInfo && (
        <>
          <Header user={userInfo.findUser} />
          <Main user={userInfo.findUser} friends={userInfo.findFriends} />
        </>
      )}
    </div>
  )
}

export default Chat
