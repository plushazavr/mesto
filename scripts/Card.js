import {openPopup} from '../scripts/index.js';

// popup "просмотр фото"
export const popupImage = document.querySelector('.popup_type_open-image');
export const popupImgText = popupImage.querySelector('.popup__image-title');
export const popupImgPhoto = popupImage.querySelector('.popup__image');

export class Card {
// Принимает в конструктор текст и ссылку на изображение
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }
  
  // Принимает в конструктор селектор для template -элемента с шаблоном разметки
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

  // Готовим карточку к публикации и возращаем результат
  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.button_type_like');

    //Добавим слушатели
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;

    // Вернём элемент
    return this._element;
  }

// Метод открытия popup полноразмерного фото.
_clickImageHandler() {
  popupImgPhoto.src = this._link;
  popupImgPhoto.alt = this._name;
  popupImgText.textContent = this._name;
  openPopup(popupImage);
  }

  // Cлушатели
  _setEventListeners() {
    // Обработка события открытия popup полноразмерного фото.
    this._element.querySelector('.element__image').addEventListener('click', () => {
        this._clickImageHandler();
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