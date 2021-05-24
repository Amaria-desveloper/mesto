'use strict';

export default class FormValidator {
  constructor(config, formElement) {
    console.log(config, formElement);
    this._config = config;
    this._form = formElement;

    console.log(this._formgit);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submit = this._form.querySelector(this._config.submitSelector);
  }

  /* Вешает слушатели */
  _setEventListeners(formElement) {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(buttonElement, inputList);
      })
    })
    /* состояние кнопки */
    toggleButtonState(this._submit, this._inputList);
  }

  /**
   * Запускает проверку форм
   */
  enableValidation() {
    this._setEventListeners(this._form);
  }
}
