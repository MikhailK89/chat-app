import './findCard.scss'
import defaultImg from '../../assets/images/default-find-card.png'

import {useState} from 'react'
import {connect} from 'react-redux'
import {updateFriendsList, showAlertMessage} from '../../redux/actions'
import * as helperFuncs from '../../shared/helperFuncs'
import dbManager from '../../services/databaseManager'
import dbMessages from '../../services/messagesTypes'
import btnManager from '../../services/btnStateManager'

function FindCard(props) {
  const {findFriend, btnType, activateAlertMessage} = props

  const {userId} = JSON.parse(localStorage.getItem('authInfo'))
  const friendId = findFriend.id

  const [btnState, setBtnState] = useState(btnType)

  const savedBtnState = btnManager.getBtnType(friendId)

  if (savedBtnState) {
    if (savedBtnState !== btnState) {
      setBtnState(savedBtnState)
    }
  }

  const addClasses = btnState === 'add' ? ' find-card__add' : ' find-card__delete'
  const addPhotoClasses = findFriend.profileImage ? ' transparent' : ''

  const btnHandler = async () => {
    let dbManagerFunc = null
    let newBtnState = null

    if (btnState === 'add') {
      dbManagerFunc = dbManager.addFriend
      newBtnState = 'delete'
    }

    if (btnState === 'delete') {
      dbManagerFunc = dbManager.deleteFriend
      newBtnState = 'add'
    }

    const dataReceive = await dbManagerFunc({userId, friendId})

    if (dataReceive.type === 'error') {
      activateAlertMessage({
        type: dataReceive.type,
        text: dbMessages[dataReceive.message],
        duration: 4000
      })

      return
    }

    props.updateFriendsList({
      type: btnState,
      status: 'send',
      action: 'updateFriendsList',
      userId,
      friendsIds: [friendId]
    })

    btnManager.saveBtnType(friendId, newBtnState)
    setBtnState(newBtnState)
  }

  return (
    <div className="find-card">
      <div className="find-card__info">
        <div className={"find-card__photo" + addPhotoClasses}>
          {findFriend.profileImage && <img
            src={helperFuncs.getImgPath(findFriend.profileImage, defaultImg)}
            alt={findFriend.userName}
          />}
        </div>

        <div className="find-card__name">{findFriend.userName}</div>
      </div>

      <button
        className={"find-card__btn" + addClasses}
        onClick={btnHandler}
      >{btnState === 'add' ? 'Добавить' : 'Удалить'}</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateFriendsList: operation => dispatch(updateFriendsList(operation)),
    activateAlertMessage: messageInfo => dispatch(showAlertMessage(messageInfo))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FindCard)
