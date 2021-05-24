'use strict';

//import { config } from './util/variables.js';

/**
 * Показывает блок с ошибкой
 * @param formElement конкретная форма
 * @param inputElement конкретный инпут
 * @param config настройки для валидации формы
 */
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorActiveClass);
}


/**
 * Прячет блок с ошибкой
 * @param formElement конкретная форма
 * @param inputElement конкретный инпут
 * @param config настройки для валидации формы
 */
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorActiveClass);
}


/**
 * Проверяет инпут на условия валидации
 * @param formElement конкретная форма
 * @param inputElement  конкретный инпут
 */
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

/**
 * Проверяет список инпутов на "хоть один невалидный"
 */
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

/**
 * задаёт состояние кнопке формы
 * @param buttonElement конкретная кнопка
 * @param inputList список инпуток, которые влияют на состояние кнопки
 */
function toggleButtonState(buttonElement, inputList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;

  } else {
    buttonElement.disabled = false;
  }
}


/** Вешает слушатели
* @param formElement конкретная форма
* @param config настройки для валидации формы
*/
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(buttonElement, inputList);
    })
  })
  /* состояние кнопки */
  toggleButtonState(buttonElement, inputList);
}

/**
 * Запускает проверку форм
 * @param config настройки для валидации всех форм
 */
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
}

export default enableValidation;