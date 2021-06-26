import './cardStyles.scss'
import defaultImg from '../../assets/images/default-contacts.png'

import {useState, useEffect} from 'react'
import * as helperFuncs from '../../shared/helperFuncs'
import dbManager from '../../services/databaseManager'

function Card(props) {
  const {friend, cardClickHandler} = props

  const [onlineStatus, setOnlineStatus] = useState('offline')

  const addClasses = onlineStatus === 'online' ? ' online' : ' offline'
  const addPhotoClasses = friend.profileImage ? ' transparent' : ''

  const getOnlineStatus = async () => {
    const res = await dbManager.getOnlineStatus({friendId: friend.id})

    if (res.type === 'error') {
      setOnlineStatus('offline')
      return
    }

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
      <div className={"card__photo" + addPhotoClasses}>
        {friend.profileImage && <img
          src={helperFuncs.getImgPath(friend.profileImage, defaultImg)}
          alt={friend.userName}
        />}
      </div>

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
