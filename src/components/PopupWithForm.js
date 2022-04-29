import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
        this._popupForm.querySelectorAll('.popup__input')); 
  }

  _getInputValues() {
    this._newValues = {};
    this._inputList.forEach((input) => {
        this._newValues[input.name] = input.value;
    })
    return this._newValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}