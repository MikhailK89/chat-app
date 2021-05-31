import './headerStyles.scss'

import UserInfo from '../user_info/UserInfo'
import AppSettings from '../app_settings/AppSettings'

function Header(props) {
  return (
    <div className="chat__header">
      <AppSettings />
      <UserInfo user={props.user} />
    </div>
  )
}

export default Header
