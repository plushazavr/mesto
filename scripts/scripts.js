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
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonProfileClose = popupProfile.querySelector('.button_type_close');

// формы заполнения данных popup
const formPopup = popupProfile.querySelector('.popup__form');
const inputUser = formPopup.querySelector('.popup__input_type_user');
const inputDescription = formPopup.querySelector('.popup__input_type_description');

//переменные данных профиля
const profileUser = profile.querySelector('.profile__user');
const profileDescription = profile.querySelector('.profile__description');

//карточки и шаблон
const cardsList = document.querySelector('.card');
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


//открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


//нажатие на крестик на всех popup
function addListenerCloseButtonClick() {
  //все popup
  let popups = document.querySelectorAll('.popup');
  //закрытие по нажатию
  popups.forEach(popup => {
      popup.addEventListener('click', (event) => {
          if (!(event.target === event.target.classList.contains('button_type_close'))) {
              return;
          }
          closePopup(popup);
      });
  });

}

addListenerCloseButtonClick();


//заполнение полей формы при открытии "ред-ть профиль"
function showUserInfoPopup() {
  inputUser.value = profileUser.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}


function fillSubmitHandler(evt) {
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
  // Создаем карточку
  createCard(name, link);
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
  card.querySelector('.element__title').textContent = name;
  card.querySelector('.element__image').src = link;
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
  function clickImageHandler() {
      popupImgPhoto.src = link;
      popupImgText.textContent = name;
      openPopup(popupImage);
  }

  card.querySelector('.element__image').addEventListener('click', clickImageHandler);
  return card;
}

//добавить карточку
const addCard = function (name, link) {
  const card = createCard(name, link);
  cardsList.prepend(card);
};

//удаление карточки
function deleteCard(event) {
  const card = event.target.closest('.element');
  card.remove();
}

//заполнение начальной страницы
function initializeCards(arr) {
  arr.forEach((item) => {
      addCard(item.name, item.link, item.alt);
  });
}
initializeCards(initialCards);


//submit
formPopup.addEventListener('submit', fillSubmitHandler);

//открыть ред-е профиля
buttonProfileEdit.addEventListener('click', showUserInfoPopup);
//закрыть ред-е профиля
buttonProfileClose.addEventListener('click', () => {
  closePopup(popupProfile);
});

//открыть добавление карточки
buttonPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});
//закрыть добавление карточки
buttonPopupClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

//закрыть просмотр фото
buttonPopupImgClose.addEventListener('click', () => {
  closePopup(popupImage);
});