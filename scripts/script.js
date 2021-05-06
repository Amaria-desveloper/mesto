`use strict`;
//искомые элементы на странице
const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);
const placesList = document.querySelector('.places__list');

//кнопки
const editButton = document.querySelector(`.profile__edit-button`);
const addButton = document.querySelector(`.profile__add-button`);

//попап с формой редактирования профиля
const popupEdit = document.querySelector(`.popup_type_edit`);
const formEditProfile = popupEdit.querySelector(`.popup__form[name="editProfile"]`);
const inputProfileName = formEditProfile.querySelector(`.popup__input[name="profileName"]`);
const inputProfileDesc = formEditProfile.querySelector(`.popup__input[name="profileDescription"]`);
const closeButtonPopupEdit = popupEdit.querySelector(`.popup__close-button`);

//попап с формой добавлений новой карточки
const popupAdd = document.querySelector(`.popup_type_add`);
const formAddPlace = popupAdd.querySelector(`.popup__form[name="addPlace"]`);
const inputPlaceName = formAddPlace.querySelector(`.popup__input[name="placeName"]`);
const inputPlaceUrl = formAddPlace.querySelector(`.popup__input[name="placeUrl"]`);
const closeButtonPopupAdd = popupAdd.querySelector(`.popup__close-button`);


//попап с full-image
const popupFullimage = document.querySelector(`.popup_type_fullimage`);
const fullImage = popupFullimage.querySelector(`.popup__full-image`);
const figcaption = popupFullimage.querySelector(`.popup__figcaption`);
const closeButtonPopupFullimage = popupFullimage.querySelector(`.popup__close-button`);


/* === добавление карточек в список === */
//данные для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


/**
 * Открывает попап
 * @param popup выбранный попап
 */
function openPopup(popup) {
  popup.classList.add(`popup_opened`);
}


/**
 * Закрывает попап
 * @param popup выбранный попап
 */
function closePopup(popup) {
  popup.classList.remove(`popup_opened`);
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
 * Обнуляет значения полей
 * @param {} form
 */
function resetAllInputs(form) {
  form.reset();
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


renderCards(initialCards);

editButton.addEventListener(`click`, editProfileClickHandler);
addButton.addEventListener(`click`, addButtonClickHandler);
formEditProfile.addEventListener(`submit`, formEditProfileSubmitHandler);
formAddPlace.addEventListener(`submit`, formAddPlaceSubmitHandler);

closeButtonPopupEdit.addEventListener(`click`, closePopup.bind(this, popupEdit));
closeButtonPopupAdd.addEventListener(`click`, closePopup.bind(this, popupAdd));
closeButtonPopupFullimage.addEventListener(`click`, closePopup.bind(this, popupFullimage));
