$(function () {
  $('.ui.dropdown').dropdown();
  $('.checkbox').checkbox();

  $('.ui.form')
    .form({
      on: 'change',
      inline: true,
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Введите имя'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Введите пароль'
            }
          ]
        },
        passwordConfirmation: {
          identifier: 'passwordConfirmation',
          rules: [
            {
              type: 'empty',
              prompt: 'Введите пароль еще раз'
            },
            {
              type: 'match[password]',
              prompt: 'Пароли должны совпадать'
            }
          ]
        }
      }
    });
});