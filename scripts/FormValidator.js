'use strict';

/**
 * Валидация формы
 * @param config подготовленный объект с селекторами форм
 * @param formElement конкретная форма
 */
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submit = this._form.querySelector(this._config.submitSelector);
  }

  /**
   * Показывает блок с ошибкой
   * @param inputElement конкретный инпут
   */
  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorActiveClass);
  }


  /**
   * Прячет блок с ошибкой
   * @param inputElement конкретный инпут
   */
  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._config.errorActiveClass);
  }

  /**
 * Проверяет инпут на условия валидации
 * @param inputElement  конкретный инпут
 */
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }


  /**
   * Проверяет список инпутов на "хоть один невалидный"
   */
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  /**
   * задаёт состояние кнопке submit формы
   */
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submit.disabled = true;

    } else {
      this._submit.disabled = false;
    }
  }

  /* Вешает слушатели */
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState(this._submit, this._inputList);
  }

  /**
   * Запускает проверку форм
   */
  enableValidation() {
    this._setEventListeners(this._form);
  }
}
