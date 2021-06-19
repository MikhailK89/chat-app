import './headerStyles.scss'

import UserInfo from '../user_info/UserInfo'
import AppSettings from '../app_settings/AppSettings'
import Menu from '../menu/Menu'

function Header(props) {
  return (
    <div className="chat__header">
      <Menu user={props.user} />
      <AppSettings />
      <UserInfo />
    </div>
  )
}

export default Header
