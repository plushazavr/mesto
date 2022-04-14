export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
  }

  // Устанавливаем слушателя
  _setEventListeners() {
    //валидность submit до ввода данных
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
  }


  //сбросить ошибки и submit неактивный
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideError(inputElement);
    });
  }

  // Проверяет валидность поля
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {        
        this._showError(inputElement, inputElement.validationMessage);
    } else {        
        this._hideError(inputElement);
    }
  };

  //для поиска нужного input вместо id
  _getErrorElement = (inputElement) => {
    return inputElement
      .closest(this._data.popupForm)
      .querySelector(this._data.inputErrorClass)
  }

  // Добавляет класс с ошибкой и текст ошибки
  _showError = (inputElement, errorMessage) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._data.formErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  };

    // Удаляет класс с ошибкой.
    _hideError = (inputElement) => {
      const errorElement = this._getErrorElement(inputElement);
      inputElement.classList.remove(this._data.formErrorClass);
      errorElement.classList.remove(this._data.errorClass);
      errorElement.textContent = '';
    };

  // Проверяет все входы формы на валидность, чтобы предотвратить отправку
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };
  
  // Отключает или включает видимое состояние кнопки
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
        this._buttonElement.disabled = true;
    } else {
        this._buttonElement.classList.remove(this._data.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
  };

    // Вызов функции валидации
    enableValidation() {
      this._setEventListeners();
  }
}