const formSubmit = (event) => {
  event.preventDefault();
}

const checkButtonValidity = (config, popupForm, submitButton) => {
  if(popupForm.checkValidity()) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(config.inactiveButtonClass);
  } else {
      submitButton.setAttribute('disabled', '');
      submitButton.classList.add(config.inactiveButtonClass);
  }
}

const checkInputValidity = (config, popupForm, input) => {
  const errorMessage = popupForm.querySelector(`#error-${input.id}`);
  if(input.validity.valid) {
      errorMessage.textContent = '';
      input.classList.remove(config.inputErrorClass);
  } else {
      errorMessage.textContent = input.validationMessage;
      input.classList.add(config.inputErrorClass);
  }
}

function enableValidation(config) {
  const currentForm = document.querySelector(config.currentFormSelector);
  const popupForm = currentForm.querySelector(config.formSelector);
  popupForm.addEventListener('submit', formSubmit);
  const inputSelector = currentForm.querySelectorAll(config.inputSelector);
  const submitButton = currentForm.querySelector(config.submitButtonSelector);

  checkButtonValidity(config, popupForm, submitButton);

  inputSelector.forEach((input) => {
      input.addEventListener('input', () => {
          checkInputValidity(config, popupForm, input);
          checkButtonValidity(config, popupForm, submitButton);
      });
  });
}
