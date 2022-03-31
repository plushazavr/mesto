import {Card, popupImage, popupImgPhoto, popupImgText} from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

//карточки "коробки"
const initialCards = [
  {
    name: 'Новогодний наряд',
    link: 'images/dog-1.jpg'
  },
  {
    name: 'Пузико',
    link: 'images/dog-2.jpg'
  },
  {
    name: 'Ковбой',
    link: 'images/dog-4.jpg'
  },
  {
    name: 'Спим в дороге',
    link: 'images/dog-5.jpg'
  },
  {
    name: 'Дьявол',
    link: 'images/dog-6.jpg'
  },
  {
    name: 'Кроха',
    link: 'images/dog-7.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_inactive',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_visible'
};

//кнопки popup
const profile = document.querySelector('.profile');
const buttonProfileEdit = document.querySelector('.button_type_edit');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileClose = popupProfileEdit.querySelector('.button_type_close');
const buttonSubmitEdit = document.querySelector('.button_type_submit-edit');

// формы заполнения данных popup
const profileForm = popupProfileEdit.querySelector('.popup__form');
const inputUser = profileForm.querySelector('.popup__input_type_user');
const inputDescription = profileForm.querySelector('.popup__input_type_description');

//переменные данных профиля
const profileUser = profile.querySelector('.profile__user');
const profileDescription = profile.querySelector('.profile__description');

//карточки и шаблон
const cardList = document.querySelector('.cards');
const templateElement = document.querySelector('.elements');

//добавить карточку
const popupAdd = document.querySelector('.popup_type_add');
const buttonPopupAdd = document.querySelector('.button_type_add');
const buttonPopupClose = popupAdd.querySelector('.button_type_close');
const buttonSubmitAdd = popupAdd.querySelector('.button_type_submit-add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddTitle = popupAddForm.querySelector('.popup__input_type_title');
const popupAddLink = popupAddForm.querySelector('.popup__input_type_link');

//посмотреть фото
/*const popupImage = document.querySelector('.popup_type_open-image');
const popupImgText = popupImage.querySelector('.popup__image-title');
const popupImgPhoto = popupImage.querySelector('.popup__image');
const buttonPopupImgClose = popupImage.querySelector('.button_type_close');*/

// Создаем экземпляр класса для формы редактирования профиля
const profileFormValidator = new FormValidator(config, popupProfileEdit);
profileFormValidator.enableValidation();
// Создаем экземпляр класса для формы добавления карточки
const addFormValidator = new FormValidator(config, popupAdd);
addFormValidator.enableValidation();

// Функции

//Открытие popup.
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscButton);
}

// Закрытие popup.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscButton);
}

// Функция обрабатывает нажатие клик по оверлею или крестику на любом попапе
function addListenerCloseButtonClick() {
  // Добавим  обработчики события
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
      popup.addEventListener('click', (event) => {
          if (!(event.target === event.currentTarget || event.target.classList.contains('button_type_close'))) {
              return;
          }
          // Если событие произошло вызываем закрывающую функцию
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

//При открытии popup профиля, значения полей формы ввода заполняются из профиля.
function showUserInfoPopup() {
  inputUser.value = profileUser.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
  /*buttonSubmitEdit.classList.remove(config.inactiveButtonClass);
  buttonSubmitEdit.disabled = false;*/

  //При повторном открытии, после закрытия установим состояние кнопки
  profileFormValidator.resetValidation();
}

// Отправка формы (без отправки в настоящее время).
function fillSubmitHandler(evt) {
  // Отмена стандартной отправки формы.
  evt.preventDefault();
  // Присвоение значений в профиле равных значения в popup с помощью textContent.
  profileUser.textContent = inputUser.value;
  profileDescription.textContent = inputDescription.value;
  // Закрываем popup
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

// Заполнение полей формы новой карточки popupAdd
function handleCardFormSubmit(e) {
  e.preventDefault();
  const cardsData = {
    link: popupAddLink.value,
    name: popupAddTitle.value,
    alt: `Изображение ${popupAddTitle.value}`
  };
  insertCard(cardsData);
  /*const name = popupAddTitle.value;
  const link = popupAddLink.value;
  // Добавляем в  карточку  в начало
  addCard(name, link);*/

  // Очищаем поля popup
  popupAddForm.reset();
  // Закрываем popup
  closePopup(popupAdd);
  // Делаем неактивной кнопку добавления карточки при повторном открытии
  /*buttonSubmitAdd.classList.add(config.inactiveButtonClass);
  buttonSubmitAdd.setAttribute('disabled', '');*/
  addFormValidator.resetValidation();
};
popupAddForm.addEventListener('submit', handleCardFormSubmit);

// Прикрепляем обработчик к форме.
// он будет следить за событием “submit” - «отправка».
profileForm.addEventListener('submit', fillSubmitHandler);

// Обработка события открытия popup редактирования профиля и его заполнения данным из профиля.
buttonProfileEdit.addEventListener('click', function () {
  profileFormValidator.resetValidation();
  openPopup(popupProfileEdit);
  showUserInfoPopup();
});

// Прикрепляем обработчик к форме.
// он будет следить за событием “submit” - «отправка».
profileForm.addEventListener('submit', fillSubmitHandler);

// Обработка события открытия popup редактирования профиля и его заполнения данным из профиля.
buttonProfileEdit.addEventListener('click', showUserInfoPopup);

// Обработка события открытия popup добавления карточки.
buttonPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// Вставляе карточки при первой загрузке.
initialCards.forEach((item) => {
  insertCard(item);
});