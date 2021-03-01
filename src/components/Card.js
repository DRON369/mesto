export default class Card {

  constructor({ name, link, likes, myCard, cardId }, cardTemplateSelector, handleCardClick, handleDeleteClick) {
    this._cardName = name;
    this._cardImageLink = link;
    this._cardLikes = likes;
    this._myCard = myCard;
    this._cardId = cardId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _likeCardHandler(event) {
    event.target.closest('.cards__like-button').classList.toggle('cards__like-button_liked');
  }

  _removeCardHandler(event) {
    this._handleDeleteClick(this._cardId);
  }

  _setEventListeners() {
    this._card.querySelector('.cards__like-button').addEventListener('click', (event) => {
      this._likeCardHandler(event);
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

  generateCard() {
    this._card = this._getTemplate();
    const cardContainer = this._card.querySelector('.cards__item')
    const cardLabel = this._card.querySelector('.cards__label');
    const cardImage = this._card.querySelector('.cards__image');
    const cardLikes = this._card.querySelector('.cards__likes-counter');
    const cardDeleteButton = this._card.querySelector('.cards__remove-button');

    if (!this._myCard) {
      cardDeleteButton.hidden = true;
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