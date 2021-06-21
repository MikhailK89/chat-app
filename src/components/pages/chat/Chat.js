import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import dbManager from '../../../services/databaseManager'

import Header from '../../header/Header'
import Main from '../../main/Main'
import ContactsAdd from '../../modals/contacts_add/ContactsAdd'
import ContactsDelete from '../../modals/contacts_delete/ContactsDelete'

function Chat(props) {
  const {contactsAddModal, contactsDeleteModal} = props
  const {userId} = JSON.parse(localStorage.getItem('authInfo'))

  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    const dataReceive = await dbManager.getUserInfo({userId})
    setUserInfo(dataReceive)
  }

  useEffect(() => {
    getUserInfo()
  }, [props.friendsListOperation])

  return (
    <div className="chat">
      {userId && userInfo && (
        <>
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
    friendsListOperation: state.chatPageState.friendsListOperation,
    contactsAddModal: state.chatPageState.contactsAddModal,
    contactsDeleteModal: state.chatPageState.contactsDeleteModal
  }
}

export default connect(
  mapStateToProps,
  null
)(Chat)
