// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_error_active'
}; 

// Перебирает все формы на странице
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((popupAddForm) => {
      setEventListeners(popupAddForm,config);
  });
};
