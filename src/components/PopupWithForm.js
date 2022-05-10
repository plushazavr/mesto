import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmit) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(
            this._popupForm.querySelectorAll('.popup__input'));
        this._popupButton = this._popupForm.querySelector('.button_type_submit');
        this._buttonText = this._popupButton.textContent;
    }

    _getInputValues() {
        this._newValues = {};
        this._inputList.forEach((inputElement) => {
            this._newValues[inputElement.name] = inputElement.value;
        })
        return this._newValues;
    }

    showLoading(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = 'Сохранение...';
        } else {
            this._popupButton.textContent = this._buttonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}