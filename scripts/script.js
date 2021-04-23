`use strict`;

let profileName = document.querySelector(`.profile__name`);
let profileDescription = document.querySelector(`.profile__description`);
let editButton = document.querySelector(`.profile__edit-button`);

let popup = document.querySelector(`.popup`);
let closeButton = popup.querySelector(`.popup__close-button`);
let formEditProfile = popup.querySelector(`.popup__form[name="editProfile"]`);
let inputProfileName = formEditProfile.querySelector(`.popup__input[name="profileName"]`);
let inputProfileDesc = formEditProfile.querySelector(`.popup__input[name="profileDescription"]`);


/**
 * Открывает попап
 * @returns {void}
 */
function openPopup() {
  popup.classList.add(`popup_opened`);
}


/**
 * Открывает попап
 * @returns {void}
 */
function closePopup() {
  popup.classList.remove(`popup_opened`);
}


/**
 * Записывет в форму редактирования текущие значения имени и описания профиля
 * @returns {void}
 */
function getProfileData() {
  inputProfileName.value = profileName.textContent;
  inputProfileDesc.value = profileDescription.textContent;
}


/**
 * Меняет значения полей профиля на значения, полученные из формы редактирования
 * @returns {void}
 */
function changeProfileData() {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDesc.value;
}


/**
 * Обработчик клика на кнопке "редактировать профиль"
 * @param {event} evt click
 * @returns {void}
 */
function editProfileClickHandler(evt) {
  evt.preventDefault();
  openPopup();
  getProfileData();
}


/**
 * Обработчик "отправки" формы
 * @param {event} evt submit
 * @returns {void}
 */
function formSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileData();
  closePopup();
}


editButton.addEventListener(`click`, editProfileClickHandler);
closeButton.addEventListener(`click`, closePopup);
formEditProfile.addEventListener(`submit`, formSubmitHandler);
