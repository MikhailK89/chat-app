import './findCard.scss'

function FindCard(props) {
  const {findFriend} = props

  return (
    <div className="find-card">
      <div className="find-card__info">
        <div className="find-card__photo"></div>
        <div className="find-card__name">{findFriend.userName}</div>
      </div>
      <button className="find-card__add">Добавить</button>
    </div>
  )
}

export default FindCard
