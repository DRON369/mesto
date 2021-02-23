import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    //! Необходимо удалить
    //!this._cardElement = cardElement;

  }

  open(name, link) {
    const imageToView = this._popupSelector.querySelector('.image-box__image');
    const imageToViewLabel = this._popupSelector.querySelector('.image-box__label');
    imageToView.src = link;
    imageToViewLabel.textContent = name;
    imageToView.alt = name;
    super.open();
    document.addEventListener('keydown', this._handleEscClose);
  }

}