import './findFriends.scss'

import {useState} from 'react'
import {connect} from 'react-redux'
import {openFriendsModal} from '../../redux/actions'

import FindCard from '../find-card/FindCard'

function FindFriends(props) {
  const {friendsModalIsOpened} = props
  const {friendsList, clearFriendsList, handleSearch, title} = props

  const addClasses = friendsModalIsOpened ? '' : ' window__closed'

  const [filterText, setFilterText] = useState('')

  const handleSending = e => {
    if (e.type === 'keyup') {
      if (e.code !== 'Enter') {
        return
      }
    }

    if (filterText === '') {
      return
    }

    handleSearch({filterText})
  }

  const closeFriendsModal = () => {
    props.openFriendsModal(false)
    setFilterText('')
    clearFriendsList()
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
        <div className="find-friends__title">{title}</div>
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
