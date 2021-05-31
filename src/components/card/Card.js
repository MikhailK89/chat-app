import './cardStyles.scss'

function Card(props) {
  const {friend, cardClickHandler} = props

  return (
    <div className="contacts__card" onClick={cardClickHandler}>
      <div className="card__photo"></div>

      <div className="card__info">
        <div className="info__name">{friend.userName}</div>
        <div className="info__status">online</div>
      </div>
    </div>
  )
}

export default Card
