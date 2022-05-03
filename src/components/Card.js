export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _handleLike() {
    this._likeButton.classList.toggle('button_type_like_active');
  }

  generateCard() {    
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.button_type_like');
    this._image = this._element.querySelector('.element__image');    
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
  
  _openShowImage() {
    popupImgPhoto.src = this._link;
    popupImgPhoto.alt = this._name;
    popupImgText.textContent = this._name;
    openPopup(popupImage);
  }

_setEventListeners() {  
  this._element.querySelector('.element__image').addEventListener('click', () => {
          this._handleCardClick({
              name: this._name,
              link: this._link,
              //alt: this._alt
          })
  });
  
  this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._element.closest('.element').remove();
    });
  
  this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
  }
}