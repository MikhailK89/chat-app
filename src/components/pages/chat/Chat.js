import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

import {domain} from '../../../settings/fetchSettings'

import Header from '../../header/Header'
import Main from '../../main/Main'
import FriendsSearch from '../../modals/friends_search/FriendsSearch'

function Chat(props) {
  const userId = +useParams().id
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    const res = await fetch(`${domain}/users/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: tokenInfo.token})
    })

    const data = await res.json()

    setUserInfo(data)
  }

  useEffect(() => {
    getUserInfo()
  }, [props.friendsListOperation])

  return (
    <div className="chat">
      {userInfo && (
        <>
          <FriendsSearch />
          <Header user={userInfo.findUser} />
          <Main user={userInfo.findUser} friends={userInfo.findFriends} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    friendsListOperation: state.chatPageState.friendsListOperation
  }
}

export default connect(
  mapStateToProps,
  null
)(Chat)
