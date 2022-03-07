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

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkValidity(formElement, inputElement);
    });
  });
}



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