export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
  }
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState();
        });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
  }

  _getErrorElement = (inputElement) => {
    return inputElement
      .closest(this._data.popupForm)
      .querySelector(this._data.inputErrorClass)
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._data.formErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._data.formErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}