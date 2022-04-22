import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
        this._popupForm.querySelectorAll('.popup__input')); 
  }

  // Cобирает данные всех полей формы
  _getInputValues() {

    this._newValues = {};
    this._inputList.forEach((inputElement) => {
        this._newValues[inputElement.name] = inputElement.value;
    })
    return this._newValues;
  }

   // Добавляет обработчик клика иконке закрытия и обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._callbackSubmit(this._getInputValues());
        this.close();
    });
  }

  //  Сбрасывает форму при закрытии
  close() {
    super.close();
    this._popupForm.reset();
  }
}