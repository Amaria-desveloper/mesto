'use strict';

import initialCards from './data.js';
import { ESC_CODE, placesList, profile, button, popupEdit, popupAdd, popupFullimage, config } from './variables.js';
import enableValidation from './validate.js';

/* === добавление карточек в список === */
/**
 * обработчки кнопки esc при открытом попапе
 * @param popup конкретный попап
 * @param evt событие
 */
function popupEscHandler(evt) {
  if (Object.values(ESC_CODE).includes(evt.key)) {
    evt.preventDefault();
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};


/**
 * Обработчик клика по оверлею попапа 
 * @param evt событие
 */
function popupOverlayClickHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
    closePopup(popupOpened);
  }
}


/**
 * Открывает попап
 * @param popup выбранный попап
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscHandler);
}


/**
 * Закрывает попап
 * @param popup выбранный попап
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscHandler);
}


/**
 * Записывет в форму редактирования текущие значения имени и описания профиля
 */
function getProfileData() {
  popupEdit.inputProfileName.value = profile.name.textContent;
  popupEdit.inputProfileDesc.value = profile.description.textContent;
}


/**
 * Меняет значения полей профиля на значения, полученные из формы редактирования
 */
function changeProfileData() {
  profile.name.textContent = popupEdit.inputProfileName.value;
  profile.description.textContent = popupEdit.inputProfileDesc.value;
}


/**
 * Обнуляет значения полей
 * @param form конректная форма
 */
function resetAllInputs(form) {
  form.reset();
}


/**
 * Обработчик клика на кнопке "редактировать профиль"
 * @param evt click
 */
function editProfileClickHandler(evt) {
  evt.preventDefault();
  openPopup(popupEdit.name);
  getProfileData();
}


/**
 * Обработчик "отправки" формы редактирования профиля
 * @param evt submit
 */
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileData();
  closePopup(popupEdit.name);
}


/**
 * Обработчик клика на кнопке добавления новой карточки
 * @param evt
 */
function addButtonClickHandler(evt) {
  evt.preventDefault();
  resetAllInputs(popupAdd.form);
  openPopup(popupAdd.name);
}


/**
 * Обработчик "отправки" формы добавления новой карточки
 * @param evt submit
 */
function formAddPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const card = [
    {
      name: popupAdd.inputPlaceName.value,
      link: popupAdd.inputPlaceUrl.value,
    }
  ];

  renderCards(card);
  closePopup(popupAdd.name);
  popupAdd.submitButton.disabled = true;
}


/**
 * Создаёт карточку Place с переданными данными
 * @param {object} card данные для карточки
 * @param {int} index индекс элемента в массиве данных
 * @return {HTMLElement} card - возвращает #document-fragment.
 */
function createCard(card) {
  const template = document.querySelector('#place-template').content;
  const element = template.querySelector('.place').cloneNode(true);

  const image = element.querySelector('.place__image');
  const title = element.querySelector('.place__title');

  image.src = card.link;
  image.alt = `Фотография загруженная пользователем: ${card.name}`;
  title.textContent = card.name;

  const likeButton = element.querySelector('.place__button');
  likeButton.addEventListener('click', evt => {
    evt.preventDefault();
    likeButton.classList.toggle('button_type_heart_active');
  });

  const deleteButton = element.querySelector('.place__delete');
  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    element.remove();
  });

  image.addEventListener('click', showFullImage.bind(this, title.textContent));

  return element;
}


/**
 * Добавляет карточки в DOM-дерево
 * @param {array.<object>} data данные для карточки
 * @param {int} quantity число карточек, которое требуется добавить
 * @return {void}
 */
function renderCards(data) {
  if (placesList) {
    data.forEach((card) => placesList.prepend(createCard(card)));
  }
}


/* === манипуляции с карточками ===*/
/**
 * Показать попап с изображением с карточки места
 * @param cardTitle название фото
 * @param evt событие
 */
function showFullImage(cardTitle, evt) {
  openPopup(popupFullimage.name);

  popupFullimage.image.src = evt.target.src;
  popupFullimage.image.alt = `Фотография загруженная пользователем: ${cardTitle}`;

  popupFullimage.figcaption.textContent = cardTitle;
}

/* показывает изначальные карточки */
renderCards(initialCards);

/* проверка на валидность */
enableValidation(config);

/* события */
button.edit.addEventListener('click', editProfileClickHandler);
button.add.addEventListener('click', addButtonClickHandler);
popupEdit.form.addEventListener('submit', formEditProfileSubmitHandler);
popupAdd.form.addEventListener('submit', formAddPlaceSubmitHandler);

popupEdit.closeButton.addEventListener('click', closePopup.bind(this, popupEdit.name));
popupAdd.closeButton.addEventListener('click', closePopup.bind(this, popupAdd.name));
popupFullimage.closeButton.addEventListener('click', closePopup.bind(this, popupFullimage.name));

popupEdit.name.addEventListener('mousedown', popupOverlayClickHandler);
popupAdd.name.addEventListener('mousedown', popupOverlayClickHandler);
popupFullimage.name.addEventListener('mousedown', popupOverlayClickHandler);
