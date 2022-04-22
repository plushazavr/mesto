export default class UserInfo {
  constructor({ name: nameUser, info: infoUser }) {
    this._nameUser = document.querySelector(nameUser);
    this._infoUser = document.querySelector(infoUser);
  }


  // Возвращает объект с данными пользователя
  getUserInfo() {
    const userData = {
        name: this._nameUser.textContent,
        info: this._infoUser.textContent
    }
    return userData;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, info }) {
    this._nameUser.textContent = name;
    this._infoUser.textContent = info;
  }
}