export const imageBox = document.querySelector('.image-box');
export const imageBoxCloseButton = imageBox.querySelector('.image-box__close-button');
export const profileEditForm = profileEditPopup.querySelector('.popup__form');
export const popupProfileTitle = profileEditForm.querySelector('#profileTitle');
export const popupProfileSubtitle = profileEditForm.querySelector('#profileSubtitle');
export const cardsListSection = '.cards__list';
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileEditPopupSelector = '#profileEditPopup';
export const cardAddPopupSelector = '#cardAddPopup';
export const profileTitleSelector = '.profile__title';
export const profileSubtitleSelector = '.profile__subtitle';

// Массив первоначальных карточек
export const initialCards = [
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
  }];

  export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    submitButtonDisabledSelector: 'popup__submit-button_disabled',
    inputInvalidSelector: 'popup__input_invalid',
  };