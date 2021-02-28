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
  //debugger
  //* Запись данных профиля на сервер
  api.setUserInfo({ name: item.profileTitle, about: item.profileSubtitle })
    .then(res => {

      user.setUserInfo(item);
    })
    .catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`));
});
profileEditPopup.setEventListeners();

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'f8102ab5-70c3-4d68-8d03-549794a26a19',
  groupId: 'cohort-20'
});

// * Загрузка и вставка данных профиля
api.getUserInfo()
  .then(res => {
    user.setUserInfo({ profileTitle: res.name, profileSubtitle: res.about, avatarUrl: res.avatar });
  })
  .catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`));



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
  renderer: (item) => {
    const card = new Card(item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, cardsListSection
);

api.getCards()
  .then(res => {
    cardsList.renderItems(res);
  })
  .catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`));

// * Инициализация класса PopupWithForm
const addCardPopup = new PopupWithForm(cardAddPopupSelector, (item) => {
  api.createCard({ name: item.placeLabel, link: item.placeImage })
    .then(res => {
      const card = new Card({ name: res.name, link: res.link }, '.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement, 'start');
    }).catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`));
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


