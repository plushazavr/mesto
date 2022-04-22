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
            // Внутри колбэка вызовем isValid
            this._isValid(inputElement);
            // Вызовем toggleButtonState
            this._toggleButtonState();
        });
    });
  }

  // Сбросим ошибки и приведем кнопку в неактивное состояние
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }

  // Проверяет валидность поля, принимает inputElement — проверяемое поле ввода.
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
        //showInputError получает параметром форму, в которой находится проверяемое поле
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        this._hideInputError(inputElement);
    }
  }

   //для поиска нужного input вместо id
  _getErrorElement = (inputElement) => {
    return inputElement
      .closest(this._data.popupForm)
      .querySelector(this._data.inputErrorClass)
  }

  // Добавляет класс с ошибкой. Передаем текст ошибки вторым параметром.
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._data.formErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._data.errorClass);
  }

   // Удаляет класс с ошибкой.
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._data.formErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._data.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  }

  // Проверяет все входы формы на валидность, чтобы предотвратить отправку,
    // если какой-либо из них не валиден
  _hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true  обход массива прекратится и вся функция
          // hasInvalidInput вернёт true
         return !inputElement.validity.valid;
      });
  }

  // Принимает массив полей ввода и элемент кнопки, состояние которой нужно менять.
    // Отключает или включает видимое состояние кнопки
  _toggleButtonState = () => {
      // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    }
  }

  // Вызов функции валидации
  enableValidation() {
    this._setEventListeners();
}
}



/*export default class FormValidator {
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
}*/