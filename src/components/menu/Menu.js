import './menuStyles.scss'

import {connect} from 'react-redux'
import {openFriendsModal, toggleMenu} from '../../redux/actions'

function Menu(props) {
  const {user, menuIsActivated} = props

  const addClasses = menuIsActivated ? '' : ' window__closed'

  const startFriendsSearch = () => {
    props.toggleMenu(false)
    props.openFriendsModal(true)
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
            onClick={startFriendsSearch}
          >Найти друзей</span>
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
    openFriendsModal: isOpened => dispatch(openFriendsModal(isOpened)),
    toggleMenu: isActivated => dispatch(toggleMenu(isActivated))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
