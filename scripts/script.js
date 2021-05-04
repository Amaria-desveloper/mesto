`use strict`;
const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);

const editButton = document.querySelector(`.profile__edit-button`);
const addButton = document.querySelector(`.profile__add-button`);

const popupEdit = document.querySelector(`.popup_type_edit`);
const popupAdd = document.querySelector(`.popup_type_add`);

const formEditProfile = popupEdit.querySelector(`.popup__form[name="editProfile"]`);
const inputProfileName = formEditProfile.querySelector(`.popup__input[name="profileName"]`);
const inputProfileDesc = formEditProfile.querySelector(`.popup__input[name="profileDescription"]`);

const formAddPlace = popupAdd.querySelector(`.popup__form[name="addPlace"]`);
const inputPlaceName = formAddPlace.querySelector(`.popup__input[name="placeName"]`);
const inputPlaceUrl = formAddPlace.querySelector(`.popup__input[name="placeUrl"]`);

/**
 * Открывает попап
 * @param popup выбранный попап
 */
function openPopup(popup) {
  popup.classList.add(`popup_opened`);

  const closeButton = popup.querySelector(`.popup__close-button`);
  closeButton.addEventListener(`click`, closePopup.bind(this, popup));
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
 * @param {*} evt
 */
function resetAllInputs(form) {
  let allInputs = form.querySelectorAll(`input`);

  allInputs.forEach(input => {
    input.value = "";
  });
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
  let card = [
    {
      name: inputPlaceName.value,
      link: inputPlaceUrl.value,
    }
  ];

  renderCards(card);
  closePopup(popupAdd);
}


editButton.addEventListener(`click`, editProfileClickHandler);
addButton.addEventListener(`click`, addButtonClickHandler);
formEditProfile.addEventListener(`submit`, formEditProfileSubmitHandler);
formAddPlace.addEventListener(`submit`, formAddPlaceSubmitHandler);



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

renderCards(initialCards);

/**
 * Создаёт карточку Place с переданными данными
 * @param {array.<object>} data данные для карточки
 * @param {int} index иднекс элемента в массиве данных
 * @return {HTMLElement} card - возвращает #document-fragment.
 */
function createCard(data, index) {
  const template = document.querySelector('#place-template').content;
  const card = template.querySelector('.place').cloneNode(true);

  const image = card.querySelector('.place__image');
  const title = card.querySelector('.place__title');

  image.src = data[index].link;
  image.alt = `Фотография загруженная пользователем: ${data[index].name}`;
  title.textContent = data[index].name;

  const likeButton = card.querySelector('.place__button');
  likeButton.addEventListener('click', evt => {
    evt.preventDefault();

    likeButton.classList.toggle('button_type_heart_active');
  })

  return card;
}


/**
 * Добавляет карточки в DOM-дерево
 * @param {array.<object>} data данные для карточки
 * @param {int} quantity число карточек, которое требуется добавить
 * @return {void}
 */
function renderCards(data) {
  let quantity = data.length;

  let placesList = document.querySelector('.places__list');

  if (placesList) {
    for (let i = 0; i < quantity; i++) {
      placesList.prepend(createCard(data, i));
    }
  }
}
