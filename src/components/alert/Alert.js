import './alertStyles.scss'

import {useEffect} from 'react'
import {connect} from 'react-redux'
import {showAlertMessage} from '../../redux/actions'

function Alert(props) {
  const {alertMessage, activateAlertMessage} = props

  const createClasses = () => {
    let addClasses = ''

    if (alertMessage) {
      addClasses += ` alert-show alert-${alertMessage.type}`
    } else {
      addClasses += ' window__closed'
    }

    return addClasses
  }

  useEffect(() => {
    let timeout = null

    if (alertMessage) {
      timeout = setTimeout(() => {
        activateAlertMessage(null)
      }, alertMessage.duration)
    }

    return () => clearTimeout(timeout)
  }, [alertMessage])

  return (
    <div className={"alert" + createClasses()}>
      <div className="alert__message">
        {alertMessage?.text}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    alertMessage: state.chatPageState.alertMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateAlertMessage: messageInfo => dispatch(showAlertMessage(messageInfo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert)
