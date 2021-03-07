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
    this._handleLikeClick(this._cardId, this._like, this);
    this.like();
  }

  updateLikes(newLikes) {
    this._cardLikesCounter.textContent = newLikes.length;
    this._cardLikeToggle.classList.toggle('cards__like-button_liked');
  }

  _removeCardHandler() {
    this._handleDeleteClick(this._cardId);
  }

  _setEventListeners() {
    this._cardLikeToggle.addEventListener('click', () => {
      this._likeCardHandler();
    });

    if (this._myCard) {
      this._cardDeleteButton.addEventListener('click', (event) => {
        this._removeCardHandler(event);
      });
    }

    this._cardImage.addEventListener('click', (event) => {
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
    return this._result;
  }

  like() {
    this._like = !this._like;
  }

  generateCard() {

    this._card = this._getTemplate();
    this._cardContainer = this._card.querySelector('.cards__item');
    this._cardLabel = this._card.querySelector('.cards__label');
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardLikesCounter = this._card.querySelector('.cards__likes-counter');
    this._cardLikeToggle = this._card.querySelector('.cards__like-button');
    this._cardDeleteButton = this._card.querySelector('.cards__remove-button');

    if (!this._myCard) {
      this._cardDeleteButton.hidden = true;
    }
    this._like = this._checkMyLike();

    if (this._like) {
      this._cardLikeToggle.classList.add('cards__like-button_liked');
    }

    this._cardContainer.id = this._cardId;
    this._cardLabel.textContent = this._cardName;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardName;
    this._cardLikesCounter.textContent = this._cardLikes.length;

    this._setEventListeners();
    return this._card;
  };

}
