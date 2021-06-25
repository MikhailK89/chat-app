import './profileInfoStyles.scss'

import {useState} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions'
import dbManager from '../../../services/databaseManager'
import dbMessages from '../../../services/messagesTypes'

function ProfileInfo(props) {
  const {user, activateAlertMessage, profileModal} = props
  const {id: userId, friendsIds} = user

  const [btnState, setBtnState] = useState(false)

  const addClasses = profileModal ? '' : ' hide'

  const sendForm = async (e) => {
    e.preventDefault()

    setBtnState(true)

    const formData = new FormData(e.target)

    if (formData.get('filedata').name === '') {
      setBtnState(false)
      activateAlertMessage({
        type: 'error',
        text: 'Прикрепите фотографию',
        duration: 4000
      })
      return
    }

    const res = await dbManager.sendProfileInfo(formData)

    if (res.type === 'success') {
      props.updateProfile({
        type: 'update',
        status: 'send',
        action: 'updateProfile',
        userId,
        friendsIds: [...friendsIds]
      })
    }

    setBtnState(false)
    activateAlertMessage({
      type: res.type,
      text: dbMessages[res.message],
      duration: 4000
    })
  }

  const closeModal = () => {
    props.openProfileModal(false)
    props.activateSubstrate(false)
  }

  return (
    <div className={"modals__profile-info" + addClasses}>
      <span
        className="profile-info__icon-close material-icons"
        onClick={closeModal}
      >close</span>

      <div className="profile-info__title">Профиль пользователя</div>

      <form onSubmit={sendForm}>
        <input type="hidden" name="userId" value={userId} />

        <div className="profile-info__row profile-info__photo">
          <label htmlFor="photoFile">Фотография:</label>
          <input type="file" id="photoFile" name="filedata" accept=".jpg, .jpeg, .png" />
        </div>

        <div className="profile-info__send">
          <button type="submit" disabled={btnState}>Сохранить</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    profileModal: state.chatPageState.profileModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateAlertMessage: messageInfo => dispatch(actions.showAlertMessage(messageInfo)),
    updateProfile: operation => dispatch(actions.updateProfile(operation)),
    openProfileModal: isOpened => dispatch(actions.openProfileModal(isOpened)),
    activateSubstrate: isActivated => dispatch(actions.activateSubstrate(isActivated))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfo)
