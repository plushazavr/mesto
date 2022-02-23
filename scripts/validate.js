// Перебирает все формы на странице
const enableValidation = (enableValidation) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы.
      setEventListeners(formElement,enableValidation);
  });
};

// Принимает параметром элемент формы и добавляет ее полям нужные обработчики
const setEventListeners = (formElement, coenableValidationnfig) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, enableValidation);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
          isValid(formElement, inputElement, enableValidation);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          toggleButtonState(inputList, buttonElement, enableValidation);
      });
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять и отключает или включает кнопку
const toggleButtonState = (inputList, buttonElement, enableValidation) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(enableValidation.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(enableValidation.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};


// Функция, которая проверяет валидность поля, принимает formElement и inputElement:
// formElement — html-элемент формы, в которой находится проверяемое поле ввода,
// он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
const isValid = (formElement, inputElement, enableValidation) => {
  if (!inputElement.validity.valid) {
      //showInputError получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
  } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, enableValidation);
  }
};

// Функция, которая добавляет класс с ошибкой. Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage, enableValidation) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(enableValidation.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, enableValidation) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(enableValidation.errorClass);
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
enableValidation(enableValidation);