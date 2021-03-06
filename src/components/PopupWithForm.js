import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  formLoadingEnable() {
    this._submitButton.textContent = 'Сохранение...';
  }

  formLoadingDisable() {
    this._submitButton.textContent = 'Сохранить';
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._formSubmitFunction);
    super.setEventListeners();
  }

 _formSubmitFunction = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
}