export const config = {
  popupForm: '.form',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_inactive',
  inputErrorClass: '.popup__error',
  errorClass: 'popup__error_visible',
  formErrorClass: 'form__input_error'
};

//кнопки popup
export const profile = document.querySelector('.profile');
export const buttonProfileEdit = document.querySelector('.button_type_edit');
export const popupProfileEdit = document.querySelector('.popup_type_edit');

// формы заполнения данных popup
export const profileForm = popupProfileEdit.querySelector('.popup__form');
export const inputUser = profileForm.querySelector('.popup__input_type_user');
export const inputDescription = profileForm.querySelector('.popup__input_type_description');

//переменные данных профиля
export const profileUser = profile.querySelector('.profile__user');
export const profileDescription = profile.querySelector('.profile__description');

//карточки и шаблон
export const cardList = document.querySelector('.cards');

//добавить карточку
export const popupAdd = document.querySelector('.popup_type_add');
export const buttonPopupAdd = document.querySelector('.button_type_add');
export const popupAddForm = popupAdd.querySelector('.popup__form');
export const popupAddTitle = popupAddForm.querySelector('.popup__input_type_title');
export const popupAddLink = popupAddForm.querySelector('.popup__input_type_link');

// popup "просмотр фото"
export const popupImage = document.querySelector('.popup_type_open-image');
export const popupImgText = popupImage.querySelector('.popup__image-title');
export const popupImgPhoto = popupImage.querySelector('.popup__image');