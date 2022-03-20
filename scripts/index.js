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
const popupImage = document.querySelector('.popup_type_open-image');
const popupImgText = popupImage.querySelector('.popup__image-title');
const popupImgPhoto = popupImage.querySelector('.popup__image');
const buttonPopupImgClose = popupImage.querySelector('.button_type_close');

function addEventListenerEscape() {
  document.addEventListener('keydown', closePopupOnEscButton);
}

function removeEventListenerEscape() {
  document.removeEventListener('keydown', closePopupOnEscButton);
}

// Функции.
//Открытие popup.
function openPopup(popup) {
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
  buttonSubmitEdit.classList.remove(config.inactiveButtonClass);
  buttonSubmitEdit.disabled = false;
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

// Заполнение полей формы новой карточки popupAdd
function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = popupAddTitle.value;
  const link = popupAddLink.value;
  // Добавляем в  карточку  в начало
  addCard(name, link);
  // Очищаем поля popup
  popupAddForm.reset();
  // Закрываем popup
  closePopup(popupAdd);
  // Делаем неактивной кнопку добавления карточки при повторном открытии
  buttonSubmitAdd.classList.add(config.inactiveButtonClass);
  buttonSubmitAdd.setAttribute('disabled', '');
};
popupAddForm.addEventListener('submit', handleCardFormSubmit)

// Создание карточки.
function createCard(name, link) {
  const card = templateElement.content.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  card.querySelector('.element__title').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  // Лайк
  card.querySelector('.button_type_like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('button_type_like_active');
  });

  // Удаление
  card.querySelector('.button_type_delete').addEventListener('click', function (evt) {
      const removeCard = evt.target.closest('.element');
      removeCard.remove();
  });

  card.querySelector('.element__image').addEventListener('click', () => clickImageHandler(name, link));
  return card;
}

// Открытие popup показа фотографий.
function clickImageHandler(name, link) {
  popupImgPhoto.src = link;
  popupImgPhoto.alt = name;
  popupImgText.textContent = name;
  openPopup(popupImage);
};


// Добавление карточки.
const addCard = function (name, link) {
  const card = createCard(name, link);
  cardList.prepend(card);
};

//Заполнение начальной страницы 6-ю карточками.
function initializeCards(arr) {
  arr.forEach((item) => {
      addCard(item.name, item.link, item.alt);
  });
}

// Запускаем заполнение начальной страницы
initializeCards(initialCards);

// Прикрепляем обработчик к форме.
// он будет следить за событием “submit” - «отправка».
profileForm.addEventListener('submit', fillSubmitHandler);

// Обработка события открытия popup редактирования профиля и его заполнения данным из профиля.
buttonProfileEdit.addEventListener('click', showUserInfoPopup);

// Обработка события открытия popup добавления карточки.
buttonPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});