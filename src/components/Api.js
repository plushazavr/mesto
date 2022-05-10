export default class Api {
  constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
  }

  _checkResponseData(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: this._headers,
      })
          .then(this._checkResponseData);
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: this._headers
      })
          .then(this._checkResponseData);
  }

  setUserInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: userData.name,
              about: userData.about
          })
      })
          .then(this._checkResponseData);
  }

  addUserCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              link: data.link
          })
      })
          .then(this._checkResponseData);
  }

  deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers
      })
          .then(this._checkResponseData);
  }

  likeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
      })
          .then(this._checkResponseData);
  }

  dislikeCard(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
          method: 'DELETE',
          headers: this._headers,
      })
          .then(this._checkResponseData)
  }

  updateUserAvatar(data) {
      return fetch (`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.avatarLink
          })
      })
          .then(this._checkResponseData);
  }
}