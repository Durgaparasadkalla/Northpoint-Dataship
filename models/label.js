module.exports = ( sequelize, Sequelize ) => {
    const Label = sequelize.define('Label', {
        labelId: { type: Sequelize.STRING, primaryKey: true },
        labelName: { type: Sequelize.STRING, allowNull: false }
    });

    return Label;
};