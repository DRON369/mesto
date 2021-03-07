import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageToView = this._popup.querySelector('.popup__image');
    this._imageToViewLabel = this._popup.querySelector('.popup__label_type_image');
  }

  open(name, link) {
    this._imageToView.src = link;
    this._imageToViewLabel.textContent = name;
    this._imageToView.alt = name;
    super.open();
  }
}