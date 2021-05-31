import './userInfoStyles.scss'

function UserInfo(props) {
  const user = props.user

  return (
    <div className="header__user-info">{user.userName}</div>
  )
}

export default UserInfo
