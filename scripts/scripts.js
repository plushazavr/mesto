const popupAddPlace = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupZoomImage = document.querySelector('.popup_type_open-image');
const closeButtonEditProfile = document.querySelector('.button_type_close_edit-profile');
const closeButtonAddPlace = document.querySelector('.button_type_close_add');
const closeButtonZoomImage = document.querySelector('.button_type_close_zoom-image');
const formEditProfile = document.querySelector('.popup__form_profile');
const formAddPlace = document.querySelector('.popup__form_add');
const profileEditButton = document.querySelector('.button_type_edit');
const profileAddButton = document.querySelector('.button_type_add');
const elements = document.querySelector('.cards');
const templateElement = document.querySelector('#elements').content;
const personInput = document.querySelector('.popup__input_type_user');
const aboutMeInput = document.querySelector('.popup__input_type_description');
const aboutMeProfile = document.querySelector('.profile__description');
const personProfile = document.querySelector('.profile__user');
const namePlaceInput = document.querySelector('.popup__input_type_title');
const linkPlaceInput = document.querySelector('.popup__input_type_link');
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

// Закрытие попапа по клику оверлей
const setOverlayListener = (evt) => {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.target === popupOpened) {
        closePopup(popupOpened);
    }
}
// Закрытие попапа через Esc
const setEscListener = (evt) => {
    const popupOpened = document.querySelector('.popup_opened')
    if(evt.key === 'Escape'){
        closePopup(popupOpened);
    }
}

// Заблокировать сабмит
function disableButton(popup, config) {
    const button = popup.querySelector(config.submitButtonSelector);
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'true')
}

// Закрытие попапа
const closePopup = (popup) => {
   popup.classList.remove('popup_opened');
   popup.removeEventListener('mousedown', setOverlayListener);
   document.removeEventListener('keydown', setEscListener)
}

// Открытие попапа
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', setOverlayListener);
    document.addEventListener('keydown', setEscListener)
}

// Первоначальная загрузка данных Редактировать профиль
const getFormEditProfile = () => {
  aboutMeInput.value = aboutMeProfile.textContent;
  personInput.value = personProfile.textContent;
  openPopup(popupEditProfile);
}

// Создание попапа Zooming Image
const zoomImageActive = (evt) => {
    const elementImage = evt.target.parentElement.querySelector('.element__image');
    const elementDescription = evt.target.parentElement.parentElement.querySelector('.element__caption');
    const cleanImage = document.querySelector('.popup__image');
    const cleanSubtitle = document.querySelector('.popup__image-title');

    cleanImage.src = elementImage.src;
    cleanImage.alt = elementImage.alt;
    cleanSubtitle.textContent = elementDescription.textContent;

    openPopup(popupZoomImage);
}





//Активация лайка
const likeActive = (evt) => {
    evt.target.classList.toggle('button_type_like_active');
}

//Удаление карточки
const trashActive = (evt) => {
    evt.target.parentElement.parentElement.remove();
}

 // Создание карточки
const createCard = (name, link) => {
    const element = templateElement.querySelector('.element').cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    const elementLike = element.querySelector('.button_type_like');
    const elementTrash = element.querySelector('.button_type_delete');

    elementTitle.textContent = name;
    elementImage.alt = name;
    elementImage.src = link;

    elementImage.addEventListener('click', zoomImageActive);
    elementLike.addEventListener('click', likeActive);
    elementTrash.addEventListener('click', trashActive);

    return element;
}

// Рендер стандартных карточек
initialCards.forEach(item => {
    elements.append(createCard(item.name, item.link));
});


// Добавление карточки в контейнер
const addCard = (container, createElement) => {
    container.prepend(createElement);
}

//Отправка формы Редактировать профиль
const handlerFormEditButton = (evt) => {
    evt.preventDefault();
    personProfile.textContent = personInput.value;
    aboutMeProfile.textContent = aboutMeInput.value;
    closePopup(popupEditProfile);
}

//Отправка формы Добавить место
const handlerFormAddPlace = (evt) => {
    evt.preventDefault();
    addCard(elements, createCard(namePlaceInput.value, linkPlaceInput.value));
    closePopup(popupAddPlace);
    document.getElementById('popup__form_add').reset();
    disableButton(formAddPlace, formValidationConfig)
}

//Закрытие попапов
closeButtonEditProfile.addEventListener('click', function () {closePopup(popupEditProfile)});
closeButtonAddPlace.addEventListener('click', function () {closePopup(popupAddPlace)});
closeButtonZoomImage.addEventListener('click', function () {closePopup(popupZoomImage)});
//Создание попапов
profileAddButton.addEventListener('click', function () {
    openPopup(popupAddPlace)

});
profileEditButton.addEventListener('click', function () {
    getFormEditProfile()
    openPopup(popupEditProfile)
});
//Отправка форм
formAddPlace.addEventListener('submit', handlerFormAddPlace);
formEditProfile.addEventListener('submit', handlerFormEditButton);

/*const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_type_submit_inactive',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_visible'
}*/
