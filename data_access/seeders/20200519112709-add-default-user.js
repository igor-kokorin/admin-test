const { User } = require('../index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = User.build({ name: 'admin', role: 'admin', locked: false });

    if (await User.findOne({ where: { name: 'admin' } })) {
      return;
    }

    await user.setPassword('password');

    await user.save();
  },

  down: async (queryInterface, Sequelize) => {
    const user = await User.findOne({
      where: {
        name: 'admin'
      }
    });

    if (!user) {
      return;
    }

    return user.destroy();
  }
};
