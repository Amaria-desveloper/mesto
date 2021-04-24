`use strict`;

let profileName = document.querySelector(`.profile__name`);
let profileDescription = document.querySelector(`.profile__description`);
let editButton = document.querySelector(`.profile__edit-button`);

let popup = document.querySelector(`.popup`);
let closeButton = popup.querySelector(`.popup__close-button`);
let formEditProfile = popup.querySelector(`.popup__form[name="editProfile"]`);
let inputProfileName = formEditProfile.querySelector(`.popup__input[name="profileName"]`);
let inputProfileDesc = formEditProfile.querySelector(`.popup__input[name="profileDescription"]`);


// Закрывает попап
function openPopup(evt) {
  evt.preventDefault();

  popup.classList.add(`popup_opened`);

  inputProfileName.value = profileName.textContent;
  inputProfileDesc.value = profileDescription.textContent;
}


//Закрывает попап
function closePopup() {
  popup.classList.remove(`popup_opened`);
}


//Сохраняет введённые данные
function saveProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDesc.value;

  closePopup();
}


editButton.addEventListener(`click`, openPopup);
closeButton.addEventListener(`click`, closePopup);
formEditProfile.addEventListener(`submit`, saveProfileData);
