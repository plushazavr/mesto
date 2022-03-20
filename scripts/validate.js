const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_inactive',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_visible'
};

const getErrorElement = (inputElement) => {
  return inputElement
    .closest('.form')
    .querySelector('.popup__error')
}

// Перебирает все формы на странице
const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы.
      setEventListeners(formElement,config);
  });
};

// Принимает параметром элемент формы и добавляет ее полям нужные обработчики
const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
          checkInputValidity(formElement, inputElement, config);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять и отключает или включает кнопку
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};


// Функция, которая проверяет валидность поля, принимает formElement и inputElement:
// formElement — html-элемент формы, в которой находится проверяемое поле ввода,
// он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
      //showError получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
      // Если проходит, скроем
      hideError(formElement, inputElement, config);
  }
};

// Функция, которая добавляет класс с ошибкой. Передадим текст ошибки вторым параметром
const showError = (formElement, inputElement, errorMessage, config) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = getErrorElement(inputElement);
  inputElement.classList.add('form__input_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(config.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = getErrorElement(inputElement);
  inputElement.classList.remove('form__input_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция принимает массив полей и вернет true если все поля валидны или false если нет
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true  обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
  });
};

// Вызовем функцию
enableValidation(config);