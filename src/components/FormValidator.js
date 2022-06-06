export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(data.submitButtonSelector);
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._formErrorClass = data.formErrorClass;
    this._errorClass = data.errorClass;
  }
  
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState();
        });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}