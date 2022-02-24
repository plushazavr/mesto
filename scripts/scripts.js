// Выбираем секцию elements в которой отрисовывем изначальные карточки из массива, выбираем template для картинок, которые будет отрисовывать по контенту, содержащемуся в нем.
const sectionElements = document.querySelector('.cards');
const template = document.querySelector('.elements').content;
const popups = document.querySelector('.popup');

// Создаем переменные для узлов кнопки редактирования профиля, блока попапа, в томч числе кнопки закрытия
const buttonProfileEditOpen = document.querySelector('.button_type_edit');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileClose = document.querySelector('.button_type_close');

// Создаем переменные для формы попапа, input-ов внутри формы, в которые вводятся измененные данные профиля, а также полей профиля которые будут отрисованы нами при загрузке страницы по умолчанию
const formProfileEdit = document.querySelector('.popup__form_profile');
const nameInput = formProfileEdit.querySelector('.popup__input_type_user');
const nicknameInput = formProfileEdit.querySelector('.popup__input_type_description');
const profielName = document.querySelector('.profile__user');
const profileNickname = document.querySelector('.profile__description');

// Создаем переменные в которых храним поля нового попапа, кнопку профайла для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddCardOpen = document.querySelector('.button_type_add');
const buttonAddCardClose = document.querySelector('.button_type_close');
const cardInput = document.querySelector('.popup__input_type_title');
const cardImage = document.querySelector('.popup__input_type_link');
const formAddCard = document.querySelector('.popup__form_add');

// Создаем переменные для открытия и закрытия попапа с картинкой
const imagePopup = document.querySelector('.popup_type_open-image');
const imagePopupItem = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__image-title');
const closePopupImageButton = document.querySelector('.button_type_close');


// Создаем функцию для отрисовки карточек с вызовом функции по клонированию template с заполнением соответствующих полей и фото и заголовка, полученных из массива, вызываем функцию render
function render(card) {
  card.forEach((card) => sectionElements.append(createCard(card)));
}

// Создаем функцию подо все последующие манипуляции с карточками
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

// Создаем функцию для открытия окна popup, а также присваиваем полям попапа изначальные значения, полученные из полей профайла, по умолчанию при первой загрузке
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

// Прописываем функцию закрытия попапа через клик на оверлей
function closeByEscape(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Прописываем функцию закрытия попапа при клике на крестик
function closePopupProfile() {
  closePopup(popupProfileEdit);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupWithClickOnOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

// Вешаем обработчик событий на оверлей для закрытия попапа при клике на затененную область
function closePopupWithClickOnOverlay(popup) {
  if(popup.target === popup.currentTarget) {
    closePopup(popup.target);
  }
}

// Вешаем обработчики событий на кнопку редактирования профиля и на крестик закртия попапа
buttonProfileEditOpen.addEventListener('click', openPopupProfile);
buttonProfileClose.addEventListener('click', closePopupProfile);


// Пишем функцию для вставки в поля профайла данных из интпутов попапа, введенные пользователем
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profielName.textContent = nameInput.value;
  profileNickname.textContent = nicknameInput.value;
  closePopupProfile();
}

// Вешаем обработчик событий на форму попапа, при нажатии кнопки сохранения
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// Создаем функции открытия и закрытия попапа с карточками
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

// Вешаем обработчики на кнопки попапа с карточками
buttonAddCardOpen.addEventListener('click', openPopupCardWindow);
buttonAddCardClose.addEventListener('click', closePopupCardWindow);

// Создаем функцию добавления новой карточки при нажатии кнопки в попапе с карточками
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

// Вешаем обработчик событий на форму попапа с карточками
formAddCard.addEventListener('submit', cardSubmitHandler);

// Создаем функцию для лайков
function likeFunction(e) {
  e.target.classList.toggle('button_type_like_active');
}

//Создаем функцию для удаления карточек
function deleteCard(e) {
  e.target.closest('.element').remove();
}

// Создаем функцию для открытия попапа с картинкой
function openImagePopup(name, link) {
  openPopup(imagePopup);
  imagePopupItem.src = link;
  imagePopupCaption.textContent = name;
  imagePopupItem.alt = name;
}

// Создаем функцию закрытия попапа с картинкой
function closeImagePopup() {
  closePopup(imagePopup);
}

closePopupImageButton.addEventListener('click', closeImagePopup);