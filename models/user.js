module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      userId: { type: Sequelize.STRING, primaryKey: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      mobileNumber: { type: Sequelize.STRING, unique: true },
      organization: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, unique: true, validate: { isEmail: true } },
      role: { type: Sequelize.STRING, allowNull: false },
      userName: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
    });
    return User;
  };
  