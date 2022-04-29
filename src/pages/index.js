import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {initialCards} from '../utils/initialCards.js';
import {
  config,
  inputDescription,
  inputUser,
  buttonPopupAdd,
  popupAdd,
  buttonProfileEdit,  
  popupProfileEdit,
  popupAddTitle,
  popupAddLink
} from '../utils/constants.js';


const profileValid = new FormValidator(config, popupProfileEdit);
const addCardValid = new FormValidator(config, popupAdd);
const userInfo = new UserInfo({
  nameUser: '.profile__user',
  infoUser: '.profile__description',
});
const popupWithImage = new PopupWithImage('.popup_type_open-image');

const createCard = (data) => {
  const cardElement = new Card({
      data: data,
      handleCardClick: () => {
          popupWithImage.open(data);
      }
  }, '.elements');
  return cardElement.generateCard();
};

const initialCardsList = new Section({
  data: initialCards,
  renderer: (element) => {
    initialCardsList.addItem(createCard(element));
  }
}, '.cards');

const popupEditProfile = new PopupWithForm('.popup_type_edit', {
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      name: inputUser.value,
      info: inputDescription.value
    })
  }
})

const openPopupEditForm = () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.open();
  inputUser.value = userData.name;
  inputDescription.value = userData.info;  
}

buttonProfileEdit.addEventListener('click', () => {
  openPopupEditForm();
  profileValid.resetValidation(); 
});

buttonPopupAdd.addEventListener('click', () => {
  addCardValid.resetValidation();
  popupAddCard.open();
});

const popupAddCard = new PopupWithForm('.popup_type_add', {
  handleFormSubmit: () => {
    const newCard = createCard({
      name: popupAddTitle.value,
      link: popupAddLink.value
    })
    initialCardsList.addItem(newCard)
  }
})
initialCardsList.renderItems()

initialCardsList.renderItems();
popupWithImage.setEventListeners();
profileValid.enableValidation();
popupEditProfile.setEventListeners();
addCardValid.enableValidation();
popupAddCard.setEventListeners();