import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import dbManager from '../../../services/databaseManager'
import dbMessages from '../../../services/messagesTypes'

import Header from '../../header/Header'
import Main from '../../main/Main'
import ContactsAdd from '../../modals/contacts_add/ContactsAdd'
import ContactsDelete from '../../modals/contacts_delete/ContactsDelete'
import ProfileInfo from '../../modals/profile_info/ProfileInfo'
import Substrate from '../../substrate/Substrate'

function Chat(props) {
  const {
    profileOperation,
    friendsListOperation
  } = props

  const {
    contactsAddModal,
    contactsDeleteModal,
    profileModal,
    substrateIsActivated,
    activateAlertMessage
  } = props

  const {userId} = JSON.parse(localStorage.getItem('authInfo'))
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    const dataReceive = await dbManager.getUserInfo({userId})

    if (dataReceive.type === 'error') {
      activateAlertMessage({
        type: dataReceive.type,
        text: dbMessages[dataReceive.message],
        duration: 4000
      })

      return
    }

    setUserInfo(dataReceive)
  }

  useEffect(() => {
    getUserInfo()
  }, [profileOperation, friendsListOperation])

  return (
    <div className="chat">
      {userId && userInfo && (
        <>
          {substrateIsActivated && <Substrate />}
          {profileModal && <ProfileInfo user={userInfo.userData} />}
          {contactsAddModal && <ContactsAdd />}
          {contactsDeleteModal && <ContactsDelete />}
          <Header user={userInfo.userData} />
          <Main user={userInfo.userData} friends={userInfo.friendsData} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    profileOperation: state.chatPageState.profileOperation,
    friendsListOperation: state.chatPageState.friendsListOperation,
    contactsAddModal: state.chatPageState.contactsAddModal,
    contactsDeleteModal: state.chatPageState.contactsDeleteModal,
    profileModal: state.chatPageState.profileModal,
    substrateIsActivated: state.chatPageState.substrateIsActivated
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
)(Chat)
