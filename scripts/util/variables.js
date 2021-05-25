'use strict';

//варианты кнопки escape
const ESC_CODE = {
  full: 'Escape',
  short: 'Esc'
};

//искомые элементы на странице
const placesList = document.querySelector('.places__list');

//интерактивные элементы профиля
const profile = {
  name: document.querySelector('.profile__name'),
  description: document.querySelector('.profile__description')
};

//кнопки
const button = {
  edit: document.querySelector('.profile__edit-button'),
  add: document.querySelector('.profile__add-button')
};

//попап с формой редактирования профиля
const popupEdit = {
  name: document.querySelector('.popup_type_edit'),
};
popupEdit.form = popupEdit.name.querySelector('.popup__form[name="editProfile"]');
popupEdit.inputProfileName = popupEdit.form.querySelector('.popup__input[name="profileName"]');
popupEdit.inputProfileDesc = popupEdit.form.querySelector('.popup__input[name="profileDescription"]');
popupEdit.closeButton = popupEdit.name.querySelector('.popup__close-button');


//попап с формой добавлений новой карточки
const popupAdd = {
  name: document.querySelector('.popup_type_add')
};
popupAdd.form = popupAdd.name.querySelector('.popup__form[name="addPlace"]');
popupAdd.inputPlaceName = popupAdd.form.querySelector('.popup__input[name="placeName"]');
popupAdd.inputPlaceUrl = popupAdd.form.querySelector('.popup__input[name="placeUrl"]');
popupAdd.closeButton = popupAdd.name.querySelector('.popup__close-button');
popupAdd.submitButton = popupAdd.name.querySelector('.popup__submit');


//попап с full-image
const popupFullimage = {
  name: document.querySelector('.popup_type_fullimage')
};
popupFullimage.image = popupFullimage.name.querySelector('.popup__full-image');
popupFullimage.figcaption = popupFullimage.name.querySelector('.popup__figcaption');
popupFullimage.closeButton = popupFullimage.name.querySelector('.popup__close-button');


/* настройки для валидации всех форм */
const config = {
  errorActiveClass: 'popup__input-error_active',
  inputSelector: '.popup__input',
  submitSelector: '.popup__submit',
  formSelector: '.popup__form'
};

/* селекторы шаблона карточки Place*/
const place = {
  template: '#place-template',
  block: '.place'
};

export { 
  ESC_CODE, 
  placesList, 
  profile, 
  button, 
  popupEdit, 
  popupAdd, 
  popupFullimage,
  config,
  place
};
