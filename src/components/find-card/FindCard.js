import './findCard.scss'
import defaultImg from '../../assets/images/default.jpg'

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

  const btnHandler = async () => {
    if (btnState === 'add') {
      const dataReceive = await dbManager.addFriend({userId, friendId})

      if (dataReceive.type === 'error') {
        activateAlertMessage({
          type: dataReceive.type,
          text: dbMessages[dataReceive.message],
          duration: 4000
        })

        return
      }

      btnManager.saveBtnType(friendId, 'delete')
      setBtnState('delete')

      props.updateFriendsList({
        type: 'add',
        status: 'send',
        action: 'updateFriendsList',
        userId,
        friendsIds: [friendId]
      })
    } else {
      const dataReceive = await dbManager.deleteFriend({userId, friendId})

      if (dataReceive.type === 'error') {
        activateAlertMessage({
          type: dataReceive.type,
          text: dbMessages[dataReceive.message],
          duration: 4000
        })

        return
      }

      btnManager.saveBtnType(friendId, 'add')
      setBtnState('add')

      props.updateFriendsList({
        type: 'delete',
        status: 'send',
        action: 'updateFriendsList',
        userId,
        friendsIds: [friendId]
      })
    }
  }

  return (
    <div className="find-card">
      <div className="find-card__info">
        <div className="find-card__photo">
          <img
            src={helperFuncs.getImgPath(findFriend.profileImage, defaultImg)}
            alt={findFriend.userName}
          />
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
