import './filterStyles.scss'

import {connect} from 'react-redux'
import {filterContacts} from '../../redux/actions'

function Filter(props) {
  const filterHandler = e => {
    props.filterContacts(e.target.value)
  }

  return (
    <div className="contacts__filter">
      <div className="filter__search-line">
        <input
          className="filter__input"
          type="text"
          onChange={filterHandler}
          value={props.filterContactsText}
          placeholder="Поиск в контактах"
        />
        <span className="material-icons">search</span>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filterContactsText: state.chatPageState.filterContactsText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterContacts: text => dispatch(filterContacts(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
