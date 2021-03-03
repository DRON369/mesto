export default class Card {

  constructor({ name, link, likes, myCard, cardId, userId }, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardName = name;
    this._cardImageLink = link;
    this._cardLikes = likes;
    this._myCard = myCard;
    this._cardId = cardId;
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _likeCardHandler() {
    this._handleLikeClick(this._cardId, this._like);
    this.like();
  }

  _removeCardHandler() {
    this._handleDeleteClick(this._cardId);
  }

  _setEventListeners() {
    this._card.querySelector('.cards__like-button').addEventListener('click', () => {
      this._likeCardHandler();
    });

    if (this._myCard) {
      this._card.querySelector('.cards__remove-button').addEventListener('click', (event) => {
        this._removeCardHandler(event);
      });
    }

    this._card.querySelector('.cards__image').addEventListener('click', (event) => {
      this._handleCardClick(this._cardName, this._cardImageLink);
    });
  }

  _checkMyLike() {
    for (let i = 0; i < this._cardLikes.length; i++) {
      if (this._cardLikes[i]._id === this._userId) {
        this._result = true;
      } else {
        this._result = false;
      }
    }
    console.log('check ' + this._result);
    return this._result;
  }

  like() {
    this._like = !this._like;
  }

  generateCard() {
    this._card = this._getTemplate();
    const cardContainer = this._card.querySelector('.cards__item');
    const cardLabel = this._card.querySelector('.cards__label');
    const cardImage = this._card.querySelector('.cards__image');
    const cardLikes = this._card.querySelector('.cards__likes-counter');
    const cardDeleteButton = this._card.querySelector('.cards__remove-button');

    if (!this._myCard) {
      cardDeleteButton.hidden = true;
    }

    this._like = this._checkMyLike();

    if (this._checkMyLike()) {
      this._card.querySelector('.cards__like-button').classList.add('cards__like-button_liked');
    }

    cardContainer.id = this._cardId;
    cardLabel.textContent = this._cardName;
    cardImage.src = this._cardImageLink;
    cardImage.alt = this._cardName;
    cardLikes.textContent = (this._cardLikes.length);

    this._setEventListeners();
    return this._card;
  };

}
