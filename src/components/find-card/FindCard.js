import './findCard.scss'

import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateFriendsList} from '../../redux/actions'

import dbManager from '../../services/databaseManager'
import btnManager from '../../services/btnStateManager'

function FindCard(props) {
  const {findFriend, btnType} = props

  const userId = +useParams().id
  const friendId = findFriend.id
  const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))

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
      const dataReceive = await dbManager.addFriend({userId, friendId, tokenInfo})
      btnManager.saveBtnType(friendId, 'delete')
      setBtnState('delete')
      props.updateFriendsList(`add:${Date.now()}`)
    } else {
      const dataReceive = await dbManager.deleteFriend({userId, friendId, tokenInfo})
      btnManager.saveBtnType(friendId, 'add')
      setBtnState('add')
      props.updateFriendsList(`delete:${Date.now()}`)
    }
  }

  return (
    <div className="find-card">
      <div className="find-card__info">
        <div className="find-card__photo"></div>
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
    updateFriendsList: operation => dispatch(updateFriendsList(operation))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FindCard)
