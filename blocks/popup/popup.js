`use strict`;

let editButton = document.querySelector(`.profile__edit-button`);
let popup = document.querySelector(`.popup`);
let formEditProfile = popup.querySelector(`.popup__form[name="editProfile"]`);
let saveButton = popup.querySelector(`.popup__submit`);
let inputProfileName = formEditProfile.querySelector(`.popup__input[name="profileName"]`);
let inputProfileDesc = formEditProfile.querySelector(`.popup__input[name="profileDescription"]`);


/**
 * Открывает попап
 * @external Element
 * @param {external: Element} popup html-элемент (попап)
 * @returns void
 */
function openPopup() {
  popup.classList.add(`popup_opened`);
  popup.querySelector(`.popup__input`).focus();

  let closeButton = popup.querySelector(`.popup__close-button`);

  formEditProfile.addEventListener(`submit`, formEditProfileSubmitHandler);
  closeButton.addEventListener(`click`, popupCloseClickHandler);
  document.addEventListener(`keydown`, popupEscHandler);
}


/**
 * Закрывает попап
 * @external Element
 * @param {external: Element} popup html-элемент (попап)
 * @returns void
 */
function closePopup() {
  popup.classList.remove(`popup_opened`);
}


/**
 * Ловит событие click на кнопке редактирования профиля
 * @param {event} evt
 * @returns void
 */
function editButtonClickHandler(evt) {
  evt.preventDefault();

  openPopup(popup);
}


/**
 * Ловит событие click на кнопке закрытия попапа
 * @param {event} evt
 * @returns void
 */
function popupCloseClickHandler(evt) {
  evt.preventDefault();

  closePopup(popup);
}


/**
 * Ловит нажатие клавиши esc при открытом попапе
 * @param {event} evt
 * @returns void
 */
function popupEscHandler(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();

    document.removeEventListener(`keydown`, popupEscHandler);
    closePopup(popup);
  }
}


/**
 * Ловит событие click на кнопке Сохранить (submit)
 * @param {event} evt
 * @returns void
 */
function saveButtonClickHandler(evt) {
  evt.preventDefault();

  closePopup(popup);
}


/**
 * Ловит нажатие клавиши Enter при открытой форме редактирования профиля
 * @param {event} evt
 * @returns void
 */
function popupEnterHandler(evt) {
  if (evt.key === `Enter`) {
    evt.preventDefault();

    popup.removeEventListener(`keydown`, popupEnterHandler);
    closePopup(popup);
  }
}


/**
 * Меняет значения полей профиля на значения, полученные из формы редактирования
 * @returns void
 */
function changeProfile() {
  let name = inputProfileName.value;
  let description = inputProfileDesc.value;

  let profileName = document.querySelector(`.profile__name`);
  let profileDescription = document.querySelector(`.profile__description`);

  profileName.textContent = name;
  profileDescription.textContent = description;
}


/**
 * Ловит событие Submit на форме редактирования профиля
 * @param {event} evt
 * @returns void
 */
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  changeProfile()
  closePopup(popup);
  popup.addEventListener(`keydown`, popupEnterHandler);
}


editButton.addEventListener(`click`, editButtonClickHandler);
