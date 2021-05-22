'use strict';

/* === добавление карточек в список === */
/**
 * обработчки кнопки esc при открытом попапе
 * @param popup конкретный попап
 * @param evt событие
 */
function popupEscHandler(popup, evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup(popup);
  }
};


/**
 * Обработчик клика по оверлею попапа 
 * @param evt событие
 */
function popupOverlayClickHandler(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
    closePopup(popup);
  }
}


/**
 * Открывает попап
 * @param popup выбранный попап
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscHandler.bind(this, popup));
}


/**
 * Закрывает попап
 * @param popup выбранный попап
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscHandler.bind(this, popup));
}


/**
 * Записывет в форму редактирования текущие значения имени и описания профиля
 */
function getProfileData() {
  inputProfileName.value = profileName.textContent;
  inputProfileDesc.value = profileDescription.textContent;
}


/**
 * Меняет значения полей профиля на значения, полученные из формы редактирования
 */
function changeProfileData() {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDesc.value;
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
  openPopup(popupEdit);
  getProfileData();
}


/**
 * Обработчик "отправки" формы редактирования профиля
 * @param evt submit
 */
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileData();
  closePopup(popupEdit);
}


/**
 * Обработчик клика на кнопке добавления новой карточки
 * @param evt
 */
function addButtonClickHandler(evt) {
  evt.preventDefault();
  resetAllInputs(formAddPlace);
  openPopup(popupAdd);
}


/**
 * Обработчик "отправки" формы добавления новой карточки
 * @param evt submit
 */
function formAddPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const card = [
    {
      name: inputPlaceName.value,
      link: inputPlaceUrl.value,
    }
  ];

  renderCards(card);
  closePopup(popupAdd);
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
  openPopup(popupFullimage);

  fullImage.src = evt.target.src;
  fullImage.alt = `Фотография загруженная пользователем: ${cardTitle}`;

  figcaption.textContent = cardTitle;
}

/* показывает изначальные карточки */
renderCards(initialCards);

/* проверка на валидность */
enableValidation(config);

/* события */
editButton.addEventListener('click', editProfileClickHandler);
addButton.addEventListener('click', addButtonClickHandler);
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);

closeButtonPopupEdit.addEventListener('click', closePopup.bind(this, popupEdit));
closeButtonPopupAdd.addEventListener('click', closePopup.bind(this, popupAdd));
closeButtonPopupFullimage.addEventListener('click', closePopup.bind(this, popupFullimage));

popupEdit.addEventListener('mousedown', popupOverlayClickHandler);
popupAdd.addEventListener('mousedown', popupOverlayClickHandler);
popupFullimage.addEventListener('mousedown', popupOverlayClickHandler);
