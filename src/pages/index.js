import '../pages/index.css';

import { Card } from '../components/Card.js';
import FormValidator from '../scripts/FormValidator.js';

//карточки "коробки"
const initialCards = [
  {
    name: 'Зубатка',
    link: 'https://i.pinimg.com/originals/ee/e7/94/eee79455b14006ae5fb0e73e85a42077.jpg'
  },
  {
    name: 'Лежачий',
    link: 'https://i.pinimg.com/originals/e3/37/2e/e3372ea57712e4772284982f9bae167c.jpg'
  },
  {
    name: 'Почти котопес',
    link: 'https://i.pinimg.com/originals/60/6d/27/606d27e0e32e2e2ffbae7b3080d3b600.jpg'
  },
  {
    name: 'Возьми на постель',
    link: 'https://i.pinimg.com/originals/8e/5a/c4/8e5ac45f7b5836898a6058f38f8d5cf5.jpg'
  },
  {
    name: 'Дьявол',
    link: 'https://i.pinimg.com/564x/da/19/f7/da19f7b6d4f306e00b07953249024183.jpg'
  },
  {
    name: 'Я у мамы дурачок',
    link: 'https://i.pinimg.com/originals/50/bd/bd/50bdbda668486184990c980e9d766bdc.jpg'
  }
];

const config = {
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
const profile = document.querySelector('.profile');
const buttonProfileEdit = document.querySelector('.button_type_edit');
const popupProfileEdit = document.querySelector('.popup_type_edit');

// формы заполнения данных popup
const profileForm = popupProfileEdit.querySelector('.popup__form');
const inputUser = profileForm.querySelector('.popup__input_type_user');
const inputDescription = profileForm.querySelector('.popup__input_type_description');

//переменные данных профиля
const profileUser = profile.querySelector('.profile__user');
const profileDescription = profile.querySelector('.profile__description');

//карточки и шаблон
const cardList = document.querySelector('.cards');

//добавить карточку
const popupAdd = document.querySelector('.popup_type_add');
const buttonPopupAdd = document.querySelector('.button_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddTitle = popupAddForm.querySelector('.popup__input_type_title');
const popupAddLink = popupAddForm.querySelector('.popup__input_type_link');

// Создаем экземпляр класса для формы редактирования профиля
const profileFormValidator = new FormValidator(config, popupProfileEdit);
profileFormValidator.enableValidation();
// Создаем экземпляр класса для формы добавления карточки
const addFormValidator = new FormValidator(config, popupAdd);
addFormValidator.enableValidation();

//Открытие popup
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