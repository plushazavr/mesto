import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {initialCards} from '../utils/initialCards.js';
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  config,
  inputDescription,
  inputUser,
  buttonPopupAdd,
  popupAdd,
  buttonProfileEdit,  
  popupProfileEdit,
  avatarForm,
  popupAvatarSelector,
  buttonAvatarEdit,
  popupDeleteSelector,
} from '../utils/constants.js';

let userId = null;

const userInfo = new UserInfo({
  nameUser: '.profile__user',
  infoUser: '.profile__description',
  userAvatar: '.profile__avatar',
});
const popupWithImage = new PopupWithImage('.popup_type_open-image');
const deletePopup = new PopupWithConfirmation(popupDeleteSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
      authorization: '9e2d1a56-de8f-4b7e-b67f-fb6ac953a442',
      'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        initialCardsList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    })

const avatarEditPopup = new PopupWithForm(popupAvatarSelector, (values) => {
    avatarEditPopup.showLoading(true);
    api.updateUserAvatar(values)
        .then((data) => {
            userInfo.setUserAvatar(data);
            avatarEditPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarEditPopup.showLoading(false);
        })
});

const createCard = (data) => {
  const cardElement = new Card({
      data: data,
      handleCardClick: () => {
          popupWithImage.open(data);
      },
      handleCardDelete: () => {
          deletePopup.setSubmitAction(() => {
              deletePopup.showLoading('Удаление...');
              api.deleteCard(data._id)
                  .then(() => {
                      cardElement.deleteCard();
                      deletePopup.close();
                  })
                  .catch((err) => {
                      console.log(err);
                  })
                  .finally(() => {
                      deletePopup.showLoading(false);
                  })
          });
          deletePopup.open();
      },
      
      handleLikeClick: () => {
          cardElement.setLike() 
      }
  }, '.elements', api, userId);
  return cardElement.generateCard();
};

const initialCardsList = new Section({
  renderer: (data) => {
    initialCardsList.addItem(createCard(data));
  },
}, '.cards');

const popupAddCard = new PopupWithForm('.popup_type_add', (values) => {
  popupAddCard.showLoading('Сохранение...');
  api.addUserCard(values)
      .then((data) => {
        initialCardsList.addItem(createCard(data));
          popupAddCard.close();
      })
      .catch((error) => {
          console.error(error);
      })
      .finally(() => {
          popupAddCard.showLoading(false);
      })
});

const popupEditProfile = new PopupWithForm('.popup_type_edit', (userData) => {
  popupEditProfile.showLoading('Сохранение...')
  api.setUserInfo(userData)
      .then((data) => {
          userInfo.setUserInfo(data);
          popupEditProfile.close();
      })
      .catch((error) => {
          console.error(error);
      })
      .finally(() => {
          popupEditProfile.showLoading(false);
      })
});

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(config);


buttonPopupAdd.addEventListener('click', () => {
  formValidators.card.resetValidation();
  popupAddCard.open();  
});

buttonProfileEdit.addEventListener('click', () => {
  const {name, info} = userInfo.getUserInfo();
  inputUser.value = name;
  inputDescription.value = info;
  popupEditProfile.open();
});

buttonAvatarEdit.addEventListener('click', () => {
  formValidators.avatar.resetValidation();
  avatarEditPopup.open();  
});

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
avatarEditPopup.setEventListeners();
deletePopup.setEventListeners();