const autoprefixer = require('autoprefixer');
/* const cssnano = require('cssnano'); */

module.exports = {
  plugins:
    [
      autoprefixer
      /* cssnano({ preset: 'default' }) */ //! Использование вызывает некорректное изменение свойства opacity и ломает анимацию
    ]
};