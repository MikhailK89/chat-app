import {useState} from 'react'
import {connect} from 'react-redux'
import {showAlertMessage} from '../../../redux/actions'
import dbManager from '../../../services/databaseManager'
import dbMessages from '../../../services/messagesTypes'

import FindFriends from '../../find-friends/FindFriends'

function ContactsAdd(props) {
  const {activateAlertMessage} = props
  const {userId} = JSON.parse(localStorage.getItem('authInfo'))

  const [friendsList, setFriendsList] = useState([])

  const title = 'Добавить контакты'
  const btnType = 'add'

  const handleSearch = async ({filterText}) => {
    if (filterText === '') {
      return
    }

    const dataReceive = await dbManager.getFriendsList({userId, filterText})

    if (dataReceive.type === 'error') {
      activateAlertMessage({
        type: dataReceive.type,
        text: dbMessages[dataReceive.message],
        duration: 4000
      })

      return
    }

    setFriendsList(dataReceive.usersData)
  }

  const closeModal = () => {
    setFriendsList([])
  }

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

const mapDispatchToProps = dispatch => {
  return {
    activateAlertMessage: messageInfo => dispatch(showAlertMessage(messageInfo))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ContactsAdd)
