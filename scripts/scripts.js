/** submit **/

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_user');
let jobInput = formElement.querySelector('.popup__input_type_description');


/** pop-up edit profile **/
// переменная "открыть ред-е профиля"
let editButton = document.querySelector('.button_type_edit'); 

// переменная "закрыть ред-е профиля"
let closeButton = document.querySelector('.button_type_close');

// переменная .popup
let popup = document.querySelector('.popup'); 

//переменные данных профиля
let userName = document.querySelector('.profile__user'); 
let userAbout = document.querySelector('.profile__description');

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

//контейнейр для карточек
const elements = document.querySelector('.elements'); 

//шаблон карточки
const template = document.querySelector('.template').content; 

function startInitialCards(){
  initialCards.forEach((item)=>{
    renderCard(item, elements);
  });
}

startInitialCards();



function formSubmitHandler(evt) {
  evt.preventDefault();

  const editName = nameInput.value;
  const editProfession = jobInput.value;

  userName.textContent = editName;
  userAbout.textContent = editProfession;
  closePopup()
}

// фун-ция открытия ред-я профиля + переносит данные из профиля в инпуты
function openPopup() {
  popup.classList.add('popup_opened'); 
  nameInput.value = userName.textContent; 
  jobInput.value = userAbout.textContent; 
}  

// фун-ция закрытия ред-я профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', closePopup); // вызов функций

formElement.addEventListener('submit', formSubmitHandler);



let password = prompt('Введите пароль:');

if (!password == '') {
  password = prompt('Пароль обязателен и не может быть пустым.');
}