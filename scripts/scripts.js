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
const popupProfile = document.querySelector('.popup_type_edit');
const buttonProfileClose = popupProfile.querySelector('.button_type_close');

// формы заполнения данных popup
const profileForm = popupProfile.querySelector('.popup__form');
const inputUser = profileForm.querySelector('.popup__input_type_user');
const inputDescription = profileForm.querySelector('.popup__input_type_description');

//переменные данных профиля
const profileUser = profile.querySelector('.profile__user');
const profileDescription = profile.querySelector('.profile__description');

//карточки и шаблон
const cardsList = document.querySelector('.cards');
const templateElement = document.querySelector('.elements');

//добавить карточку
const popupAdd = document.querySelector('.popup_type_add');
const buttonPopupAdd = document.querySelector('.button_type_add');
const buttonPopupClose = popupAdd.querySelector('.button_type_close');
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



//открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListenerEscape();
}

//закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventListenerEscape();
}


//нажатие на всех popup
function addListenerCloseButtonClick() {
  //все popup
  const popups = document.querySelectorAll('.popup');
  //закрытие по нажатию на крестик и оверлей
  popups.forEach(popup => {
      popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget || event.target.classList.contains('button_type_close')) {
          closePopup(popup);
        }
      });
  });

}

addListenerCloseButtonClick();



//закрытие popup на esc
const closePopupOnEscButton = function (evt) {
  if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
};

//заполнение полей формы при открытии "ред-ть профиль"
function showUserInfoPopup() {
  inputUser.value = profileUser.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUser.textContent = inputUser.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
}

//поля формы новой карточки
popupAddForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = popupAddTitle.value;
  const link = popupAddLink.value;
  
  // Добавляем в  карточку  в начало
  addCard(name, link);
  // Очищаем поля popup
  popupAddForm.reset();
  // Закрываем popup
  closePopup(popupAdd);
});


//создать новую карточку
function createCard(name, link) {
  const card = templateElement.content.cloneNode(true);
  const elementImg = card.querySelector('.element__image');
  card.querySelector('.element__title').textContent = name;
  elementImg.src = link;
  elementImg.alt = name;
  // Лайк
  card.querySelector('.button_type_like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('button_type_like_active');
  });

  //удалить карточку
  card.querySelector('.button_type_delete').addEventListener('click', function (evt) {
      const removeCard = evt.target.closest('.element');
      removeCard.remove();
  });

  //посмотреть фото
  function handleImageClick() {
      popupImgPhoto.src = link;
      popupImgText.textContent = name;
      popupImgPhoto.alt = name;
      openPopup(popupImage);
  }

  elementImg.addEventListener('click', handleImageClick);
  return card;
}

//добавить карточку
const addCard = function (name, link) {
  const card = createCard(name, link);
  cardsList.prepend(card);
};



//заполнение начальной страницы
function initializeCards(arr) {
  arr.forEach((item) => {
      addCard(item.name, item.link, item.alt);
  });
}
initializeCards(initialCards);


//submit
profileForm.addEventListener('submit', handleProfileFormSubmit);

//открыть ред-е профиля
buttonProfileEdit.addEventListener('click', showUserInfoPopup);

//открыть добавление карточки
buttonPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});