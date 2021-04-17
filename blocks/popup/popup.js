`use strict`;

let editButton = document.querySelector(`.profile__edit-button`);
let editPopup = document.querySelector(`.popup`);
let formEditProfile = editPopup.querySelector(`.popup__form[name="editProfile"]`);


/**
 * Открывает попап
 * @external Element
 * @param {external: Element} popup html-элемент (попап)
 * @returns void
 */
function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  popup.querySelector(`.popup__input`).focus();

  let closeButton = popup.querySelector(`.popup__close-button`);

  closeButton.addEventListener(`click`, popupCloseClickHandler);
  document.addEventListener(`keydown`, popupEscHandler);
}


/**
 * Закрывает попап
 * @external Element
 * @param {external: Element} popup html-элемент (попап)
 * @returns void
 */
function closePopup(popup) {
  popup.classList.remove(`popup_opened`);
}


/**
 * Ловит событие click На кнопке редактирования профиля
 * @param {event} evt
 * @returns void
 */
function editButtonClickHandler(evt) {
  evt.preventDefault();
  openPopup(editPopup);
}


/**
 * Ловит событие click на кнопке закрытия попапа
 * @param {event} evt
 * @returns void
 */
function popupCloseClickHandler(evt) {
  evt.preventDefault();
  closePopup(editPopup);
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

    closePopup(editPopup);
  }
}


editButton.addEventListener(`click`, editButtonClickHandler);
