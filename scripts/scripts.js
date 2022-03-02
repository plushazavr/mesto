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

const sectionElements = document.querySelector('.cards');
const template = document.querySelector('.elements').content;
const popups = document.querySelector('.popup');


const buttonProfileEditOpen = document.querySelector('.button_type_edit');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileClose = document.querySelector('.button_type_close');


const formProfileEdit = document.querySelector('.popup__form_profile');
const nameInput = formProfileEdit.querySelector('.popup__input_type_user');
const nicknameInput = formProfileEdit.querySelector('.popup__input_type_description');
const profielName = document.querySelector('.profile__user');
const profileNickname = document.querySelector('.profile__description');


const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddCardOpen = document.querySelector('.button_type_add');
const buttonAddCardClose = document.querySelector('.button_type_close');
const cardInput = document.querySelector('.popup__input_type_title');
const cardImage = document.querySelector('.popup__input_type_link');
const formAddCard = document.querySelector('.popup__form_add');


const imagePopup = document.querySelector('.popup_type_open-image');
const imagePopupItem = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__image-title');
const closePopupImageButton = document.querySelector('.button_type_close');



function render(card) {
  card.forEach((card) => sectionElements.append(createCard(card)));
}


function createCard(item) {
  const newElement = template.cloneNode(true);
  const cardPhoto = newElement.querySelector('.element__image');
  cardPhoto.src = item.link;
  newElement.querySelector('.element__title').textContent = item.name;
  cardPhoto.alt = item.name;
  newElement.querySelector('.button_type_like').addEventListener('click', likeFunction);
  newElement.querySelector('.button_type_delete').addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', () => openImagePopup(item.name, item.link));
  
  return newElement;
}

render(initialCards);


function openPopupProfile() {
  nameInput.value = profielName.textContent;
  nicknameInput.value = profileNickname.textContent;
  openPopup(popupProfileEdit);
  enableValidation({
    formSelector: '.popup__form',
    currentFormSelector: '.popup_opened',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_submit',
    inactiveButtonClass: 'button_type_submit_inactive',
    inputErrorClass: 'popup__input_type_error-message'
  }); 
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupWithClickOnOverlay);
  document.addEventListener('keydown', closeByEscape);
}


function closeByEscape(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


function closePopupProfile() {
  closePopup(popupProfileEdit);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupWithClickOnOverlay);
  document.removeEventListener('keydown', closeByEscape);
}


function closePopupWithClickOnOverlay(popup) {
  if(popup.target === popup.currentTarget) {
    closePopup(popup.target);
  }
}


buttonProfileEditOpen.addEventListener('click', openPopupProfile);
buttonProfileClose.addEventListener('click', closePopupProfile);



function handleProfileFormSubmit(event) {
  event.preventDefault();
  profielName.textContent = nameInput.value;
  profileNickname.textContent = nicknameInput.value;
  closePopupProfile();
}


formProfileEdit.addEventListener('submit', handleProfileFormSubmit);


function openPopupCardWindow() {
  openPopup(popupAddCard);
  enableValidation({
    formSelector: '.popup__form',
    currentFormSelector: '.popup_opened',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error-message'
  }); 
}

function closePopupCardWindow() {
  closePopup(popupAddCard);
}


buttonAddCardOpen.addEventListener('click', openPopupCardWindow);
buttonAddCardClose.addEventListener('click', closePopupCardWindow);


function cardSubmitHandler(event) {
  event.preventDefault();
  const newCard = 
    {
      name: cardInput.value,
      link: cardImage.value
    };
  cardInput.value = '';
  cardImage.value = '';

  sectionElements.prepend(createCard(newCard));
  closePopupCardWindow();
}


formAddCard.addEventListener('submit', cardSubmitHandler);


function likeFunction(e) {
  e.target.classList.toggle('button_type_like_active');
}


function deleteCard(e) {
  e.target.closest('.element').remove();
}


function openImagePopup(name, link) {
  openPopup(imagePopup);
  imagePopupItem.src = link;
  imagePopupCaption.textContent = name;
  imagePopupItem.alt = name;
}


function closeImagePopup() {
  closePopup(imagePopup);
}

closePopupImageButton.addEventListener('click', closeImagePopup);