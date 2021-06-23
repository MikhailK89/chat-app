import './profileInfoStyles.scss'

import dbManager from '../../../services/databaseManager'

function ProfileInfo() {
  const {userId} = JSON.parse(localStorage.getItem('authInfo'))

  const sendForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    if (formData.get('filedata')) {
      dbManager.sendProfileInfo(formData)
    }
  }

  return (
    <div className="modals__profile-info">
      <span className="profile-info__icon-close material-icons">close</span>
      <div className="profile-info__title">Профиль пользователя</div>

      <form onSubmit={sendForm}>
        <input type="hidden" name="userId" value={userId} />

        <div className="profile-info__row profile-info__photo">
          <label htmlFor="photoFile">Фотография:</label>
          <input type="file" id="photoFile" name="filedata" accept=".jpg, .jpeg, .png" />
        </div>

        <div className="profile-info__send">
          <input type="submit" value="Сохранить" />
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo
