export default class FormValidator {

  constructor(validationConfig, formElement) {
    this._form = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
    this._submitButtonDisabledSelector = validationConfig.submitButtonDisabledSelector;
    this._inputInvalidSelector = validationConfig.inputInvalidSelector;
  }

  enableValidation() {
    this._disableValidation();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._setButtonState();
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalidSelector);
  };

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputInvalidSelector);
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  _setButtonState() {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._submitButtonDisabledSelector);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._submitButtonDisabledSelector);
      this._submitButton.disabled = true;
    }
  };

  _setEventListeners() {
    const inputList = this._form.querySelectorAll(this._inputSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState();
      });
    });
  };

  _disableValidation() {
    const inputList = this._form.querySelectorAll(this._inputSelector);
    inputList.forEach((input) => {
      this._hideError(input);
    });
  }

}