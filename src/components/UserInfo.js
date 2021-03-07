
export default class UserInfo {
  constructor(userSelector, aboutSelector, avatarSelector) {
    this._user = document.querySelector(userSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._profileInfo = {};
  }

  getUserInfo() {
    this._profileInfo.user = this._user.textContent;
    this._profileInfo.about = this._about.textContent;
    this._profileInfo.avatar = this._avatar.src;
    return this._profileInfo;
  }

  setAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }

  setUserInfo({ userId, profileTitle, profileSubtitle, avatarUrl }) {
    this._user.textContent = profileTitle;
    this._about.textContent = profileSubtitle;
    this._avatar.src = avatarUrl;
    this.userId = userId;
  }

}