export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  
  // Принимает в конструктор селектор для template-элемента с шаблоном разметки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  // Лайки
  _handleLike() {
    this._likeButton.classList.toggle('button_type_like_active');
  }

  // Готовим карточку к публикации и возращаем результат
  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.button_type_like');
    this._image = this._element.querySelector('.element__image');
    //Добавим слушатели
    this._setEventListeners();
    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
          // Вернём элемент
    return this._element;
  }

  // Метод открытия popup полноразмерного фото.
  _openShowImage() {
    popupImgPhoto.src = this._link;
    popupImgPhoto.alt = this._name;
    popupImgText.textContent = this._name;
    openPopup(popupImage);
  }

  // Cлушатели
_setEventListeners() {
  // Обработка события открытия popup полноразмерного фото.
  this._element.querySelector('.element__image').addEventListener('click', () => {
          this._handleCardClick({
              name: this._name,
              link: this._link,
              alt: this._alt
          })
  });

  // Удаление карточки
  this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._element.closest('.element').remove();
    });

  // Установка лайков
  this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
  }
}

/*import { openPopup } from '../pages/index.js';

// popup "просмотр фото"
export const popupImage = document.querySelector('.popup_type_open-image');
export const popupImgText = popupImage.querySelector('.popup__image-title');
export const popupImgPhoto = popupImage.querySelector('.popup__image');
*/

 /*
  //шаблонная разметка карточек
  _getTemplate() {
    const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

    return cardElement;
  }

  // Лайки
  _handleLike() {
    this._likeButton.classList.toggle('button_type_like_active');
  }

  // создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.button_type_like');
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

// посмотреть фото 
_handleImageClick() {
  popupImgPhoto.src = this._link;
  popupImgPhoto.alt = this._name;
  popupImgText.textContent = this._name;
  openPopup(popupImage);
  }

  //слушатели
  _setEventListeners() {
    // посмотреть фото
    this._cardImage.addEventListener('click', () => {
        this._handleImageClick();
    });

    // удаление
    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
        this._element.closest('.element').remove();
    });

    // лайк
    this._likeButton.addEventListener('click', () => {
        this._handleLike();
    });
  } */