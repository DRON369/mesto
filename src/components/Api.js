export default class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  }

  getCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  createCard({ name, link }) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    }).then(res => res.ok ? cardId : Promise.reject(`Ошибка ${res.status}`));
  }

  likeCard(cardId, like) {
    this._like = like ? 'PUT' : 'DELETE';
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: this._like,
      headers: {
        authorization: this._token,
      }
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  setAvatar(avatarLink) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  }

}