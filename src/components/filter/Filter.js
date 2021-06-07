import './filterStyles.scss'

function Filter() {
  return (
    <div className="contacts__filter">
      <input className="filter__input" type="text" placeholder="Поиск в контактах" />
      <span className="material-icons">search</span>
    </div>
  )
}

export default Filter