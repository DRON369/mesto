export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element, position) {
    if(position === 'start'){
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}