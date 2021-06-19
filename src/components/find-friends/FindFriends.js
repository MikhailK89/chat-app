import './findFriends.scss'

import {useState} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'

import btnManager from '../../services/btnStateManager'

import FindCard from '../find-card/FindCard'

function FindFriends(props) {
  const {friendsModalIsOpened} = props
  const {title, friendsList, handleSearch, closeModal, btnType} = props

  const addClasses = friendsModalIsOpened ? '' : ' hide'

  const [filterText, setFilterText] = useState('')

  const handleSending = e => {
    if (e.type === 'keyup') {
      if (e.code !== 'Enter') {
        return
      }
    }

    handleSearch({filterText})
  }

  const closeFriendsModal = () => {
    props.openFriendsModal(false)
    props.openContactsAdd(false)
    props.openContactsDelete(false)
    btnManager.clearBtnTypes()
    setFilterText('')
    closeModal()
  }

  const createFriendsList = () => {
    if (friendsList.length > 0) {
      return friendsList.map(findFriend => (
        <FindCard
          key={findFriend.id}
          findFriend={findFriend}
          btnType={btnType}
        />
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
    openFriendsModal: isOpened => dispatch(actions.openFriendsModal(isOpened)),
    openContactsAdd: isOpened => dispatch(actions.openContactsAdd(isOpened)),
    openContactsDelete: isOpened => dispatch(actions.openContactsDelete(isOpened))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindFriends)
