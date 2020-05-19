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
        passwordConfirmation: {
          identifier: 'passwordConfirmation',
          rules: [
            {
              type: 'match[password]',
              prompt: 'Пароли должны совпадать'
            }
          ]
        }
      }
    });
});