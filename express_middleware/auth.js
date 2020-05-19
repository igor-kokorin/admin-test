const { User } = require('../data_access');

module.exports = async (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    res.redirect('/auth/login');
    return;
  }

  const user = await User.findOne({
    where: {
      id: userId
    }
  });

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  if (!user || user.locked || ![ 'admin', 'super' ].includes(user.role)) {
    res.redirect('/auth/login');
    return;
  }

  req.user = {
    name: user.name,
    id: user.id
  };

  next();
};