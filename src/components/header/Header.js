import './headerStyles.scss'

import {connect} from 'react-redux'

import UserInfo from '../user_info/UserInfo'
import AppSettings from '../app_settings/AppSettings'
import Menu from '../menu/Menu'

function Header(props) {
  return (
    <div className="chat__header">
      {props.menuIsActivated && <Menu user={props.user} />}
      <AppSettings />
      <UserInfo user={props.user} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    menuIsActivated: state.chatPageState.menuIsActivated
  }
}

export default connect(
  mapStateToProps,
  null
)(Header)
