import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {showAlertMessage} from '../../../redux/actions'
import {filterByName} from '../../../shared/helperFuncs'
import dbManager from '../../../services/databaseManager'
import dbMessages from '../../../services/messagesTypes'

import FindFriends from '../../find-friends/FindFriends'

function ContactsDelete(props) {
  const {activateAlertMessage} = props
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

    if (dataReceive.type === 'error') {
      activateAlertMessage({
        type: dataReceive.type,
        text: dbMessages[dataReceive.message],
        duration: 4000
      })

      return
    }

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

const mapDispatchToProps = dispatch => {
  return {
    activateAlertMessage: messageInfo => dispatch(showAlertMessage(messageInfo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsDelete)
