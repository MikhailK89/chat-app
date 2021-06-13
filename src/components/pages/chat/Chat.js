import './chatStyles.scss'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

import dbManager from '../../../services/databaseManager'

import Header from '../../header/Header'
import Main from '../../main/Main'
import ContactsAdd from '../../modals/contacts_add/ContactsAdd'
import ContactsDelete from '../../modals/contacts_delete/ContactsDelete'

function Chat(props) {
  const userId = +useParams().id
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

  const {contactsAddModal, contactsDeleteModal} = props

  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    const dataReceive = await dbManager.getUserInfo({userId, tokenInfo})
    setUserInfo(dataReceive)
  }

  useEffect(() => {
    getUserInfo()
  }, [props.friendsListOperation])

  return (
    <div className="chat">
      {userInfo && (
        <>
          {contactsAddModal && <ContactsAdd />}
          {contactsDeleteModal && <ContactsDelete />}
          <Header user={userInfo.findUser} />
          <Main user={userInfo.findUser} friends={userInfo.findFriends} />
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
