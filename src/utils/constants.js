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

export const profile = document.querySelector('.profile');
export const buttonProfileEdit = document.querySelector('.button_type_edit');
export const popupProfileEdit = document.querySelector('.popup_type_edit');
export const profileForm = popupProfileEdit.querySelector('.popup__form');
export const inputUser = profileForm.querySelector('.popup__input_type_user');
export const inputDescription = profileForm.querySelector('.popup__input_type_description');
export const profileUser = profile.querySelector('.profile__user');
export const profileDescription = profile.querySelector('.profile__description');
export const cardList = document.querySelector('.cards');
export const popupAdd = document.querySelector('.popup_type_add');
export const buttonPopupAdd = document.querySelector('.button_type_add');
export const popupAddForm = popupAdd.querySelector('.popup__form');
export const popupAddTitle = popupAddForm.querySelector('.popup__input_type_title');
export const popupAddLink = popupAddForm.querySelector('.popup__input_type_link');
export const popupImage = document.querySelector('.popup_type_open-image');
export const popupImgText = popupImage.querySelector('.popup__image-title');
export const popupImgPhoto = popupImage.querySelector('.popup__image');

export const popupAvatarEdit = document.querySelector('.popup_type_avatar');
export const avatarForm = popupAvatarEdit.querySelector('.popup__form');
export const popupAvatarSelector = '.popup_type_avatar';
export const buttonAvatarEdit = document.querySelector('.button_type_avatar-edit');

export const popupDeleteSelector = '.popup_type_delete';