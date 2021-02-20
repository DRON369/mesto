
export default class UserInfo {
  constructor(userSelector, aboutSelector) {
    this._userSelector = userSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo () {
    this._profileInfo = {};
    this._profileInfo.user = document.querySelector(this._userSelector).textContent;
    this._profileInfo.about = document.querySelector(this._aboutSelector).textContent;
    return this._profileInfo;
  }

  setUserInfo ({profileTitle, profileSubtitle}) {
    document.querySelector(this._userSelector).textContent = profileTitle;
    document.querySelector(this._aboutSelector).textContent = profileSubtitle;
  }

}