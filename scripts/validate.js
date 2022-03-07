const getErrorElement = (inputElement) => {
  return inputElement
    .closest('.popup')
    .querySelector('.popup__error')
}

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(inputElement);    
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMessage;
}

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
  
}

const checkValidity = (formElement, inputElement) => {
   const isInputNotValid = !inputElement.validity.valid;

   if (isInputNotValid) {
     const errorMessage = inputElement.validationMessage;
     showError(formElement, inputElement, errorMessage);
   } else {
     hideError(formElement, inputElement);
   }
}

const toggleButtonState = (inputList, submitButtonSelector) => {
  const hasInvalidInput = Array.from(inputList).some(inputElement => {
    return !inputElement.validity.valid
  });
  if (hasInvalidInput) {
    submitButtonSelector.classList.add('button_type_submit_inactive');
    submitButtonSelector.setAttribute("disable", true)
  } else {
    submitButtonSelector.classList.remove('button_type_submit_inactive');
    submitButtonSelector.sremoveAttribute("disable");
  }

}

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  const submitButtonSelector = formElement.querySelector('.button_type_submit');
  inputList.forEach(inputElement => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonSelector)
    };
    inputElement.addEventListener('input', handleInput);
  });
};



const enableValidation =  () => {
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();