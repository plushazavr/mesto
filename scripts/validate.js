const enableValidation = data => {
  const forms = [...document.querySelectorAll(data.formSelector)]
  forms.forEach(form => addFormsListener(form, data))
}

// Добавление форм
const addFormsListener = (form, config) => {
  form.addEventListener('submit', handleSubmit)
  form.addEventListener('input', () => setSubmitButtonState(form, config))

  const inputs = [...form.querySelectorAll(config.inputSelector)]
  inputs.forEach(input => input.addEventListener('input', () => handleField(form, input, config)))

  setSubmitButtonState(form, config);
}

//Сбор отправки формы
const handleSubmit = evt => {
  evt.preventDefault()
}

//Проверка на волидность формы
const handleField = (form, input, config) => {
  if (input.validity.valid) {
      hideErrors(form, input, config)
  } else {
      showErrors(form, input, config)
  }
}

//Показать ошибки
const showErrors = (form, input, config) => {
  input.classList.add(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage
}

//Убрать ошибки
const hideErrors = (form, input, config) => {
  input.classList.remove(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = ''
}

// Проверка состояния кнопки сабмит
const setSubmitButtonState = (form, config) => {
  const button = form.querySelector(config.submitButtonSelector)
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

enableValidation(formValidationConfig);


