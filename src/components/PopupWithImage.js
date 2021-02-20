import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, cardElement) {
    super(popupSelector);
    this._cardElement = cardElement;
  }

  open() {
    const imageToView = this._popup.querySelector('.image-box__image');
    const imageToViewLabel = this._popup.querySelector('.image-box__label');
    imageToView.src = this._cardElement._cardImageLink;
    imageToViewLabel.textContent = this._cardElement._cardName;
    imageToView.alt = this._cardElement._cardName;;
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

}