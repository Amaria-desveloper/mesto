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



/**
 * Открывает попап
 * @param popup выбранный попап
 */
function openPopup(popup) {
  console.log(popup);
  popup.classList.add(`popup_opened`);

  const closeButton = popup.querySelector(`.popup__close-button`);
  closeButton.addEventListener(`click`, () => closePopup(popup));
}


/**
 * Закрывает попап
 * @param popup выбранный попап
 */
function closePopup(popup) {
  console.log(popup);
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
 * Обработчик "отправки" формы
 * @param evt submit
 */
function formSubmitHandler(evt) {
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
  openPopup(popupAdd);
}

editButton.addEventListener(`click`, editProfileClickHandler);
addButton.addEventListener(`click`, addButtonClickHandler);
formEditProfile.addEventListener(`submit`, formSubmitHandler);
