import './filterStyles.scss'

function Filter() {
  return (
    <div className="contacts__filter">
      <input className="filter__input" type="text" placeholder="Type name" />
      <span className="material-icons">search</span>
    </div>
  )
}

export default Filter