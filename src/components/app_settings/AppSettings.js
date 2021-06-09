import './appSettingsStyles.scss'

import {connect} from 'react-redux'
import {toggleMenu} from '../../redux/actions'

function AppSettings(props) {
  const {menuIsActivated, toggleUserMenu} = props

  let addClasses = ''

  if (menuIsActivated) {
    addClasses += ' app-settings__icon-active'
  }

  const handleMenuBtnClick = () => toggleUserMenu(menuIsActivated ? false : true)

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
    toggleUserMenu: isActivated => dispatch(toggleMenu(isActivated))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettings)
