class BtnStateManager {
  btnTypes = {}

  saveBtnType(id, btnType) {
    this.btnTypes[id.toString()] = btnType
  }

  getBtnType(id) {
    if (this.btnTypes.hasOwnProperty(id.toString())) {
      return this.btnTypes[id.toString()]
    } else {
      return null
    }
  }

  clearBtnTypes() {
    this.btnTypes = {}
  }
}

export default new BtnStateManager()
