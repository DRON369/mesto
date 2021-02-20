import { initialCards } from '../utils/constants.js'

export default class Card {

  constructor({ placeLabel, placeImage }, cardTemplateSelector, handleCardClick) {
    this._cardName = placeLabel;
    this._cardImageLink = placeImage;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
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
    event.target.closest('.cards__item').remove();
  }

  _setEventListeners() {
    this._card.querySelector('.cards__like-button').addEventListener('click', (event) => {
      this._likeCardHandler(event);
    });

    this._card.querySelector('.cards__remove-button').addEventListener('click', (event) => {
      this._removeCardHandler(event);
    });

    this._card.querySelector('.cards__image').addEventListener('click', (event) => {
      this._handleCardClick(event);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    const cardLabel = this._card.querySelector('.cards__label');
    const cardImage = this._card.querySelector('.cards__image');

    cardLabel.textContent = this._cardName;
    cardImage.src = this._cardImageLink;
    cardImage.alt = this._cardName;

    this._setEventListeners();
    return this._card;
  };

}
