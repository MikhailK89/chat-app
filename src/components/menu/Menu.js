import './menuStyles.scss'

import {connect} from 'react-redux'
import * as actions from '../../redux/actions'

function Menu(props) {
  const {user, menuIsActivated} = props

  const addClasses = menuIsActivated ? '' : ' hide'

  const addContacts = () => {
    props.toggleMenu(false)
    props.openFriendsModal(true)
    props.openContactsAdd(true)
  }

  const deleteContacts = () => {
    props.toggleMenu(false)
    props.openFriendsModal(true)
    props.openContactsDelete(true)
  }

  return (
    <div className={"header__menu" + addClasses}>
      <div className="menu__info">
        <div className="menu__photo"></div>
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
          <span className="menu__options-icon material-icons">portrait</span>
          <span className="menu__options-title">Добавить фотографию</span>
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
    openContactsDelete: isOpened => dispatch(actions.openContactsDelete(isOpened))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
