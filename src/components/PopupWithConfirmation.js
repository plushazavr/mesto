import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupButton = this._popupForm.querySelector('.button_type_submit');
        this._buttonText = this._popupButton.textContent;
    }

    showLoading(text) {
      this._popupButton.value = text;
    }

    setSubmitAction(action) {
        this._setSubmitAction = action;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._setSubmitAction();
        })
    }
}