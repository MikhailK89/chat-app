import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {domain} from '../../../settings/fetchSettings'

import Header from '../../header/Header'
import Main from '../../main/Main'

function Chat() {
  const userId = +useParams().id
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch(`${domain}/users/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: tokenInfo.token})
      })

      const data = await res.json()

      // console.log(data)

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

// const mapStateToProps = state => {
//   return {
//     tokenInfo: state.authUser.tokenInfo
//   }
// }

// export default connect(
//   mapStateToProps,
//   null
// )(Chat)

export default Chat
