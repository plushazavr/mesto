export default class UserInfo {
  constructor(userSelectors) {
    this._nameUser = document.querySelector(userSelectors.nameUser);
    this._infoUser = document.querySelector(userSelectors.infoUser);
  }

  getUserInfo() {
   this._userData = {
        name: this._nameUser.textContent,
        info: this._infoUser.textContent
    }
    return this._userData;
  }

  setUserInfo(userData) {
    this._nameUser.textContent = userData.name;
    this._infoUser.textContent = userData.info;
  }
}