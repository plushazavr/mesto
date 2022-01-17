/** submit **/

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_user');
let jobInput = formElement.querySelector('.popup__input_type_description');

function formSubmitHandler(evt) {
  evt.preventDefault();

  const editName = nameInput.value;
  const editProfession = jobInput.value;

  let info = document.querySelector('.profile__info');
  let infoName = info.querySelector('.profile__user');
  let infoProfession = info.querySelector('.profile__description');

  infoName.textContent = editName;
  infoProfession.textContent = editProfession;
}

formElement.addEventListener('submit', formSubmitHandler);

/** pop-up edit profile **/

let editButton = document.querySelector('.button__type_edit'); // переменная "открыть ред-е профиля"
let closeButton = document.querySelector('.button__type_close'); // переменная "закрыть ред-е профиля"
let popup = document.querySelector('.popup'); // переменная .popup

function openPopup() {
  popup.classList.add('popup__opened');
} // фун-ция открытия ред-я профиля 

function closePopup() {
  popup.classList.remove('popup__opened');
}  // фун-ция закрытия ред-я профиля 

editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', closePopup); // вызов функций

