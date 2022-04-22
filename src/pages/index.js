import '../pages/index.css';

// Импорт необходимых компонентов
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards} from '../utils/initialCards.js';
import {
  config,
  inputDescription,
  inputUser,
  buttonPopupAdd,
  popupAdd,
  buttonProfileEdit,  
  popupProfileEdit,
} from '../utils/constants.js';



/*const profile = document.querySelector('.profile');
const profileForm = popupProfileEdit.querySelector('.popup__form');
const profileUser = profile.querySelector('.profile__user');
const profileDescription = profile.querySelector('.profile__description');
const cardList = document.querySelector('.cards');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddTitle = popupAddForm.querySelector('.popup__input_type_title');
const popupAddLink = popupAddForm.querySelector('.popup__input_type_link');
*/

const profileValid = new FormValidator(config, popupProfileEdit);
const addCardValid = new FormValidator(config, popupAdd);

const userInfo = new UserInfo({
  name: '.profile__user',
  info: '.profile__description',
});
const popupWithImage = new PopupWithImage('.popup_type_open-image');

// Функция отрисовки карточки
const createCard = (data) => {
  const cardElement = new Card({
      data: data,
      handleCardClick: () => {
          popupWithImage.open(data);
      }
  }, '.elements');
  return cardElement.generateCard();
};

/*// Создание карточки 
const createCard = (item) => {
    const card = new Card(item, templateSelector, newPopupImage);
    const cardElement = card.generateCard();
    return cardElement;
}*/

// Создание карточек из массива initialCards
const initialCardsList = new Section({
  data: initialCards,
  renderer: (element) => {
      initialCardsList.addItem(createCard(element));
  }
}, '.cards');

// Создание экземпляра класса popup с сохранением новых данных о пользователе в функции
const popupEditProfile = new PopupWithForm('.popup_type_edit', (userData) => {
  userInfo.setUserInfo(userData);
});
// const popupEditProfile = new PopupWithForm(popupProfile, (userData) => {
//     userInfo.setUserInfo(userData);
// });
//Слушатель на кнопку открытия popup добавления фотографии
buttonPopupAdd.addEventListener('click', () => {
  addCardValid.resetValidation();
  popupAddCard.open();
});

// Слушатель на кнопку открытия popup редактирования профиля
buttonProfileEdit.addEventListener('click', () => {
  const {name, info} = userInfo.getUserInfo();  
  inputUser.value = name;
  inputDescription.value = info;
  popupEditProfile.open();
  profileValid.resetValidation();
});

//Создание новой карточки из формы добавления
const popupAddCard = new PopupWithForm('.popup_type_add', (values) => {
  initialCardsList.addItem(createCard(values));
  addCardValid.resetValidation();
});

initialCardsList.renderItems(); // Добавление первых 6-ти карточек на страницу
popupWithImage.setEventListeners(); // Слушатель на закрытие открытой фотографии
profileValid.enableValidation(); // Запуск валидации для формы редактирования профиля
popupEditProfile.setEventListeners(); // Слушатель в форме редактирования профиля
addCardValid.enableValidation(); // Запуск валидации для формы добавления карточки
popupAddCard.setEventListeners(); // Слушатель в форме добавления карточки

/*
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscButton);
}

// Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscButton);
}

// Функция обрабатывает клик по оверлею или крестику на любом попапе
function addListenerCloseButtonClick() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
      popup.addEventListener('mousedown', (event) => {
          if (!(event.target === event.currentTarget || event.target.classList.contains('button_type_close'))) {
              return;
          }
          closePopup(popup);
      });
  });
}

addListenerCloseButtonClick();

// закрытие по нажатию кнопки Escape
const closePopupOnEscButton = function (evt) {
  if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
};

//При открытии popup профиля, значения полей формы ввода заполняются из профиля
function showUserInfoPopup() {
  inputUser.value = profileUser.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
  profileFormValidator.resetValidation();
}

// Отправка формы (без отправки в настоящее время).
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUser.textContent = inputUser.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfileEdit);
}

//Создание карточки.
function createCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link,
    alt: `Изображение ${item.name}`
  },
  '.elements');
  const cardImage = card.generateCard();
  return cardImage;
}

// Функция добавления карточки на страницу в начало
const insertCard = (card) => {
  cardList.prepend(createCard(card));
};

// Заполнение полей формы новой карточки
function handleCardFormSubmit(e) {
  e.preventDefault();
  const cardsData = {
    link: popupAddLink.value,
    name: popupAddTitle.value,
    alt: `Изображение ${popupAddTitle.value}`
  };
  insertCard(cardsData);
  popupAddForm.reset();
  closePopup(popupAdd);
  addFormValidator.resetValidation();
};
popupAddForm.addEventListener('submit', handleCardFormSubmit);

// Прикрепляем обработчик к форме
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработка события открытия popup редактирования профиля и его заполнения данным из профиля
buttonProfileEdit.addEventListener('click', function () {
  profileFormValidator.resetValidation();
  openPopup(popupProfileEdit);
  showUserInfoPopup();
});

// Обработка события открытия popup редактирования профиля и его заполнения данным из профиля.
buttonProfileEdit.addEventListener('click', showUserInfoPopup);

// Обработка события открытия popup добавления карточки.
buttonPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// Вставляе карточки при первой загрузке.
initialCards.forEach(insertCard);
*/