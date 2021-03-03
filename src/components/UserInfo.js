
export default class UserInfo {
  constructor(userSelector, aboutSelector, avatarSelector) {
    this._userSelector = userSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo.user = document.querySelector(this._userSelector).textContent;
    this._profileInfo.about = document.querySelector(this._aboutSelector).textContent;
    this._profileInfo.avatar = document.querySelector(this._avatarSelector).src;
    return this._profileInfo;
  }

  setAvatar(avatarUrl) {
    document.querySelector(this._avatarSelector).src = avatarUrl;
  }

  setUserInfo({ userId, profileTitle, profileSubtitle, avatarUrl }) {
    document.querySelector(this._userSelector).textContent = profileTitle;
    document.querySelector(this._aboutSelector).textContent = profileSubtitle;
    document.querySelector(this._avatarSelector).src = avatarUrl;
    this._userId = userId;
  }

}