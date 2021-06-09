import './menuStyles.scss'

function Menu(props) {
  const user = props.user

  return (
    <div className="header__menu">
      <div className="menu__info">
        <div className="menu__photo"></div>
        <div className="menu__name">{user.userName}</div>
      </div>

      <div className="menu__options">
        <div className="menu__options-flex">
          <span className="menu__options-icon material-icons">search</span>
          <span className="menu__options-title">Найти друзей</span>
        </div>

        <div className="menu__options-flex">
          <span className="menu__options-icon material-icons">portrait</span>
          <span className="menu__options-title">Добавить фотографию</span>
        </div>
      </div>
    </div>
  )
}

export default Menu
