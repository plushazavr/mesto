export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

   // Открытие popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

   // Закрытие клавишей ESC
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  // Установка слушателей
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('button_type_close')) {
            this.close();
        }
    });
  }
}