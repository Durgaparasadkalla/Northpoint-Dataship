module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      userId: { type: Sequelize.STRING, primaryKey: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      mobileNumber: { type: Sequelize.STRING, 
                      unique: { msg: 'This Mobile Number is already in use.' } },
      organization: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, 
               unique: { msg: 'This email is already in use.' }, 
               validate: { isEmail: { msg: 'Please enter a valid Email Address.' } } },
      role: { type: Sequelize.STRING, allowNull: false },
      userName: { type: Sequelize.STRING, 
                  unique: { msg: 'This UserName is already in use.' }, 
                  allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
    });
    return User;
  };
  