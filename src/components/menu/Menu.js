import './menuStyles.scss'

import {connect} from 'react-redux'
import * as actions from '../../redux/actions'
import {domain} from '../../settings/fetchSettings'

function Menu(props) {
  const {user, menuIsActivated} = props

  const addClasses = menuIsActivated ? '' : ' hide'

  const addContacts = () => {
    props.toggleMenu(false)
    props.openFriendsModal(true)
    props.openContactsAdd(true)
    props.activateSubstrate(true)
  }

  const deleteContacts = () => {
    props.toggleMenu(false)
    props.openFriendsModal(true)
    props.openContactsDelete(true)
    props.activateSubstrate(true)
  }

  const editProfile = () => {
    props.toggleMenu(false)
    props.openProfileModal(true)
    props.activateSubstrate(true)
  }

  const getImgPath = () => {
    const {profileImage} = user

    let imgPath = `${domain}/profiles/images/`

    if (profileImage !== '') {
      imgPath += profileImage
    } else {
      imgPath += 'default.jpg'
    }

    imgPath += `?dummy=${Date.now()}`

    return imgPath
  }

  return (
    <div className={"header__menu" + addClasses}>
      <div className="menu__info">
        <div className="menu__photo">
          <img src={getImgPath()} alt={user.userName} />
        </div>

        <div className="menu__name">{user.userName}</div>
      </div>

      <div className="menu__options">
        <div className="menu__options-flex">
          <span className="menu__options-icon material-icons">search</span>
          <span
            className="menu__options-title"
            onClick={addContacts}
          >Добавить контакты</span>
        </div>

        <div className="menu__options-flex">
          <span className="menu__options-icon material-icons">person_remove</span>
          <span
            className="menu__options-title"
            onClick={deleteContacts}
          >Удалить контакты</span>
        </div>

        <div className="menu__options-flex">
          <span className="menu__options-icon material-icons">edit</span>
          <span
            className="menu__options-title"
            onClick={editProfile}
          >Редактировать профиль</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    menuIsActivated: state.chatPageState.menuIsActivated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: isActivated => dispatch(actions.toggleMenu(isActivated)),
    openFriendsModal: isOpened => dispatch(actions.openFriendsModal(isOpened)),
    openContactsAdd: isOpened => dispatch(actions.openContactsAdd(isOpened)),
    openContactsDelete: isOpened => dispatch(actions.openContactsDelete(isOpened)),
    openProfileModal: isOpened => dispatch(actions.openProfileModal(isOpened)),
    activateSubstrate: isActivated => dispatch(actions.activateSubstrate(isActivated))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
