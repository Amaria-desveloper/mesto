'use strict';

//варианты кнопки escape
const ESC_CODE = {
  full: 'escape',
  short: 'esc'
};

//искомые элементы на странице
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//попап-оверлей
const popupsOverlay = Array.from(document.querySelectorAll('.popup'));

//попап с формой редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form[name="editProfile"]');
const inputProfileName = formEditProfile.querySelector('.popup__input[name="profileName"]');
const inputProfileDesc = formEditProfile.querySelector('.popup__input[name="profileDescription"]');
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close-button');

//попап с формой добавлений новой карточки
const popupAdd = document.querySelector('.popup_type_add');
const formAddPlace = popupAdd.querySelector('.popup__form[name="addPlace"]');
const inputPlaceName = formAddPlace.querySelector('.popup__input[name="placeName"]');
const inputPlaceUrl = formAddPlace.querySelector('.popup__input[name="placeUrl"]');
const closeButtonPopupAdd = popupAdd.querySelector('.popup__close-button');


//попап с full-image
const popupFullimage = document.querySelector('.popup_type_fullimage');
const fullImage = popupFullimage.querySelector('.popup__full-image');
const figcaption = popupFullimage.querySelector('.popup__figcaption');
const closeButtonPopupFullimage = popupFullimage.querySelector('.popup__close-button');


/* настройки для валидации всех форм */
const config = {
  errorActiveClass: 'popup__input-error_active',
  inputSelector: '.popup__input',
  submitSelector: '.popup__submit',
  formSelector: '.popup__form'
}
