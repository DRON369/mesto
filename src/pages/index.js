import './index.css';

import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import {
  initialCards,
  cardsListSection,
  addButton,
  editButton,
  cardAddPopupSelector,
  profileEditPopupSelector,
  validationConfig,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
  popupProfileTitle,
  popupProfileSubtitle

} from '../utils/constants.js';

// * Инициализация класса UserInfo
const user = new UserInfo(profileTitleSelector, profileSubtitleSelector, profileAvatarSelector);
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, (item) => {
  user.setUserInfo(item);
});
profileEditPopup.setEventListeners();

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'f8102ab5-70c3-4d68-8d03-549794a26a19',
  groupId: 'cohort-20'
});

api.getUserInfo()
.then(res => {
  user.setUserInfo({profileTitle: res.name, profileSubtitle: res.about, avatarUrl: res.avatar});
})

const addForm = document.querySelector(cardAddPopupSelector).querySelector('.popup__form');
const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

const editForm = document.querySelector(profileEditPopupSelector).querySelector('.popup__form');
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

// * Инициализация класса PopupWithImage
const imagePopup = new PopupWithImage('.image-box');
imagePopup.setEventListeners();
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

// * Первоначальная инициализация карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, cardsListSection
);
cardsList.renderItems();


// * Инициализация класса PopupWithForm
const addCardPopup = new PopupWithForm(cardAddPopupSelector, (item) => {
  const card = new Card({ name: item.placeLabel, link: item.placeImage }, '.card-template', handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
});
addCardPopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupProfileTitle.value = userInfo.user;
  popupProfileSubtitle.value = userInfo.about;
  editFormValidator.clearValidationMessages();
  editFormValidator.setButtonState();
  profileEditPopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.clearValidationMessages();
  addFormValidator.setButtonState();
  addCardPopup.open();
});


