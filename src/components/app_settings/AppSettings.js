import './appSettingsStyles.scss'

import {connect} from 'react-redux'
import * as actions from '../../redux/actions'

function AppSettings(props) {
  const {menuIsActivated, toggleUserMenu} = props

  let addClasses = ''

  if (menuIsActivated) {
    addClasses += ' app-settings__icon-active'
  }

  const handleMenuBtnClick = () => {
    if (menuIsActivated) {
      toggleUserMenu(false)
    } else {
      toggleUserMenu(true)
    }
  }

  return (
    <div className="header__app-settings">
      <span
        className={"app-settings__icon material-icons" + addClasses}
        onClick={handleMenuBtnClick}
      >menu</span>
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
    toggleUserMenu: isActivated => dispatch(actions.toggleMenu(isActivated))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettings)
