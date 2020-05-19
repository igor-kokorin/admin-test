$(function () {
  $('.ui.form')
    .form({
      inline: false,
      fields: {
        login: {
          identifier: 'login',
          rules: [
            {
              type   : 'empty',
              prompt : 'Введите логин'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Введите пароль'
            }
          ]
        },
      }
    });
});