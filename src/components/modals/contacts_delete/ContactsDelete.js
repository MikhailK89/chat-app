import {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {filterByName} from '../../../shared/helperFuncs'
import dbManager from '../../../services/databaseManager'

import FindFriends from '../../find-friends/FindFriends'

function ContactsDelete(props) {
  const {userId} = JSON.parse(localStorage.getItem('authInfo'))

  const [friendsList, setFriendsList] = useState([])
  const [savedFriendsList, setSavedFriendsList] = useState([])

  const title = 'Удалить контакты'
  const btnType = 'delete'

  const handleSearch = ({filterText}) => {
    setFriendsList(filterByName(savedFriendsList, filterText))
  }

  const getFriendsList = async ({filterText}) => {
    const dataReceive = await dbManager.getUserInfo({userId})
    const friendsData = filterByName(dataReceive.friendsData, filterText)
    setFriendsList([...friendsData])
    setSavedFriendsList([...friendsData])
  }

  useEffect(() => {
    getFriendsList({filterText: ''})
  }, [props.contactsDeleteModal])

  const closeModal = () => {}

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

const mapStateToProps = state => {
  return {
    contactsDeleteModal: state.chatPageState.contactsDeleteModal
  }
}

export default connect(
  mapStateToProps,
  null
)(ContactsDelete)
