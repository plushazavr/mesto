export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
  }

  // Устанавливаем слушатели
  _setEventListeners() {
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем checkInputValidity
            this._checkInputValidity(inputElement);
            // Вызовем toggleButtonState
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

  // Проверяет валидность поля, принимает inputElement — проверяемое поле ввода.
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
        //showInputError получает параметром форму, в которой находится проверяемое поле
        this._showError(inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        this._hideError(inputElement);
    }
  };

  _getErrorElement = (inputElement) => {
    return inputElement
      .closest('.form')
      .querySelector('.popup__error')
  }

  // Добавляет класс с ошибкой. Передаем текст ошибки вторым параметром.
  _showError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add('form__input_error');
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._data.errorClass);
  };

    // Удаляет класс с ошибкой.
    _hideError = (inputElement) => {
      // Находим элемент ошибки
      const errorElement = this._getErrorElement(inputElement);
      inputElement.classList.remove('form__input_error');
      // Скрываем сообщение об ошибке
      errorElement.classList.remove(this._data.errorClass);
      // Очистим ошибку
      errorElement.textContent = '';
    };

  // Проверяет все входы формы на валидность, чтобы предотвратить отправку,
  // если какой-либо из них не валиден
  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true  обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
  };

  // Принимает массив полей ввода и элемент кнопки, состояние которой нужно менять.
  // Отключает или включает видимое состояние кнопки
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
        // сделай кнопку неактивной
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    } else {
        // иначе сделай кнопку активной
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
  };

    // Вызов функции валидации
    enableValidation() {
      this._setEventListeners();
  }
}