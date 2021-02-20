

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');

  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        this.close();
      }
    })
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button') ?
      this._popup.querySelector('.popup__close-button') :
      this._popup.querySelector('.image-box__close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    })

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });

    this._handleEscClose();
  }
}