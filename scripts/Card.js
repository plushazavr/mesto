import {openPopup} from '../scripts/index.js';

// popup "просмотр фото"
export const popupImage = document.querySelector('.popup_type_open-image');
export const popupImgText = popupImage.querySelector('.popup__image-title');
export const popupImgPhoto = popupImage.querySelector('.popup__image');

export class Card {
// текст и ссылка на img 
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }
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
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

// посмотреть фото
_clickImageHandler() {
  popupImgPhoto.src = this._link;
  popupImgPhoto.alt = this._name;
  popupImgText.textContent = this._name;
  openPopup(popupImage);
  }

  //слушатели
  _setEventListeners() {
    // посмотреть фото
    this._element.querySelector('.element__image').addEventListener('click', () => {
        this._clickImageHandler();
    });

    // удаление
    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
        this._element.closest('.element').remove();
    });

    // лайк
    this._likeButton.addEventListener('click', () => {
        this._handleLike();
    });
  }
}