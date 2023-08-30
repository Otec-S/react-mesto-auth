class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //вспомогательный метод
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  //отправляет запрос на добавление карточки на сервер
  setCard(newCardName, newCardLink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  //принимает имя и статус и отправляет его на сервер
  setUserId(newUserName, newUserStatus) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserStatus,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //принимает ссылку на новый аватар и отправляет его на сервер
  setAvatar(newAvatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then(this._handleResponse);
  }
}

//экземпляр класса Api с моими параметрами и токеном
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-70",
  headers: {
    authorization: "6485611d-59cd-4b63-ae62-8d988da14a3a",
    "Content-Type": "application/json",
  },
});

export default api;
