export default class Card {
  constructor({data, handleCardClick, handleCardDelete, handleLikeClick}, templateSelector, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;    
  }
  
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector('.button_type_like');
    this._deleteButton = this._card.querySelector('.button_type_delete');
    this._likeCounter = this._card.querySelector('.element__like-counter');
    this._image = this._card.querySelector('.element__image');
    this._imageTitle = this._card.querySelector('.element__title');
    
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageTitle.textContent = this._name;

    this._likeCounter.textContent = this._likes.length;
    if (!(this._ownerId === this._userId)) {
      this._deleteButton.style.display = 'none';
    }
    if (this._likes.find((obj) => this._userId === obj._id)) {
        this._likeButton.classList.add('button_type_like_active')
    }
    this._setEventListeners();
    return this._card;
}

  deleteCard() {
    this._card.closest('.element').remove();
  }
  

  setLike() {
    if (!this._likeButton.classList.contains('button_type_like_active')) {
        this._api.likeCard(this._id)
            .then(card => {
                this._likes = card.likes;
                this._likeButton.classList.add('button_type_like_active');
                this._likeCounter.textContent = this._likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        this._api.dislikeCard(this._id)
            .then(card => {
                this._likes = card.likes;
                this._likeButton.classList.remove('button_type_like_active');
                this._likeCounter.textContent = this._likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
        this._handleCardClick({
            name: this._name,
            link: this._link,
            alt: this._name
    })
  });

  this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
  })

  this._likeButton.addEventListener('click', () => {
      this.setLike();
  });
  }
}