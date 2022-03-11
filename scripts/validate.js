const getErrorElement = (inputElement) => {
  return inputElement
    .closest('.form')
    .querySelector('.popup__error')
}

const showError = (formElement, inputElement, errorMessage, {errorClass}) => {
  const errorElement = getErrorElement(inputElement); 
  inputElement.classList.add('form__input_error');
  errorElement.textContent = errorMessage;    
  errorElement.classList.add(errorClass); 
}

const hideError = (formElement, inputElement, {errorClass}) => {
  const errorElement = getErrorElement(inputElement);
  inputElement.classList.remove('form__input_error');
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);  
}


const checkInputValidity = (formElement, inputElement, enums) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, enums);
  } else {
    hideError(formElement, inputElement, enums);
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
      return !inputElement.validity.valid;
  });
};


const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled')
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  }
  else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();          
      });
      setEventListeners(formElement, rest);
  });
};


enableValidation(config);
