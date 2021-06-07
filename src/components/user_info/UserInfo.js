import './userInfoStyles.scss'

import {connect} from 'react-redux'

function UserInfo(props) {
  const friend = props.selectedFriend

  return (
    <div className="header__user-info">
      <span className="user-info__title">Ваш собеседник:</span>
      <br />
      <span className="user-info__name">{friend ? friend.userName : 'Выберите друга'}</span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFriend: state.chatPageState.selectedFriend
  }
}

export default connect(
  mapStateToProps,
  null
)(UserInfo)
