import './findFriendsStyles.scss'

import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {openFriendsModal} from '../../../redux/actions'
import {domain} from '../../../settings/fetchSettings'

import FindCard from '../../find-card/FindCard'

function FindFriends(props) {
  const {friendsModalIsOpened} = props

  const [filterText, setFilterText] = useState('')
  const [friendsList, setFriendsList] = useState([])

  const id = +useParams().id

  const addClasses = friendsModalIsOpened ? '' : ' window__closed'

  const handleSending = async (e) => {
    if (filterText === '') {
      return
    }

    if (e.type === 'keyup') {
      if (e.code !== 'Enter') {
        return
      }
    }

    const res = await fetch(`${domain}/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({id, filterText})
    })

    const data = await res.json()

    setFriendsList(data)
  }

  const closeFriendsModal = () => {
    props.openFriendsModal(false)
    setFilterText('')
    setFriendsList([])
  }

  const createFriendsList = () => {
    if (friendsList.length > 0) {
      return friendsList.map(findFriend => (
        <FindCard findFriend={findFriend} />
      ))
    } else {
      return <div className="find-friends__warning">Пока не найдены...</div>
    }
  }

  return (
    <div className={"modals__find-friends" + addClasses}>
      <span
        className="find-friends__close-icon material-icons"
        onClick={closeFriendsModal}
      >close</span>

      <div className="find-friends__header">
        <div className="find-friends__title">Найти друзей</div>
        <div className="find-friends__filter">
          <input
            type="text"
            onChange={e => setFilterText(e.target.value)}
            onKeyUp={handleSending}
            value={filterText}
            placeholder="Имя вашего друга"
          />
          <button
            className="find-friends__search-btn"
            onClick={handleSending}
          >
            <span className="material-icons">search</span>
          </button>
        </div>
      </div>

      <div className="find-friends__list">
        {createFriendsList()}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    friendsModalIsOpened: state.chatPageState.friendsModalIsOpened
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openFriendsModal: isOpened => dispatch(openFriendsModal(isOpened))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindFriends)
