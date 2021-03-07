import './index.css';

import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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
  popupProfileSubtitle,
  profileAvatarEditButton
} from '../utils/constants.js';

// * Инициализация класса Api
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'f8102ab5-70c3-4d68-8d03-549794a26a19',
  groupId: 'cohort-20'
});


// * Инициализация класса UserInfo
const user = new UserInfo(profileTitleSelector, profileSubtitleSelector, profileAvatarSelector);

// Loading page
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    user.setUserInfo({ userId: userData._id, profileTitle: userData.name, profileSubtitle: userData.about, avatarUrl: userData.avatar });
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`));

// Card creation function
function createCard(cardItem) {
  //* Удаление карточки */
  const handleDeleteClick = (cardId) => {
    popupDelConfirmation.open(cardId);
  }

  //* Лайк карточки */
  const handleLikeClick = (cardId, ownLike, card) => {
    api.likeCard(cardId, !ownLike).then(res => {
      card.updateLikes(res.likes)
    }).catch(err => console.log(`При лайке карточки возникла ошибка: ${err.status}`));
  }

  const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
  }
  const myCard = (user.userId === cardItem.owner._id) ? true : false;
  const card = new Card(
    {
      name: cardItem.name,
      link: cardItem.link,
      likes: cardItem.likes,
      myCard: myCard,
      cardId: cardItem._id,
      userId: user.userId
    },
    '.card-template',
    handleCardClick, handleDeleteClick, handleLikeClick
  );
  return card;
}

// * Первоначальная инициализация карточек
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item).generateCard();
    cardsList.addItem(cardElement);
  }
}, cardsListSection
);

//* Запись данных профиля на сервер
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, (item) => {
  profileEditPopup.formLoadingEnable();
  api.setUserInfo({ name: item.profileTitle, about: item.profileSubtitle })
    .then(res => {
      user.setUserInfo({ profileTitle: res.name, profileSubtitle: res.about, avatarUrl: res.avatar });
    })
    .catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`))
    .finally(() => {
      profileEditPopup.formLoadingDisable();
      profileEditPopup.close()
    }
    );
});
profileEditPopup.setEventListeners();

//* Включение валидации формы добавления карточки */
const addForm = document.querySelector(cardAddPopupSelector).querySelector('.popup__form');
const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

//* Включение валидации формы редактирования профиля */
const editForm = document.querySelector(profileEditPopupSelector).querySelector('.popup__form');
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

// * Инициализация класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

//* Создание формы подтверждения удаления карточки
const popupDelConfirmation = new PopupWithSubmit('.popup_type_delete', (cardId) => {
  api.deleteCard(cardId).then(res => {
    document.querySelector(`#${CSS.escape(res)}`).remove();
  }).catch(err => console.log(`При удалении карточки возникла ошибка: ${err.status}`));
});
popupDelConfirmation.setEventListeners();

// * Инициализация класса PopupWithForm
const addCardPopup = new PopupWithForm(cardAddPopupSelector, (item) => {
  addCardPopup.formLoadingEnable();
  api.createCard({ name: item.placeLabel, link: item.placeImage })
    .then(res => {
      const cardElement = createCard(res).generateCard();
      cardsList.addItem(cardElement, 'start');
    }).catch(err => console.log(`При загрузке данных возникла ошибка: ${err.status}`))
    .finally(() => {
      addCardPopup.formLoadingDisable();
      addCardPopup.close()
    }
    );
});
addCardPopup.setEventListeners();

//* Добавление слушателя открытя формы редактирования профиля */
editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupProfileTitle.value = userInfo.user;
  popupProfileSubtitle.value = userInfo.about;
  editFormValidator.clearValidationMessages();
  editFormValidator.setButtonState();
  profileEditPopup.open();
});

//* Добавление слушателя открытя формы добавления карточки */
addButton.addEventListener('click', () => {
  addFormValidator.clearValidationMessages();
  addFormValidator.setButtonState();
  addCardPopup.open();
});

const popupEditAvatar = new PopupWithForm('#profileChangeAvatar', ({ avatarLink }) => {
  popupEditAvatar.formLoadingEnable();
  api.setAvatar(avatarLink).then(res => {
    user.setAvatar(res.avatar);
  }).catch(err => console.log(`При изменении аватара возникла ошибка: ${err.status}`))
    .finally(() => {
      popupEditAvatar.formLoadingDisable();
      popupEditAvatar.close()
    }
    );
});

const editAvatarForm = document.querySelector('.popup__container_type_avatar').querySelector('.popup__form');
popupEditAvatar.setEventListeners();
const editAvatarValidator = new FormValidator(validationConfig, editAvatarForm);
editAvatarValidator.enableValidation();
profileAvatarEditButton.addEventListener('click', () => {
  editAvatarValidator.clearValidationMessages();
  popupEditAvatar.open();
})
