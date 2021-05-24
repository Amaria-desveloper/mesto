'use strict';
/**
 * Создаёт карточку Place из заданного шаблона с переданными данными
 * @param data данные для карточки
 * @param templateSelector имя класса шаблона разметки
 */
export default class Card {
  constructor(data, templateSelector, _cardClickHandler) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardClickHandler = _cardClickHandler;
  }

  /**
   * Подставляет данные
   */
  _setData() {
    this._image = this._element.querySelector('.place__image');
    this._title = this._element.querySelector('.place__title');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
  }

  /**
   * Переключает кнопку "сердечко"
   */
  _toggleLike() {
    this._element.querySelector('.place__button').classList.toggle('button_type_heart_active');
  }


  /**
   * Удаляет карточку 
   */
  _remove() {
    this._element.remove();
  }

  /**
   * Вешает слушатели
   */
  _setEventListeners() {
    this._element.querySelector('.place__button').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.place__delete').addEventListener('click', () => {
     this._remove();
    });

    this._element.querySelector('.place__image').addEventListener('click', (evt) => {
      this._cardClickHandler(this._name, evt);
    });
  }

  /**
   * Создаёт карточку
   * @returns this._element подготовленную разметку одной карточки
   */
  create() {
    this._element = document.querySelector(this._templateSelector.template)
      .content
      .querySelector(this._templateSelector.block)
      .cloneNode(true);

    this._setData();
    this._setEventListeners();

    return this._element;
  }
};
