import './index.css';

import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../scripts/FormValidator.js';
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
  popupProfileTitle,
  popupProfileSubtitle

} from '../utils/constants.js';

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', (event) => {
      const imagePopup = new PopupWithImage('.image-box', card);
      imagePopup.open();
    });
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, cardsListSection
);

cardsList.renderItems();

editButton.addEventListener('click', () => {
  const user = new UserInfo(profileTitleSelector, profileSubtitleSelector);
  const profileEditPopup = new PopupWithForm(profileEditPopupSelector, (item) => {
    user.setUserInfo(item);
  });
  const userInfo = user.getUserInfo();
  popupProfileTitle.value = userInfo.user;
  popupProfileSubtitle.value = userInfo.about;

  const editForm = document.querySelector(profileEditPopupSelector).querySelector('.popup__form');
  const editFormValidator = new FormValidator(validationConfig, editForm);
  editFormValidator.enableValidation();

  profileEditPopup.open();
});

addButton.addEventListener('click', () => {
  const addCardPopup = new PopupWithForm(cardAddPopupSelector, (item) => {
    const card = new Card(item, '.card-template', (event) => {
      const imagePopup = new PopupWithImage('.image-box', card);
      imagePopup.open();
    });
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  });

  const addForm = document.querySelector(cardAddPopupSelector).querySelector('.popup__form');
  const addFormValidator = new FormValidator(validationConfig, addForm);
  addFormValidator.enableValidation();

  addCardPopup.open();
});
