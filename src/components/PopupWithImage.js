import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
  }

  // Переопределяем родительский метод open из класса Popup
  open(values) {
    super.open();
    this._popupImage.src = values.link;
    this._popupImage.alt = values.name;
    this._popupImageTitle.textContent = values.name;
  }
}