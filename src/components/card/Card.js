import './cardStyles.scss'

import {useState, useEffect} from 'react'
import dbManager from '../../services/databaseManager'

function Card(props) {
  const {friend, cardClickHandler} = props

  const [onlineStatus, setOnlineStatus] = useState('offline')

  const addClasses = onlineStatus === 'online' ? ' online' : ' offline'

  const getOnlineStatus = async () => {
    const res = await dbManager.getOnlineStatus({friendId: friend.id})
    const {status} = res
    setOnlineStatus(status)
  }

  useEffect(() => {
    getOnlineStatus()

    const interval = setInterval(() => {
      getOnlineStatus()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="contacts__card" onClick={cardClickHandler}>
      <div className="card__photo"></div>

      <div className="card__info">
        <div className="info__name">{friend.userName}</div>
        <div className={"info__status" + addClasses}>
          {onlineStatus === 'online' ? 'онлайн' : 'офлайн'}
        </div>
      </div>
    </div>
  )
}

export default Card
